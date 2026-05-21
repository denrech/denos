extends Node

signal level_up(level: int)
signal game_over(stats: Dictionary)
signal xp_changed(current: float, required: float)

var xp: float = 0.0
var level: int = 1
var wave: int = 0
var time_survived: float = 0.0
var is_game_over: bool = false
var is_paused: bool = false

var stats := {
	"max_hp": 100.0,
	"move_speed": 200.0,
	"attack_damage": 25.0,
	"attack_speed": 1.0,
	"attack_radius": 80.0,
	"pickup_radius": 60.0,
	"regen": 0.0,
	"multi_attack": 1,
	"shield_cooldown": 0.0,
	"xp_multiplier": 1.0,
}

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS

func get_xp_required() -> float:
	return 100.0 * pow(1.3, level - 1)

func add_xp(amount: float) -> void:
	xp += amount * stats.xp_multiplier
	var required := get_xp_required()
	xp_changed.emit(xp, required)
	if xp >= required:
		xp -= required
		level += 1
		is_paused = true
		get_tree().paused = true
		level_up.emit(level)

func trigger_game_over() -> void:
	is_game_over = true
	game_over.emit({
		"time": time_survived,
		"wave": wave,
		"level": level
	})

func reset() -> void:
	xp = 0.0
	level = 1
	wave = 0
	time_survived = 0.0
	is_game_over = false
	is_paused = false
	stats = {
		"max_hp": 100.0,
		"move_speed": 200.0,
		"attack_damage": 25.0,
		"attack_speed": 1.0,
		"attack_radius": 80.0,
		"pickup_radius": 60.0,
		"regen": 0.0,
		"multi_attack": 1,
		"shield_cooldown": 0.0,
		"xp_multiplier": 1.0,
	}

func _process(delta: float) -> void:
	if not is_game_over and not is_paused:
		time_survived += delta
