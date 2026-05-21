extends CharacterBody2D

signal hp_changed(current: float, maximum: float)
signal died

var hp: float = 100.0
var max_hp: float = 100.0
var attack_timer: float = 0.0
var regen_timer: float = 0.0
var shield_timer: float = 0.0
var shield_active: bool = false

@onready var attack_area: Area2D = $AttackArea
@onready var pickup_area: Area2D = $PickupArea
@onready var attack_shape: CollisionShape2D = $AttackArea/CollisionShape2D
@onready var pickup_shape: CollisionShape2D = $PickupArea/CollisionShape2D

func _ready() -> void:
	add_to_group("player")
	max_hp = GameManager.stats.max_hp
	hp = max_hp
	_update_areas()

func _draw() -> void:
	# Body
	draw_rect(Rect2(-15, -14, 30, 28), Color(0.15, 0.45, 0.85))
	draw_rect(Rect2(-10, -20, 20, 10), Color(0.2, 0.55, 0.9))
	# Lightsaber — layered glow
	draw_line(Vector2(0, -14), Vector2(0, -42), Color(0.2, 0.6, 1.0, 0.25), 12)
	draw_line(Vector2(0, -14), Vector2(0, -42), Color(0.4, 0.8, 1.0, 0.55), 6)
	draw_line(Vector2(0, -14), Vector2(0, -42), Color(0.85, 1.0, 1.0, 0.9), 2)
	# Handle
	draw_rect(Rect2(-3, -8, 6, 8), Color(0.5, 0.5, 0.55))
	# Eyes
	draw_rect(Rect2(-7, -10, 5, 4), Color(0.9, 1.0, 1.0))
	draw_rect(Rect2(2, -10, 5, 4), Color(0.9, 1.0, 1.0))
	# Shield indicator
	if shield_active:
		draw_arc(Vector2.ZERO, 22, 0, TAU, 32, Color(0.3, 0.8, 1.0, 0.5), 3)

func _update_areas() -> void:
	if attack_shape and attack_shape.shape:
		(attack_shape.shape as CircleShape2D).radius = GameManager.stats.attack_radius
	if pickup_shape and pickup_shape.shape:
		(pickup_shape.shape as CircleShape2D).radius = GameManager.stats.pickup_radius

func _process(delta: float) -> void:
	if GameManager.is_game_over:
		return

	if GameManager.stats.regen > 0:
		regen_timer += delta
		if regen_timer >= 1.0:
			regen_timer = 0.0
			heal(GameManager.stats.regen)

	if GameManager.stats.shield_cooldown > 0 and not shield_active:
		shield_timer += delta
		if shield_timer >= GameManager.stats.shield_cooldown:
			shield_timer = 0.0
			shield_active = true
			queue_redraw()

	attack_timer += delta
	if attack_timer >= 1.0 / GameManager.stats.attack_speed:
		attack_timer = 0.0
		_do_attack()

func _physics_process(_delta: float) -> void:
	if GameManager.is_game_over or GameManager.is_paused:
		velocity = Vector2.ZERO
		return

	var dir := Vector2.ZERO
	if Input.is_action_pressed("ui_right"): dir.x += 1
	if Input.is_action_pressed("ui_left"):  dir.x -= 1
	if Input.is_action_pressed("ui_down"):  dir.y += 1
	if Input.is_action_pressed("ui_up"):    dir.y -= 1

	velocity = dir.normalized() * GameManager.stats.move_speed
	move_and_slide()
	position.x = clamp(position.x, 32, 1248)
	position.y = clamp(position.y, 32, 688)

func _do_attack() -> void:
	var bodies := attack_area.get_overlapping_bodies()
	var enemies := bodies.filter(func(e): return e != self and e.has_method("take_damage"))
	if enemies.is_empty():
		return

	enemies.sort_custom(func(a, b):
		return position.distance_to(a.position) < position.distance_to(b.position)
	)

	var hits := mini(GameManager.stats.multi_attack, enemies.size())
	for i in hits:
		enemies[i].take_damage(GameManager.stats.attack_damage)

func take_damage(amount: float) -> void:
	if shield_active:
		shield_active = false
		shield_timer = 0.0
		queue_redraw()
		return

	hp -= amount
	hp = maxf(0.0, hp)
	hp_changed.emit(hp, max_hp)

	modulate = Color(1, 0.25, 0.25)
	var tw := create_tween()
	tw.tween_property(self, "modulate", Color.WHITE, 0.25)

	if hp <= 0:
		died.emit()
		GameManager.trigger_game_over()

func heal(amount: float) -> void:
	hp = minf(hp + amount, max_hp)
	hp_changed.emit(hp, max_hp)

func apply_upgrades() -> void:
	max_hp = GameManager.stats.max_hp
	hp = minf(hp, max_hp)
	hp_changed.emit(hp, max_hp)
	_update_areas()
	queue_redraw()
