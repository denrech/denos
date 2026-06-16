#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Генератор печатного макета для кружки (развёртка / wrap).
Размер под обрез (trim): 200 x 82 мм, вылеты (bleed) 3 мм со всех сторон.
Единицы viewBox: 0.1 мм (1 ед = 0.1 мм).
Вывод: PDF (вектор, под печать) + PNG (превью 300 dpi).
"""
import cairosvg

# ---------- геометрия холста ----------
MM = 10.0                      # 1 мм = 10 единиц
BLEED = 3 * MM                 # 30
TRIM_W = 200 * MM              # 2000
TRIM_H = 82 * MM               # 820
W = TRIM_W + 2 * BLEED         # 2060
H = TRIM_H + 2 * BLEED         # 880
TX, TY = BLEED, BLEED          # левый-верхний угол обреза = (30,30)

# ---------- палитра ----------
INK   = "#2b2a28"     # почти чёрный (скрипт, рамка)
TEXT  = "#3c3a38"     # основной текст
BEIGE = "#c4a484"     # бежевые сердечки/звёзды
BEIGE2= "#cdb191"
WC    = "#d8d4cd"     # акварель тёплый-серый
WC2   = "#cfc8bd"
WHITE = "#ffffff"

parts = []
def add(s): parts.append(s)

# ---------- помощники-фигуры ----------
def heart(cx, cy, s, stroke=None, fill="none", sw=0, rot=0):
    """Сердце, нормированный путь в боксе 100x100, точка снизу."""
    d = ("M50,30 C50,21 41,12 30,12 C16,12 8,24 8,38 "
         "C8,58 28,74 50,90 C72,74 92,58 92,38 "
         "C92,24 84,12 70,12 C59,12 50,21 50,30 Z")
    k = s / 100.0
    tr = f"translate({cx-50*k:.2f},{cy-50*k:.2f}) scale({k:.4f}) "
    if rot:
        tr = f"rotate({rot} {cx} {cy}) " + tr
    st = f'stroke="{stroke}" stroke-width="{sw/k:.2f}" stroke-linejoin="round" stroke-linecap="round"' if stroke else ""
    return f'<path transform="{tr}" d="{d}" fill="{fill}" {st}/>'

def spark(cx, cy, s, fill=BEIGE, rot=0):
    """Четырёхлучевая искра-звезда, нормирован 100x100."""
    d = ("M50,2 C53,40 60,47 98,50 C60,53 53,60 50,98 "
         "C47,60 40,53 2,50 C40,47 47,40 50,2 Z")
    k = s / 100.0
    tr = f"translate({cx-50*k:.2f},{cy-50*k:.2f}) scale({k:.4f})"
    if rot:
        tr = f"rotate({rot} {cx} {cy}) " + tr
    return f'<path transform="{tr}" d="{d}" fill="{fill}"/>'

def dot(cx, cy, r, fill=INK):
    return f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}"/>'

def txt(x, y, s, size, fill=TEXT, family="PT Serif", anchor="middle",
        ls=0, weight="normal", style="normal"):
    lsa = f' letter-spacing="{ls}"' if ls else ""
    return (f'<text x="{x}" y="{y}" font-family="{family}" font-size="{size}" '
            f'fill="{fill}" text-anchor="{anchor}" font-weight="{weight}" '
            f'font-style="{style}"{lsa}>{s}</text>')

# ============================================================
# ФОН
# ============================================================
add(f'<rect x="0" y="0" width="{W}" height="{H}" fill="{WHITE}"/>')

# фильтр размытия для акварели
add('<defs>'
    '<filter id="soft" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="9"/></filter>'
    '<filter id="soft2" x="-40%" y="-40%" width="180%" height="180%"><feGaussianBlur stdDeviation="6"/></filter>'
    '<filter id="cloud" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="17"/></filter>'
    '</defs>')

# ============================================================
# АКВАРЕЛЬНЫЕ ПЯТНА
# ============================================================
# верхний-левый угол — мягкая облачная акварель (несколько прозрачных слоёв)
add(f'<g filter="url(#cloud)">'
    f'<path d="M0,20 C90,-5 210,5 300,40 C360,64 370,118 300,158 '
    f'C235,196 120,200 50,175 C-10,153 -20,55 0,20 Z" fill="{WC}" opacity="0.40"/>'
    f'<path d="M40,30 C120,18 215,30 270,70 C300,98 280,150 200,170 '
    f'C120,188 50,168 25,128 C5,96 8,52 40,30 Z" fill="{WC2}" opacity="0.30"/>'
    f'<path d="M150,55 C215,52 270,72 285,110 C295,140 255,175 195,178 '
    f'C140,180 110,150 110,112 C110,82 118,58 150,55 Z" fill="{WC}" opacity="0.30"/>'
    f'</g>')

# прямоугольное пятно-мазок под фоторамкой справа (по центру рамки)
add(f'<g filter="url(#cloud)">'
    f'<path d="M1505,150 C1620,120 1795,128 1905,160 C1958,178 1952,238 1940,345 '
    f'C1925,478 1948,598 1908,685 C1870,752 1645,746 1552,727 '
    f'C1492,713 1495,638 1502,522 C1510,404 1488,242 1505,150 Z" fill="{WC}" opacity="0.42"/>'
    f'<path d="M1540,200 C1660,178 1820,190 1885,235 C1915,300 1900,470 1885,560 '
    f'C1860,690 1640,690 1560,668 C1520,600 1525,360 1540,200 Z" fill="{WC2}" opacity="0.22"/>'
    f'</g>')

# ============================================================
# ЛЕВЫЙ БЛОК
# ============================================================
LCX = 372
add(txt(LCX-12, 318, "Люблю тебя", 98, fill=INK, family="Marck Script"))
add(heart(628, 292, 54, stroke=BEIGE, fill="none", sw=4))
add(txt(LCX, 408, "за то, что ты есть.", 38, fill=TEXT))
add(txt(LCX, 468, "за каждый момент с тобой.", 38, fill=TEXT))
add(txt(LCX, 528, "за нас.", 38, fill=TEXT))
# бежевое сердечко
add(heart(250, 612, 48, stroke=BEIGE, fill="none", sw=4))
# крупная линейная иллюстрация — два сердца
add(f'<path d="M250,700 C250,665 205,642 165,658 C120,676 118,734 165,772 '
    f'C205,805 300,825 360,715 C375,688 360,658 332,658 C300,658 270,676 250,700 Z" '
    f'fill="none" stroke="{INK}" stroke-width="3"/>')
add(f'<path d="M455,728 C455,700 417,680 383,692 C345,706 343,750 381,780 '
    f'C415,806 490,818 537,732 C549,710 537,686 513,686 C487,686 471,706 455,728 Z" '
    f'fill="none" stroke="{INK}" stroke-width="2.6" opacity="0.9"/>')
# искры/точки в левом блоке
add(spark(615, 560, 22, fill=BEIGE))
add(spark(150, 470, 20, fill=BEIGE))
add(dot(640, 470, 4, fill=INK))
add(spark(610, 700, 18, fill=BEIGE))

# ============================================================
# ЦЕНТРАЛЬНЫЙ БЛОК
# ============================================================
CCX = 1035
add(txt(CCX, 358, "Пол года", 112, fill=INK, family="Marck Script"))
add(txt(CCX, 428, "НАШЕЙ ИСТОРИИ", 38, fill=TEXT, family="Montserrat", ls=7, weight="400"))
add(heart(CCX, 476, 40, stroke=BEIGE, fill="none", sw=3.4))
add(txt(CCX, 556, "16.12.2025", 40, fill=TEXT, family="PT Serif"))
add(heart(CCX, 616, 44, stroke=BEIGE, fill="none", sw=3.6))
# декор-искры
add(spark(805, 165, 22, fill=INK))
add(spark(1255, 185, 18, fill=BEIGE))
add(spark(845, 655, 24, fill=INK))
add(spark(1235, 640, 20, fill=BEIGE))
add(spark(775, 445, 22, fill=BEIGE))
add(spark(1300, 470, 22, fill=BEIGE))
add(dot(930, 205, 4, fill=INK))
add(dot(1150, 255, 3.5, fill=BEIGE))
add(dot(800, 560, 4, fill=INK))

# ============================================================
# ПРАВЫЙ БЛОК — фоторамка
# ============================================================
# рамка от руки (слегка неровная), по центру x≈1700: 1532..1868 y:118..712
RCX = 1700
add(f'<path d="M1536,122 C1650,115 1768,118 1866,120 '
    f'C1870,250 1868,430 1870,612 C1870,658 1872,694 1864,710 '
    f'C1752,714 1636,712 1538,711 C1534,556 1536,358 1532,200 '
    f'C1532,172 1530,142 1536,122 Z" '
    f'fill="none" stroke="{INK}" stroke-width="3.2" stroke-linejoin="round"/>')
add(heart(RCX, 420, 48, stroke=BEIGE, fill="none", sw=3.6))
add(txt(RCX, 508, "МЕСТО", 36, fill=TEXT, family="Montserrat", ls=6))
add(txt(RCX, 556, "ДЛЯ ВАШЕГО ФОТО", 34, fill=TEXT, family="Montserrat", ls=3))
# маленькие сердечки-контуры справа снизу (вне рамки)
add(heart(1955, 600, 40, stroke=INK, fill="none", sw=2.6, rot=-12))
add(heart(1972, 692, 32, stroke=BEIGE, fill="none", sw=2.6, rot=8))
# сердечко-шарик на ниточке
add(f'<path d="M1905,748 C1903,722 1927,716 1927,734 '
    f'C1927,716 1951,722 1949,748 C1947,774 1927,790 1927,803 '
    f'C1927,790 1907,774 1905,748 Z" fill="none" stroke="{INK}" stroke-width="2.4"/>')
add(f'<path d="M1927,803 C1930,821 1920,834 1932,848" fill="none" stroke="{INK}" stroke-width="1.6"/>')

# ============================================================
# МЕТКИ ОБРЕЗА (тонкие, в вылетах)
# ============================================================
def crop_marks():
    m=[]
    L=18; o=8
    corners=[(TX,TY,1,1),(TX+TRIM_W,TY,-1,1),(TX,TY+TRIM_H,1,-1),(TX+TRIM_W,TY+TRIM_H,-1,-1)]
    for x,y,sx,sy in corners:
        m.append(f'<line x1="{x-o*sx}" y1="{y}" x2="{x-(o+L)*sx}" y2="{y}" stroke="#999" stroke-width="1"/>')
        m.append(f'<line x1="{x}" y1="{y-o*sy}" x2="{x}" y2="{y-(o+L)*sy}" stroke="#999" stroke-width="1"/>')
    return "".join(m)
add(crop_marks())

svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="{W/MM}mm" height="{H/MM}mm" '
       f'viewBox="0 0 {W} {H}">' + "".join(parts) + '</svg>')

open("/home/user/denos/mug/mug_design.svg","w").write(svg)
cairosvg.svg2png(bytestring=svg.encode(), write_to="/home/user/denos/mug/preview.png",
                 output_width=int(W/MM/25.4*300), output_height=int(H/MM/25.4*300))
cairosvg.svg2pdf(bytestring=svg.encode(), write_to="/home/user/denos/mug/mug_design_print.pdf")
print("OK", f"{W/MM}x{H/MM} mm")
