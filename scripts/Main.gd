extends Node2D

@onready var player: CharacterBody2D = $Player
@onready var enemies_node: Node2D = $Enemies
@onready var hud: Control = $UI/HUD
@onready var game_over_screen: Control = $UI/GameOverScreen
@onready var stats_label: Label = $UI/GameOverScreen/VBox/StatsLabel
@onready var restart_btn: Button = $UI/GameOverScreen/VBox/RestartButton
@onready var camera: Camera2D = $Camera2D

# Pre-computed arena decoration points (stable, no randomness each frame)
var pillar_points: Array[Vector2] = []
var sand_dots: PackedVector2Array

func _ready() -> void:
	GameManager.reset()
	enemies_node.add_to_group("enemies_container")
	WaveManager.enemies_node = enemies_node
	player.hp_changed.connect(hud.update_hp)
	player.screen_shake.connect(_on_screen_shake)
	GameManager.game_over.connect(_on_game_over)
	restart_btn.pressed.connect(_on_restart)
	hud.update_hp(player.hp, player.max_hp)
	WaveManager.start_first_wave()

	# Build static decoration points once
	pillar_points = [
		Vector2(80, 80), Vector2(640, 60), Vector2(1200, 80),
		Vector2(80, 360), Vector2(1200, 360),
		Vector2(80, 640), Vector2(640, 660), Vector2(1200, 640),
	]
	sand_dots = PackedVector2Array()
	var rng := RandomNumberGenerator.new()
	rng.seed = 42
	for i in 220:
		sand_dots.append(Vector2(
			rng.randf_range(32, 1248),
			rng.randf_range(32, 688)
		))

func _draw() -> void:
	# Base sand color
	draw_rect(Rect2(0, 0, 1280, 720), Color(0.58, 0.45, 0.23))

	# Tile grid (subtle)
	for x in range(32, 1280, 64):
		draw_line(Vector2(x, 32), Vector2(x, 688), Color(0.50, 0.38, 0.18, 0.22), 1)
	for y in range(32, 720, 64):
		draw_line(Vector2(32, y), Vector2(1248, y), Color(0.50, 0.38, 0.18, 0.22), 1)

	# Sand texture dots
	for pt in sand_dots:
		draw_circle(pt, 1.5, Color(0.44, 0.33, 0.14, 0.40))

	# Arena pillars (Geonosis style)
	for pt in pillar_points:
		draw_circle(pt, 22, Color(0.28, 0.20, 0.10))
		draw_circle(pt, 15, Color(0.38, 0.28, 0.14))
		draw_circle(pt, 8,  Color(0.50, 0.37, 0.18))
		draw_circle(pt, 3,  Color(0.62, 0.47, 0.24))

	# Walls
	draw_rect(Rect2(0,    0,    1280, 28),  Color(0.22, 0.15, 0.07))
	draw_rect(Rect2(0,    692,  1280, 28),  Color(0.22, 0.15, 0.07))
	draw_rect(Rect2(0,    0,    28,   720), Color(0.22, 0.15, 0.07))
	draw_rect(Rect2(1252, 0,    28,   720), Color(0.22, 0.15, 0.07))

	# Wall inner edge highlight
	draw_line(Vector2(28, 28),   Vector2(1252, 28),  Color(0.55, 0.40, 0.20, 0.55), 2)
	draw_line(Vector2(28, 692),  Vector2(1252, 692), Color(0.55, 0.40, 0.20, 0.55), 2)
	draw_line(Vector2(28, 28),   Vector2(28,   692), Color(0.55, 0.40, 0.20, 0.55), 2)
	draw_line(Vector2(1252, 28), Vector2(1252, 692), Color(0.55, 0.40, 0.20, 0.55), 2)

func _on_screen_shake(intensity: float) -> void:
	var orig := Vector2(640, 360)
	var tw := create_tween()
	for i in 7:
		var off := Vector2(randf_range(-intensity, intensity), randf_range(-intensity, intensity))
		tw.tween_property(camera, "position", orig + off, 0.035)
	tw.tween_property(camera, "position", orig, 0.08)

func _on_game_over(stats: Dictionary) -> void:
	var t := int(stats.time)
	stats_label.text = "Время:   %02d:%02d\nВолна:   %d\nУровень: %d" % [
		t / 60, t % 60, stats.wave, stats.level
	]
	game_over_screen.show()

func _on_restart() -> void:
	GameManager.reset()
	get_tree().paused = false
	get_tree().reload_current_scene()
