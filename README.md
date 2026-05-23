# DamuMarket — лендинг строительного магазина

Сайт-витрина магазина строительных материалов **DamuMarket** в Алматы (Васнецова, 43). Чистый статический HTML/CSS/JS, без сборки и без бэкенда. Все заявки уходят в WhatsApp `+7 700 215 2893`.

## Структура

```
index.html          — главная страница DamuMarket
styles.css          — стили (mobile-first)
script.js           — burger, WhatsApp deep-links, quick-form
assets/
  categories/       — SVG-иллюстрации категорий (заглушки)
  icons/            — иконки интерфейса
CONTENT.md          — как менять текст, телефон, категории
IMAGES.md           — список слотов под фото + AI-промты
game/               — мини-игра Jedi Deflector (бонус разработчика)
```

## Локальный запуск

```bash
python3 -m http.server 8000
# открыть http://localhost:8000
```

Никаких npm-зависимостей. Открывается также прямо из файла (`file://`), но карта 2ГИС и WhatsApp-ссылки работают только при открытии через сервер.

## Публикация на GitHub Pages

1. Закоммитьте и запушьте на GitHub.
2. Repo → **Settings → Pages**.
3. Source: **Deploy from a branch**, Branch: `main` (или `claude/damu-market-landing-gKqb2` для превью), папка `/ (root)`.
4. Через 1–2 минуты сайт доступен по адресу `https://<username>.github.io/denos/`.

## Как менять контент

См. [CONTENT.md](CONTENT.md). Картинки и промты — см. [IMAGES.md](IMAGES.md).

## Мини-игра

[Jedi Deflector](game/) — отдельный проект, лежит в `game/`.
