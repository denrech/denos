extends Control

@onready var title_label: Label = $VBox/Title
@onready var btn1: Button = $VBox/Button1
@onready var btn2: Button = $VBox/Button2
@onready var btn3: Button = $VBox/Button3

var upgrades: Array = []

func _ready() -> void:
	process_mode = Node.PROCESS_MODE_ALWAYS
	hide()
	GameManager.level_up.connect(_on_level_up)
	btn1.pressed.connect(func(): _pick(0))
	btn2.pressed.connect(func(): _pick(1))
	btn3.pressed.connect(func(): _pick(2))

func _on_level_up(level: int) -> void:
	upgrades = UpgradeSystem.get_random_upgrades(3)
	title_label.text = "⚡ УРОВЕНЬ %d — Выбери силу:" % level
	_setup_btn(btn1, upgrades[0])
	_setup_btn(btn2, upgrades[1])
	_setup_btn(btn3, upgrades[2])
	show()

func _setup_btn(btn: Button, upg: Dictionary) -> void:
	btn.text = "%s  %s\n%s" % [upg.icon, upg.name, upg.desc]

func _pick(index: int) -> void:
	UpgradeSystem.apply_upgrade(upgrades[index].id)
	var player := get_tree().get_first_node_in_group("player")
	if player and player.has_method("apply_upgrades"):
		player.apply_upgrades()
	hide()
	GameManager.is_paused = false
	get_tree().paused = false
