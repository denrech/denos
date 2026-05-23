# Картинки сайта DamuMarket

Сейчас в качестве заглушек стоят аккуратные SVG-иллюстрации из `assets/categories/*.svg`. Они работают без интернета и хорошо смотрятся на телефоне.

Когда захотите заменить на реальные фотографии — просто положите файл с **тем же именем** (можно `.jpg`/`.png`) в `assets/categories/` и поправьте расширение в `index.html`. Размер картинок: примерно `800×560` для категорий и `800×800` для «Хитов продаж».

Ниже — список слотов, готовые промты для ИИ-генерации (Midjourney, Stable Diffusion, ChatGPT/Gemini) и поисковые запросы для Unsplash/Pexels (бесплатные стоковые фото).

---

## Hero (главный экран)

**Слот:** инлайн SVG-композиция (`index.html`, секция `.hero__art`).
Можно заменить на фото магазина или витрины.
**Промт (RU):** «Фотореалистичный коллаж: профессиональный электроинструмент (дрель, шуруповёрт), банка краски, монтажная пена, деревянный фон — тёплый свет, мягкая тень, оранжево-синяя цветовая гамма, минимализм, для лендинга строительного магазина».
**Unsplash:** [construction tools flat lay](https://unsplash.com/s/photos/construction-tools-flat-lay) · [hardware store](https://unsplash.com/s/photos/hardware-store)

---

## Категории (12 слотов)

Для каждой категории: путь к файлу и промт. Используйте одинаковый стиль (один пайплайн генерации), чтобы карточки выглядели единообразно.

### 1. `assets/categories/electric-tools.svg` → Электроинструмент
**Промт:** «Photo of cordless drill, impact driver and angle grinder neatly arranged on light wooden background, soft daylight, studio shot, top-down view, professional product photography».
**Unsplash:** `power tools`, `cordless drill`

### 2. `assets/categories/hand-tools.svg` → Ручной инструмент
**Промт:** «Hammer, screwdrivers, adjustable wrench and tape measure on a clean white surface, top-down, soft shadows, product shot».
**Unsplash:** `hand tools`, `hammer screwdriver`

### 3. `assets/categories/primers.svg` → Грунтовки и клеи
**Промт:** «Buckets of construction primer and tile adhesive with brand-style labels on a clean background, studio lighting, product photo».
**Unsplash:** `paint bucket`, `tile adhesive`

### 4. `assets/categories/sealants.svg` → Пены, герметики, силиконы
**Промт:** «Polyurethane foam cans and silicone sealant cartridges lined up, neutral background, professional product photography».
**Unsplash:** `polyurethane foam`, `silicone sealant`

### 5. `assets/categories/paints.svg` → Лакокрасочные
**Промт:** «Open paint cans in different colors with brush and roller, top-down view, light background, vivid colors».
**Unsplash:** `paint cans`, `paint roller`

### 6. `assets/categories/ladders.svg` → Стремянки и лестницы
**Промт:** «Aluminum step ladder on a light background, side view, clean studio photography».
**Unsplash:** `step ladder`, `aluminum ladder`

### 7. `assets/categories/plumbing.svg` → Инженерная сантехника
**Промт:** «Pipe fittings, brass connectors and a chrome faucet on a clean background, product photography».
**Unsplash:** `plumbing fittings`, `pipe fittings`

### 8. `assets/categories/fasteners.svg` → Крепёж и метизы
**Промт:** «Heap of screws, bolts, washers and nuts on neutral background, macro photography, soft light».
**Unsplash:** `screws bolts`, `fasteners`

### 9. `assets/categories/dry-mixes.svg` → Сухие смеси
**Промт:** «Bags of cement and plaster mix stacked, hardware store atmosphere, neutral background, professional product photo».
**Unsplash:** `cement bag`, `plaster bag`

### 10. `assets/categories/electrical.svg` → Электрика
**Промт:** «Electrical wires, sockets, circuit breakers neatly arranged, professional product photography, soft daylight».
**Unsplash:** `electrical supplies`, `circuit breaker`

### 11. `assets/categories/workwear.svg` → Спецодежда и СИЗ
**Промт:** «Orange hard hat, work gloves and safety goggles on a neutral background, product photography».
**Unsplash:** `hard hat`, `work gloves`

### 12. `assets/categories/consumables.svg` → Расходники
**Промт:** «Sandpaper sheets, masking tape rolls, paint roller and drill bits arranged on a clean background, product photo».
**Unsplash:** `sandpaper`, `masking tape`

---

## Хиты продаж (4 слота)

Сейчас секция переиспользует SVG категорий. Чтобы заменить — добавьте файлы и правьте `<img src=...>` в блоке `.featured` в `index.html`.

1. **Монтажная пена TYTAN 65** — `assets/featured/tytan-65.jpg` — продуктовое фото баллона.
2. **Шуруповёрт аккумуляторный** — `assets/featured/cordless-screwdriver.jpg` — фото шуруповёрта с аккумулятором.
3. **Цемент M-500** — `assets/featured/cement-500.jpg` — мешок цемента.
4. **Водоэмульсионная краска** — `assets/featured/paint-emulsion.jpg` — банка краски + кисть.

---

## Отзывы (3 слота)

Сейчас аватаров нет — только звёзды и подпись. Если захотите добавить — положите `assets/reviews/1.jpg`, `2.jpg`, `3.jpg` (квадрат 200×200) и добавьте `<img>` в `.review-card` в `index.html`. Подходят generic-портреты со стоков с лицензией CC0.

---

## Open Graph (для соцсетей)

Слот: `assets/og-image.png` — превью при отправке ссылки в WhatsApp/Telegram. Размер 1200×630, светлый фон, лого DamuMarket + телефон. После создания добавьте в `<head>`:
```html
<meta property="og:image" content="assets/og-image.png">
```
