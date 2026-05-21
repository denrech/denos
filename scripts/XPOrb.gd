extends Area2D

var xp_amount: float = 10.0
var player: Node = null
var attracted: bool = false
var attract_speed: float = 220.0
var collected: bool = false

func _ready() -> void:
	body_entered.connect(_on_body_entered)
	player = get_tree().get_first_node_in_group("player")

func _draw() -> void:
	draw_circle(Vector2.ZERO, 7, Color(0.1, 0.85, 0.30))
	draw_circle(Vector2.ZERO, 4, Color(0.5, 1.0, 0.55))
	draw_circle(Vector2.ZERO, 2, Color(0.9, 1.0, 0.9))

func _process(delta: float) -> void:
	if collected:
		return
	if player == null:
		player = get_tree().get_first_node_in_group("player")
		return

	var dist := position.distance_to(player.position)

	if dist <= GameManager.stats.pickup_radius:
		attracted = true

	if attracted:
		position += (player.position - position).normalized() * attract_speed * delta
		if position.distance_to(player.position) < 14:
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
