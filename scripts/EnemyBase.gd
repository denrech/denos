extends CharacterBody2D

const XP_ORB_SCENE := preload("res://scenes/effects/XPOrb.tscn")

var hp: float = 50.0
var move_speed: float = 80.0
var damage: float = 10.0
var xp_value: float = 10.0
var hp_multiplier: float = 1.0

var player: CharacterBody2D = null
var contact_timer: float = 0.0
var contact_interval: float = 0.8

func _ready() -> void:
	hp = 50.0 * hp_multiplier
	player = get_tree().get_first_node_in_group("player")

func _draw() -> void:
	# Body
	draw_rect(Rect2(-14, -14, 28, 28), Color(0.60, 0.15, 0.08))
	# Head plate
	draw_rect(Rect2(-10, -14, 20, 9), Color(0.45, 0.12, 0.06))
	# Red glowing eyes
	draw_rect(Rect2(-9, -10, 6, 5), Color(1.0, 0.05, 0.05))
	draw_rect(Rect2(3, -10, 6, 5), Color(1.0, 0.05, 0.05))
	# Eye glow
	draw_rect(Rect2(-9, -10, 6, 5), Color(1.0, 0.4, 0.4, 0.4))
	draw_rect(Rect2(3, -10, 6, 5), Color(1.0, 0.4, 0.4, 0.4))

func _physics_process(delta: float) -> void:
	if GameManager.is_game_over or GameManager.is_paused:
		return

	if player == null:
		player = get_tree().get_first_node_in_group("player")
		return

	var dir := (player.position - position).normalized()
	velocity = dir * move_speed
	move_and_slide()

	position.x = clamp(position.x, 20, 1260)
	position.y = clamp(position.y, 20, 700)

	if position.distance_to(player.position) < 28:
		contact_timer += delta
		if contact_timer >= contact_interval:
			contact_timer = 0.0
			player.take_damage(damage)
	else:
		contact_timer = 0.0

func take_damage(amount: float) -> void:
	hp -= amount
	modulate = Color(2.5, 2.5, 2.5)
	var tw := create_tween()
	tw.tween_property(self, "modulate", Color.WHITE, 0.1)
	if hp <= 0:
		_die()

func _die() -> void:
	var orb := XP_ORB_SCENE.instantiate()
	orb.position = position
	orb.xp_amount = xp_value
	get_parent().add_child(orb)
	queue_free()
