extends Control

@onready var hp_bar: ProgressBar = $HPBar
@onready var xp_bar: ProgressBar = $XPBar
@onready var wave_label: Label = $WaveLabel
@onready var time_label: Label = $TimeLabel
@onready var level_label: Label = $LevelLabel

func _ready() -> void:
	GameManager.xp_changed.connect(_on_xp_changed)
	WaveManager.wave_started.connect(_on_wave_started)

func _process(_delta: float) -> void:
	var t := int(GameManager.time_survived)
	time_label.text = "%02d:%02d" % [t / 60, t % 60]
	level_label.text = "Ур. %d" % GameManager.level

func update_hp(current: float, maximum: float) -> void:
	hp_bar.max_value = maximum
	hp_bar.value = current

func _on_xp_changed(current: float, required: float) -> void:
	xp_bar.max_value = required
	xp_bar.value = current

func _on_wave_started(wave_num: int) -> void:
	wave_label.text = "Волна %d" % wave_num
