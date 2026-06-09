import os
from PIL import Image, ImageFilter, ImageEnhance

input_path = 'assets/BP Digitizer/Screenshot_20260529_123301_BP Digitizer.jpg'
output_path = 'play_store_screenshots/play_Screenshot_20260529_123301_BP Digitizer.jpg'

TARGET_WIDTH = 1920
TARGET_HEIGHT = 1080

img = Image.open(input_path)

# Create blurred background
bg_ratio = TARGET_WIDTH / float(TARGET_HEIGHT)
img_ratio = img.width / float(img.height)

bg = img.copy()
if img_ratio > bg_ratio:
    # Image is wider than 16:9 (e.g. 2316:904 is 2.56, 16:9 is 1.77)
    # Scale height to TARGET_HEIGHT, then crop sides
    cover_height = TARGET_HEIGHT
    cover_width = int(TARGET_HEIGHT * img_ratio)
    bg = img.resize((cover_width, cover_height), Image.Resampling.LANCZOS)
    left = (cover_width - TARGET_WIDTH) // 2
    bg = bg.crop((left, 0, left + TARGET_WIDTH, TARGET_HEIGHT))
else:
    # Image is taller than 16:9
    cover_width = TARGET_WIDTH
    cover_height = int(TARGET_WIDTH / img_ratio)
    bg = img.resize((cover_width, cover_height), Image.Resampling.LANCZOS)
    top = (cover_height - TARGET_HEIGHT) // 2
    bg = bg.crop((0, top, TARGET_WIDTH, top + TARGET_HEIGHT))

# Blur and darken
bg = bg.filter(ImageFilter.GaussianBlur(radius=30))
enhancer = ImageEnhance.Brightness(bg)
bg = enhancer.enhance(0.4)

# Resize foreground to fit width with margin
fg_width = 1820
fg_height = int(img.height * (fg_width / float(img.width)))
fg = img.resize((fg_width, fg_height), Image.Resampling.LANCZOS)

# Center it
paste_x = (TARGET_WIDTH - fg_width) // 2
paste_y = (TARGET_HEIGHT - fg_height) // 2

# Paste fg onto bg
bg.paste(fg, (paste_x, paste_y))

# Save
bg.save(output_path, 'JPEG', quality=95)
print(f"Reprocessed landscape screenshot to {TARGET_WIDTH}x{TARGET_HEIGHT} -> {output_path}")
