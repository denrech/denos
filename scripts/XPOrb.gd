extends Area2D

var xp_amount: float = 10.0
var player: Node = null
var attracted: bool = false
var attract_speed: float = 260.0
var collected: bool = false
var bob_time: float = 0.0

func _ready() -> void:
	body_entered.connect(_on_body_entered)
	bob_time = randf() * TAU
	player = get_tree().get_first_node_in_group("player")

func _draw() -> void:
	var b := sin(bob_time) * 2.5
	# Outer glow
	draw_circle(Vector2(0, b), 13, Color(0.05, 0.7, 0.2, 0.25))
	# Mid
	draw_circle(Vector2(0, b), 9, Color(0.1, 0.85, 0.30))
	# Inner bright
	draw_circle(Vector2(0, b), 5, Color(0.5, 1.0, 0.55))
	# Core
	draw_circle(Vector2(0, b), 2, Color(0.95, 1.0, 0.95))
	# Star sparkle
	draw_line(Vector2(-10, b), Vector2(10, b), Color(0.3, 1.0, 0.5, 0.35), 1)
	draw_line(Vector2(0, b - 10), Vector2(0, b + 10), Color(0.3, 1.0, 0.5, 0.35), 1)

func _process(delta: float) -> void:
	if collected:
		return
	bob_time += delta * 4.0
	queue_redraw()

	if player == null:
		player = get_tree().get_first_node_in_group("player")
		return

	var dist := position.distance_to(player.position)
	if dist <= GameManager.stats.pickup_radius:
		attracted = true

	if attracted:
		position += (player.position - position).normalized() * attract_speed * delta
		if position.distance_to(player.position) < 16:
			collected = true
			GameManager.add_xp(xp_amount)
			queue_free()

func _on_body_entered(body: Node) -> void:
	if collected:
		return
	if body.is_in_group("player"):
		collected = true
		GameManager.add_xp(xp_amount)
		queue_free()
