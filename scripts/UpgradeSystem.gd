extends Node

const UPGRADES := [
	{"id": "max_hp",        "name": "Сила Духа",      "desc": "+25 Max HP",              "icon": "❤️"},
	{"id": "move_speed",    "name": "Шаг Джедая",     "desc": "+15% скорость",           "icon": "⚡"},
	{"id": "attack_damage", "name": "Мощь Клинка",    "desc": "+20% урон лайтсабера",    "icon": "⚔️"},
	{"id": "attack_speed",  "name": "Быстрый Удар",   "desc": "+10% скорость атаки",     "icon": "🌀"},
	{"id": "attack_radius", "name": "Широкий Замах",  "desc": "+25% радиус атаки",       "icon": "🔵"},
	{"id": "pickup_radius", "name": "Притяжение",     "desc": "+30% радиус сбора XP",    "icon": "✨"},
	{"id": "regen",         "name": "Медитация",      "desc": "+1 HP/сек регенерация",   "icon": "💚"},
	{"id": "multi_attack",  "name": "Двойной Удар",   "desc": "+1 удар за атаку",        "icon": "✖️"},
	{"id": "shield",        "name": "Силовой Щит",    "desc": "Блок раз в 10 сек",       "icon": "🛡️"},
	{"id": "xp_multiplier", "name": "Ученик Йоды",   "desc": "+50% XP с врагов",        "icon": "⭐"},
]

func get_random_upgrades(count: int = 3) -> Array:
	var pool := UPGRADES.duplicate()
	pool.shuffle()
	return pool.slice(0, count)

func apply_upgrade(upgrade_id: String) -> void:
	match upgrade_id:
		"max_hp":        GameManager.stats.max_hp += 25.0
		"move_speed":    GameManager.stats.move_speed *= 1.15
		"attack_damage": GameManager.stats.attack_damage *= 1.20
		"attack_speed":  GameManager.stats.attack_speed *= 1.10
		"attack_radius": GameManager.stats.attack_radius *= 1.25
		"pickup_radius": GameManager.stats.pickup_radius *= 1.30
		"regen":         GameManager.stats.regen += 1.0
		"multi_attack":  GameManager.stats.multi_attack += 1
		"shield":        GameManager.stats.shield_cooldown = 10.0
		"xp_multiplier": GameManager.stats.xp_multiplier *= 1.50
