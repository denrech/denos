extends CharacterBody2D

const XP_ORB_SCENE := preload("res://scenes/effects/XPOrb.tscn")

var hp: float = 50.0
var move_speed: float = 75.0
var damage: float = 10.0
var xp_value: float = 10.0
var hp_multiplier: float = 1.0

var player: CharacterBody2D = null
var contact_timer: float = 0.0
var contact_interval: float = 0.85

# Visual bobbing
var bob_time: float = 0.0

func _ready() -> void:
	hp = 50.0 * hp_multiplier
	bob_time = randf() * TAU
	$CollisionShape2D.shape.radius = 18.0
	player = get_tree().get_first_node_in_group("player")

func _draw() -> void:
	# B1 Battle Droid design
	# Legs
	draw_rect(Rect2(-16, 20, 10, 16), Color(0.72, 0.62, 0.42))
	draw_rect(Rect2(6, 20, 10, 16), Color(0.72, 0.62, 0.42))
	# Torso (thin)
	draw_rect(Rect2(-12, -8, 24, 30), Color(0.78, 0.68, 0.48))
	# Chest plate
	draw_rect(Rect2(-9, -6, 18, 20), Color(0.68, 0.58, 0.40))
	# Backpack unit
	draw_rect(Rect2(8, -4, 8, 12), Color(0.62, 0.52, 0.36))
	# Neck
	draw_rect(Rect2(-4, -16, 8, 10), Color(0.78, 0.68, 0.48))
	# Head (oval)
	draw_ellipse_approx(Vector2(0, -26), 12, 10, Color(0.75, 0.65, 0.45))
	# Eye strip (glowing red)
	draw_rect(Rect2(-9, -30, 18, 6), Color(0.1, 0.0, 0.0))
	draw_rect(Rect2(-9, -30, 18, 6), Color(1.0, 0.05, 0.05, 0.85))
	# Eye glow
	draw_rect(Rect2(-7, -29, 14, 4), Color(1.0, 0.3, 0.3, 0.4))
	# Gun arm
	draw_rect(Rect2(-22, -4, 12, 5), Color(0.55, 0.48, 0.35))
	draw_rect(Rect2(-30, -5, 9, 4), Color(0.35, 0.30, 0.22))

	# HP bar above
	var hp_pct := hp / (50.0 * hp_multiplier)
	var bar_w := 36.0
	draw_rect(Rect2(-bar_w / 2, -48, bar_w, 5), Color(0.15, 0.05, 0.05))
	draw_rect(Rect2(-bar_w / 2, -48, bar_w * hp_pct, 5), Color(1.0, 0.15, 0.15))

func draw_ellipse_approx(center: Vector2, rx: float, ry: float, color: Color) -> void:
	var points := PackedVector2Array()
	var steps := 20
	for i in steps + 1:
		var a := TAU * i / steps
		points.append(center + Vector2(cos(a) * rx, sin(a) * ry))
	draw_colored_polygon(points, color)

func _physics_process(delta: float) -> void:
	if GameManager.is_game_over or GameManager.is_paused:
		return

	if player == null:
		player = get_tree().get_first_node_in_group("player")
		return

	bob_time += delta * 3.0
	var dir := (player.position - position).normalized()
	velocity = dir * move_speed
	move_and_slide()
	position.x = clamp(position.x, 28, 1252)
	position.y = clamp(position.y, 28, 692)

	# Bobbing visual
	queue_redraw()

	if position.distance_to(player.position) < 34:
		contact_timer += delta
		if contact_timer >= contact_interval:
			contact_timer = 0.0
			player.take_damage(damage)
	else:
		contact_timer = 0.0

func take_damage(amount: float) -> void:
	hp -= amount
	modulate = Color(2.8, 2.8, 2.8)
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
