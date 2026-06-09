import os
import glob
from PIL import Image, ImageFilter, ImageEnhance

input_dir = 'assets/BP Digitizer'
output_dir = 'play_store_screenshots'

if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Find all JPGs in the directory
screenshots = glob.glob(os.path.join(input_dir, '*.jpg'))

TARGET_WIDTH = 1080
TARGET_HEIGHT = 1920

for i, filepath in enumerate(screenshots):
    filename = os.path.basename(filepath)
    img = Image.open(filepath)

    # Create the blurred background
    # We want the background to fill 1080x1920
    bg_ratio = TARGET_WIDTH / float(TARGET_HEIGHT)
    img_ratio = img.width / float(img.height)

    bg = img.copy()
    if img_ratio > bg_ratio:
        # Image is wider than target ratio
        new_height = int(TARGET_WIDTH / img_ratio)
        bg = bg.resize((TARGET_WIDTH, new_height), Image.Resampling.LANCZOS)
        # Pad top/bottom? For blur, we want to scale to cover
        cover_height = TARGET_HEIGHT
        cover_width = int(TARGET_HEIGHT * img_ratio)
        bg = img.resize((cover_width, cover_height), Image.Resampling.LANCZOS)
        left = (cover_width - TARGET_WIDTH) // 2
        bg = bg.crop((left, 0, left + TARGET_WIDTH, TARGET_HEIGHT))
    else:
        # Image is taller than target ratio (like 904x2316)
        cover_width = TARGET_WIDTH
        cover_height = int(TARGET_WIDTH / img_ratio)
        bg = img.resize((cover_width, cover_height), Image.Resampling.LANCZOS)
        top = (cover_height - TARGET_HEIGHT) // 2
        bg = bg.crop((0, top, TARGET_WIDTH, top + TARGET_HEIGHT))

    # Blur and darken
    bg = bg.filter(ImageFilter.GaussianBlur(radius=30))
    enhancer = ImageEnhance.Brightness(bg)
    bg = enhancer.enhance(0.4)

    # Resize foreground to fit with a small margin (e.g. 1820px high)
    fg_height = 1820
    fg_width = int(img.width * (fg_height / float(img.height)))
    fg = img.resize((fg_width, fg_height), Image.Resampling.LANCZOS)

    # Center it
    paste_x = (TARGET_WIDTH - fg_width) // 2
    paste_y = (TARGET_HEIGHT - fg_height) // 2

    # Paste fg onto bg
    bg.paste(fg, (paste_x, paste_y))

    # Save
    out_path = os.path.join(output_dir, f'play_{filename}')
    bg.save(out_path, 'JPEG', quality=95)
    print(f"Processed {filename} -> {out_path}")

print("All screenshots resized to exactly 9:16 (1080x1920).")
