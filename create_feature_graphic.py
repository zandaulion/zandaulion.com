from PIL import Image, ImageFilter, ImageEnhance

input_path = 'assets/BP Digitizer/Screenshot_2026-06-19-20-33-38-550_com.zandaulion.bpdigitized.jpg'
output_path = 'assets/BP Digitizer/feature_graphic.jpg'

# 1. Load the original screenshot
img = Image.open(input_path)

# 2. Create the blurred background
# Target size is 1024x500
bg_ratio = 1024 / 500.0
img_ratio = img.width / img.height

# We want the background to fill 1024x500
bg = img.copy()
bg = bg.resize((1024, int(1024 / img_ratio)), Image.Resampling.LANCZOS)

# Crop the center 500px
top = (bg.height - 500) // 2
bg = bg.crop((0, top, 1024, top + 500))

# Blur and darken the background
bg = bg.filter(ImageFilter.GaussianBlur(radius=20))
enhancer = ImageEnhance.Brightness(bg)
bg = enhancer.enhance(0.5)

# 3. Prepare the foreground screenshot
# We want it to be 460px high (leaving 20px padding top and bottom)
fg_height = 460
fg_width = int(img.width * (fg_height / img.height))
fg = img.resize((fg_width, fg_height), Image.Resampling.LANCZOS)

# 4. Paste the foreground onto the background
# Center it
paste_x = (1024 - fg_width) // 2
paste_y = (500 - fg_height) // 2
bg.paste(fg, (paste_x, paste_y))

# 5. Save as feature_graphic.jpg
bg.save(output_path, 'JPEG', quality=95)
print("Created feature_graphic.jpg (1024x500)")
