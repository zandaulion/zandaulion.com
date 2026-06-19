import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

WIDTH = 1024
HEIGHT = 500

# Colors
bg_color_start = (244, 249, 246)
bg_color_end = (212, 233, 224)
text_dark = (23, 52, 43)
text_teal = (62, 137, 117)
text_gray = (85, 107, 98)
text_light_gray = (120, 138, 130)

# Create background gradient
img = Image.new("RGBA", (WIDTH, HEIGHT))
draw = ImageDraw.Draw(img)

for x in range(WIDTH):
    r = int(bg_color_start[0] + (bg_color_end[0] - bg_color_start[0]) * (x / WIDTH))
    g = int(bg_color_start[1] + (bg_color_end[1] - bg_color_start[1]) * (x / WIDTH))
    b = int(bg_color_start[2] + (bg_color_end[2] - bg_color_start[2]) * (x / WIDTH))
    draw.line([(x, 0), (x, HEIGHT)], fill=(r, g, b))

# Fonts
font_title = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 64)
font_subtitle = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 36)
font_bullets = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 24)
font_small = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", 20)
font_tiny_bold = ImageFont.truetype("C:/Windows/Fonts/arialbd.ttf", 20)

# Text positions
left_margin = 68

# Dash above FITNESS
dash_y = 75
draw.rounded_rectangle([left_margin, dash_y, left_margin + 45, dash_y + 6], fill=(116, 175, 158), radius=3)

# FITNESS & WELLNESS
draw.text((left_margin, 100), "FITNESS & WELLNESS", font=font_tiny_bold, fill=text_teal)

# Main Title
draw.text((left_margin, 140), "Blood Pressure\nTracking", font=font_title, fill=text_dark)

# Subtitle
draw.text((left_margin, 290), "Part of your fitness routine.", font=font_subtitle, fill=text_gray)

# Bullets
bullets_y = 360
bullet_radius = 5
bullet_color = (116, 175, 158)
bullet_spacing = 30

def draw_bullet(x, y, text):
    draw.ellipse([x, y+8, x+bullet_radius*2, y+8+bullet_radius*2], fill=bullet_color)
    draw.text((x + 20, y), text, font=font_bullets, fill=text_gray)
    return x + 20 + draw.textlength(text, font=font_bullets) + 20

b_x = left_margin
b_x = draw_bullet(b_x, bullets_y, "Log in seconds")
b_x = draw_bullet(b_x, bullets_y, "Spot your trends")
b_x = draw_bullet(b_x, bullets_y, "Export a PDF")

# Footer text
footer_y = 415
draw.text((left_margin, footer_y), "Private & on-device  ·  No account needed", font=font_small, fill=text_light_gray)

# Phone Mockup
screenshot_path = 'assets/BP Digitizer/Screenshot_2026-06-19-20-33-38-550_com.zandaulion.bpdigitized.jpg'
ss = Image.open(screenshot_path)
ss_ratio = ss.width / ss.height
mockup_height = 460
mockup_width = int(mockup_height * ss_ratio)

# Phone frame dimensions
padding = 12
frame_width = mockup_width + padding * 2
frame_height = mockup_height + padding * 2
radius = 30

# Create phone frame with shadow
shadow_margin = 40
frame_img = Image.new("RGBA", (frame_width + shadow_margin*2, frame_height + shadow_margin*2), (0,0,0,0))
frame_draw = ImageDraw.Draw(frame_img)

# Shadow
shadow_offset_y = 15
shadow_rect = [shadow_margin, shadow_margin + shadow_offset_y, shadow_margin + frame_width, shadow_margin + frame_height + shadow_offset_y]
frame_draw.rounded_rectangle(shadow_rect, radius=radius, fill=(0,0,0,60))
frame_img = frame_img.filter(ImageFilter.GaussianBlur(15))

# White phone frame
frame_draw_sharp = ImageDraw.Draw(frame_img)
sharp_rect = [shadow_margin, shadow_margin, shadow_margin + frame_width, shadow_margin + frame_height]
frame_draw_sharp.rounded_rectangle(sharp_rect, radius=radius, fill=(255, 255, 255))

# Paste screenshot onto frame
ss_resized = ss.resize((mockup_width, mockup_height), Image.Resampling.LANCZOS)
# Create a mask for rounded corners on the screenshot
ss_mask = Image.new("L", (mockup_width, mockup_height), 0)
ss_draw = ImageDraw.Draw(ss_mask)
ss_draw.rounded_rectangle([0, 0, mockup_width, mockup_height], radius=radius-padding, fill=255)
frame_img.paste(ss_resized, (shadow_margin + padding, shadow_margin + padding), ss_mask)

# Paste frame onto main image
phone_x = WIDTH - frame_width - 80 - shadow_margin
phone_y = (HEIGHT - frame_height) // 2 - shadow_margin
img.paste(frame_img, (phone_x, phone_y), frame_img)

# Save
output_path = 'assets/BP Digitizer/feature_graphic.jpg'
img.convert("RGB").save(output_path, "JPEG", quality=95)
print(f"Generated successfully: {output_path}")
