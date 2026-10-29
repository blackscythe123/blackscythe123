import re
import sys
from datetime import datetime, timezone, timedelta

# 7-day paired contrast-tested spectrum (WCAG AA compliant)
# Dark background: #0d1117 (Dark tone must have luminance >= 0.1997, contrast >= 4.5:1)
# Light background: #ffffff (Light tone must have luminance <= 0.1833, contrast >= 4.5:1)
PALETTES = [
    # 0: Monday - Cyan & Deep Teal
    {
        "name": "Cyan",
        "dark": "39c5bb",    # 8.90:1 on #0d1117
        "light": "057a6e",   # 4.98:1 on #ffffff
        "capsule_accent": "1f8f87"
    },
    # 1: Tuesday - Cyber Violet & Deep Purple
    {
        "name": "Cyber Violet",
        "dark": "bc8cff",    # 7.51:1 on #0d1117
        "light": "8250df",   # 5.05:1 on #ffffff
        "capsule_accent": "8957e5"
    },
    # 2: Wednesday - Terminal Mint & Forest Green
    {
        "name": "Terminal Mint",
        "dark": "56d364",    # 7.20:1 on #0d1117
        "light": "1a7f37",   # 5.08:1 on #ffffff
        "capsule_accent": "238636"
    },
    # 3: Thursday - Ice Blue & Cobalt
    {
        "name": "Ice Blue",
        "dark": "79c0ff",    # 9.60:1 on #0d1117
        "light": "0550ae",   # 6.90:1 on #ffffff
        "capsule_accent": "1f6feb"
    },
    # 4: Friday - Lilac Indigo & Imperial Violet
    {
        "name": "Lilac Indigo",
        "dark": "d2a8ff",    # 9.30:1 on #0d1117
        "light": "6639ba",   # 6.80:1 on #ffffff
        "capsule_accent": "7057ff"
    },
    # 5: Saturday - Sapphire & Ocean Blue
    {
        "name": "Sapphire",
        "dark": "388bfd",    # 5.66:1 on #0d1117
        "light": "0860ca",   # 5.80:1 on #ffffff
        "capsule_accent": "1f6feb"
    },
    # 6: Sunday - GitHub Electric & Classic Royal Blue
    {
        "name": "Electric Blue",
        "dark": "58a6ff",    # 7.49:1 on #0d1117
        "light": "0969da",   # 5.19:1 on #ffffff
        "capsule_accent": "1f6feb"
    },
]

def rotate_theme(readme_path="README.md", day_override=None):
    # Use IST (UTC+5:30) so rotation aligns with Simiyon's local midnight
    ist = timezone(timedelta(hours=5, minutes=30))
    now = datetime.now(ist)
    day_idx = now.weekday() if day_override is None else day_override
    palette = PALETTES[day_idx % len(PALETTES)]

    dark_color = palette["dark"]
    light_color = palette["light"]
    capsule_accent = palette["capsule_accent"]

    print(f"Applying theme for day {day_idx} ({palette['name']}): dark=#{dark_color}, light=#{light_color}")

    with open(readme_path, "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update Capsule header waving banner
    content = re.sub(
        r'color=0:[0-9a-fA-F]{6},50:161b22,100:0d1117',
        f'color=0:{capsule_accent},50:161b22,100:0d1117',
        content
    )
    content = re.sub(
        r'fontColor=[0-9a-fA-F]{6}',
        f'fontColor={dark_color}',
        content
    )

    # 2. Update Typing SVG color
    content = re.sub(
        r'readme-typing-svg\.demolab\.com\?[^"]*color=[0-9a-fA-F]{6}',
        lambda m: re.sub(r'color=[0-9a-fA-F]{6}', f'color={dark_color}', m.group(0)),
        content
    )

    # 3. Update Streak Card (Ring, text, and numbers follow theme, flame stays orange)
    def update_streak_dark(match):
        s = match.group(0)
        s = re.sub(r'&ring_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&title_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&text_color=[0-9a-fA-F]{6}', '', s)
        s = s.replace('timezone=Asia/Kolkata', f'timezone=Asia/Kolkata&ring_color={dark_color}&title_color={dark_color}&text_color={dark_color}')
        return s

    def update_streak_light(match):
        s = match.group(0)
        s = re.sub(r'&ring_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&title_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&text_color=[0-9a-fA-F]{6}', '', s)
        s = s.replace('timezone=Asia/Kolkata', f'timezone=Asia/Kolkata&ring_color={light_color}&title_color={light_color}&text_color={light_color}')
        return s

    content = re.sub(
        r'<source media="\(prefers-color-scheme: dark\)" srcset="[^"]*stats-blackscythe123\.vercel\.app/api/streak\?[^"]*"',
        update_streak_dark,
        content
    )
    content = re.sub(
        r'<img src="[^"]*stats-blackscythe123\.vercel\.app/api/streak\?[^"]*"',
        update_streak_dark,
        content
    )
    content = re.sub(
        r'<source media="\(prefers-color-scheme: light\)" srcset="[^"]*stats-blackscythe123\.vercel\.app/api/streak\?[^"]*"',
        update_streak_light,
        content
    )

    # 4. Update GitHub stats card
    def update_stats_dark(match):
        s = match.group(0)
        s = re.sub(r'&title_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&icon_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&ring_color=[0-9a-fA-F]{6}', '', s)
        s = s.replace('include_all_commits=true', f'include_all_commits=true&title_color={dark_color}&icon_color={dark_color}&ring_color={dark_color}')
        return s

    def update_stats_light(match):
        s = match.group(0)
        s = re.sub(r'&title_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&icon_color=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&ring_color=[0-9a-fA-F]{6}', '', s)
        s = s.replace('include_all_commits=true', f'include_all_commits=true&title_color={light_color}&icon_color={light_color}&ring_color={light_color}')
        return s

    content = re.sub(
        r'<source media="\(prefers-color-scheme: dark\)" srcset="[^"]*stats-blackscythe123\.vercel\.app/api\?[^"]*"',
        update_stats_dark,
        content
    )
    content = re.sub(
        r'<img src="[^"]*stats-blackscythe123\.vercel\.app/api\?[^"]*"',
        update_stats_dark,
        content
    )
    content = re.sub(
        r'<source media="\(prefers-color-scheme: light\)" srcset="[^"]*stats-blackscythe123\.vercel\.app/api\?[^"]*"',
        update_stats_light,
        content
    )

    # 5. Update Top Languages card
    def update_langs_dark(match):
        s = match.group(0)
        s = re.sub(r'&title_color=[0-9a-fA-F]{6}', '', s)
        s = s.replace('layout=compact', f'layout=compact&title_color={dark_color}')
        return s

    def update_langs_light(match):
        s = match.group(0)
        s = re.sub(r'&title_color=[0-9a-fA-F]{6}', '', s)
        s = s.replace('layout=compact', f'layout=compact&title_color={light_color}')
        return s

    content = re.sub(
        r'<source media="\(prefers-color-scheme: dark\)" srcset="[^"]*stats-blackscythe123\.vercel\.app/api/top-langs\?[^"]*"',
        update_langs_dark,
        content
    )
    content = re.sub(
        r'<img src="[^"]*stats-blackscythe123\.vercel\.app/api/top-langs\?[^"]*"',
        update_langs_dark,
        content
    )
    content = re.sub(
        r'<source media="\(prefers-color-scheme: light\)" srcset="[^"]*stats-blackscythe123\.vercel\.app/api/top-langs\?[^"]*"',
        update_langs_light,
        content
    )

    # 6. Update LeetCode card (enlarge to 800px and sync ring/numbers)
    def update_lc_dark(match):
        s = match.group(0)
        s = re.sub(r'&ring=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&sideNums=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&stroke=[0-9a-fA-F]{6}', '', s)
        s = s.replace('border_radius=12', f'border_radius=12&ring={dark_color}&sideNums={dark_color}&stroke={dark_color}')
        return s

    def update_lc_light(match):
        s = match.group(0)
        s = re.sub(r'&ring=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&sideNums=[0-9a-fA-F]{6}', '', s)
        s = re.sub(r'&stroke=[0-9a-fA-F]{6}', '', s)
        s = s.replace('border_radius=12', f'border_radius=12&ring={light_color}&sideNums={light_color}&stroke={light_color}')
        return s

    content = re.sub(
        r'<source media="\(prefers-color-scheme: dark\)" srcset="[^"]*github-readme-leetcode-stats\.vercel\.app/api/card\?[^"]*"',
        update_lc_dark,
        content
    )
    content = re.sub(
        r'<img src="[^"]*github-readme-leetcode-stats\.vercel\.app/api/card\?[^"]*"[^>]*',
        lambda m: update_lc_dark(m).replace('width="520"', 'width="800"'),
        content
    )
    content = re.sub(
        r'<source media="\(prefers-color-scheme: light\)" srcset="[^"]*github-readme-leetcode-stats\.vercel\.app/api/card\?[^"]*"',
        update_lc_light,
        content
    )

    with open(readme_path, "w", encoding="utf-8") as f:
        f.write(content)

    print("README.md theme updated successfully!")

if __name__ == "__main__":
    override = int(sys.argv[1]) if len(sys.argv) > 1 else None
    rotate_theme("README.md", override)
