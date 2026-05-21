extends Node

signal wave_started(wave_num: int)

const DROID_SCENE := preload("res://scenes/enemies/Droid.tscn")

var wave_timer: float = 0.0
var wave_interval: float = 30.0
var enemies_node: Node2D = null

func _process(delta: float) -> void:
	if GameManager.is_game_over or GameManager.is_paused:
		return
	wave_timer += delta
	if wave_timer >= wave_interval:
		wave_timer = 0.0
		spawn_wave()

func spawn_wave() -> void:
	if enemies_node == null:
		enemies_node = get_tree().get_first_node_in_group("enemies_container")
	if enemies_node == null:
		return

	GameManager.wave += 1
	wave_started.emit(GameManager.wave)

	var count := 5 + GameManager.wave * 3
	var hp_mult := 1.0 + (GameManager.wave - 1) * 0.15

	for i in count:
		var droid := DROID_SCENE.instantiate()
		droid.position = _get_spawn_pos()
		droid.hp_multiplier = hp_mult
		enemies_node.add_child(droid)

func _get_spawn_pos() -> Vector2:
	var margin := 50.0
	match randi() % 4:
		0: return Vector2(randf_range(margin, 1280 - margin), -margin)
		1: return Vector2(randf_range(margin, 1280 - margin), 720 + margin)
		2: return Vector2(-margin, randf_range(margin, 720 - margin))
		_: return Vector2(1280 + margin, randf_range(margin, 720 - margin))

func start_first_wave() -> void:
	wave_timer = 25.0
