extends CharacterBody2D

signal hp_changed(current: float, maximum: float)
signal died
signal screen_shake(intensity: float)

var hp: float = 100.0
var max_hp: float = 100.0
var attack_timer: float = 0.0
var regen_timer: float = 0.0
var shield_timer: float = 0.0
var shield_active: bool = false

# Sword visual state
var sword_angle: float = -PI / 2.0
var is_spinning: bool = false
var spin_progress: float = 0.0

@onready var attack_area: Area2D = $AttackArea
@onready var pickup_area: Area2D = $PickupArea
@onready var attack_shape: CollisionShape2D = $AttackArea/CollisionShape2D
@onready var pickup_shape: CollisionShape2D = $PickupArea/CollisionShape2D

func _ready() -> void:
	add_to_group("player")
	max_hp = GameManager.stats.max_hp
	hp = max_hp
	$CollisionShape2D.shape.radius = 22.0
	_update_areas()

func _draw() -> void:
	# Robe body
	draw_rect(Rect2(-22, -10, 44, 42), Color(0.20, 0.22, 0.30))
	# Tunic
	draw_rect(Rect2(-16, -10, 32, 36), Color(0.28, 0.30, 0.40))
	# Belt
	draw_rect(Rect2(-18, 14, 36, 7), Color(0.45, 0.35, 0.18))
	# Head
	draw_circle(Vector2(0, -24), 18, Color(0.72, 0.60, 0.48))
	# Hood
	draw_arc(Vector2(0, -24), 20, PI + 0.3, TAU - 0.3, 24, Color(0.20, 0.22, 0.30), 6)
	# Eyes
	draw_rect(Rect2(-9, -28, 6, 4), Color(0.1, 0.5, 1.0))
	draw_rect(Rect2(3, -28, 6, 4), Color(0.1, 0.5, 1.0))
	# Legs
	draw_rect(Rect2(-18, 32, 16, 14), Color(0.18, 0.20, 0.28))
	draw_rect(Rect2(2, 32, 16, 14), Color(0.18, 0.20, 0.28))

	# Lightsaber — pointing at sword_angle
	var sw = Vector2.from_angle(sword_angle)
	var hilt_start := sw * 14
	var hilt_end   := sw * 22
	var blade_end  := sw * 64

	# Handle
	draw_line(hilt_start, hilt_end, Color(0.55, 0.55, 0.60), 6)
	# Outer glow (wide, transparent)
	draw_line(hilt_end, blade_end, Color(0.15, 0.55, 1.0, 0.18), 22)
	# Mid glow
	draw_line(hilt_end, blade_end, Color(0.25, 0.70, 1.0, 0.45), 12)
	# Inner glow
	draw_line(hilt_end, blade_end, Color(0.50, 0.90, 1.0, 0.70), 6)
	# Core blade
	draw_line(hilt_end, blade_end, Color(0.90, 1.00, 1.0, 0.95), 2)
	# Tip spark
	draw_circle(blade_end, 4, Color(0.80, 1.00, 1.0, 0.60))

	# Shield ring
	if shield_active:
		draw_arc(Vector2.ZERO, 30, 0, TAU, 48, Color(0.3, 0.8, 1.0, 0.55), 3)

func _update_areas() -> void:
	if attack_shape and attack_shape.shape:
		(attack_shape.shape as CircleShape2D).radius = GameManager.stats.attack_radius
	if pickup_shape and pickup_shape.shape:
		(pickup_shape.shape as CircleShape2D).radius = GameManager.stats.pickup_radius

func _process(delta: float) -> void:
	if GameManager.is_game_over:
		return

	# Regen
	if GameManager.stats.regen > 0:
		regen_timer += delta
		if regen_timer >= 1.0:
			regen_timer = 0.0
			heal(GameManager.stats.regen)

	# Shield recharge
	if GameManager.stats.shield_cooldown > 0 and not shield_active:
		shield_timer += delta
		if shield_timer >= GameManager.stats.shield_cooldown:
			shield_timer = 0.0
			shield_active = true

	# Auto attack
	attack_timer += delta
	if attack_timer >= 1.0 / GameManager.stats.attack_speed:
		attack_timer = 0.0
		_do_attack()

	# Sword animation
	if is_spinning:
		spin_progress += delta * 10.0
		sword_angle = spin_progress
		if spin_progress >= TAU:
			is_spinning = false
			spin_progress = 0.0
	else:
		var nearest := _get_nearest_enemy()
		if nearest:
			var target := (nearest.position - position).angle()
			sword_angle = lerp_angle(sword_angle, target, delta * 7.0)

	queue_redraw()

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
	position.x = clamp(position.x, 40, 1240)
	position.y = clamp(position.y, 40, 680)

func _do_attack() -> void:
	var bodies := attack_area.get_overlapping_bodies()
	var enemies := bodies.filter(func(e): return e != self and e.has_method("take_damage"))
	if enemies.is_empty():
		return

	# Spin the blade on attack
	is_spinning = true
	spin_progress = sword_angle

	enemies.sort_custom(func(a, b):
		return position.distance_to(a.position) < position.distance_to(b.position)
	)
	for i in mini(GameManager.stats.multi_attack, enemies.size()):
		enemies[i].take_damage(GameManager.stats.attack_damage)

func _get_nearest_enemy() -> Node:
	var container := get_tree().get_first_node_in_group("enemies_container")
	if not container:
		return null
	var nearest: Node = null
	var nearest_dist := INF
	for enemy in container.get_children():
		var d := position.distance_to(enemy.position)
		if d < nearest_dist:
			nearest_dist = d
			nearest = enemy
	return nearest

func take_damage(amount: float) -> void:
	if shield_active:
		shield_active = false
		shield_timer = 0.0
		return

	hp -= amount
	hp = maxf(0.0, hp)
	hp_changed.emit(hp, max_hp)
	screen_shake.emit(6.0)

	modulate = Color(1, 0.2, 0.2)
	var tw := create_tween()
	tw.tween_property(self, "modulate", Color.WHITE, 0.22)

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
