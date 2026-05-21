extends Node2D

@onready var player: CharacterBody2D = $Player
@onready var enemies_node: Node2D = $Enemies
@onready var hud: Control = $UI/HUD
@onready var game_over_screen: Control = $UI/GameOverScreen
@onready var stats_label: Label = $UI/GameOverScreen/VBox/StatsLabel
@onready var restart_btn: Button = $UI/GameOverScreen/VBox/RestartButton

func _ready() -> void:
	GameManager.reset()
	enemies_node.add_to_group("enemies_container")
	WaveManager.enemies_node = enemies_node
	player.hp_changed.connect(hud.update_hp)
	GameManager.game_over.connect(_on_game_over)
	restart_btn.pressed.connect(_on_restart)
	hud.update_hp(player.hp, player.max_hp)
	WaveManager.start_first_wave()

func _draw() -> void:
	# Sand arena background
	draw_rect(Rect2(0, 0, 1280, 720), Color(0.56, 0.43, 0.22))

	# Sand grain texture
	for i in 180:
		var x := fmod(float(i) * 139.3, 1230.0) + 25.0
		var y := fmod(float(i) * 103.7, 670.0) + 25.0
		draw_circle(Vector2(x, y), 1.2, Color(0.44, 0.33, 0.14, 0.45))

	# Arena walls (dark stone border)
	draw_rect(Rect2(0, 0, 1280, 26), Color(0.22, 0.16, 0.08))
	draw_rect(Rect2(0, 694, 1280, 26), Color(0.22, 0.16, 0.08))
	draw_rect(Rect2(0, 0, 26, 720), Color(0.22, 0.16, 0.08))
	draw_rect(Rect2(1254, 0, 26, 720), Color(0.22, 0.16, 0.08))

	# Wall edge highlight
	draw_line(Vector2(26, 26), Vector2(1254, 26), Color(0.38, 0.28, 0.14, 0.6), 2)
	draw_line(Vector2(26, 694), Vector2(1254, 694), Color(0.38, 0.28, 0.14, 0.6), 2)
	draw_line(Vector2(26, 26), Vector2(26, 694), Color(0.38, 0.28, 0.14, 0.6), 2)
	draw_line(Vector2(1254, 26), Vector2(1254, 694), Color(0.38, 0.28, 0.14, 0.6), 2)

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
