#!/usr/bin/env python3
"""
Complete cleanup of ALL analytics codes
Removes any script containing old GA IDs
"""

import re
from pathlib import Path

ROOT_PATH = r"d:\WEBSITE BUILD DATA\DevanshuWebsite"

def aggressive_cleanup(content):
    """Remove ALL old analytics including broken ones"""
    
    # Remove entire <script>...</script> blocks containing old GA IDs or gtag config with old IDs
    patterns = [
        r'<script[^>]*>[\s\S]*?window\.dataLayer[\s\S]*?G-74VNSC0[^<]*?</script>',  # Old GA with gtag
        r'<script[^>]*src="[^"]*googletagmanager[^"]*G-74VNSC0[^"]*"[^>]*>\s*</script>',  # Remote script with old ID
        r'<!-- Google tag \(gtag\.js\) -->\s*<script[^>]*>[\s\S]*?</script>',  # Complete block
        r'<script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-74VNSC0[^"]*"[^>]*></script>',  # Async script  
        r'gtag\(\'config\', \'G-74VNSC0[^\']*\'\);',  # Config line with old ID
    ]
    
    for pattern in patterns:
        content = re.sub(pattern, '', content, flags=re.DOTALL | re.IGNORECASE)
    
    # Clean up leftover empty lines and extra whitespace
    content = re.sub(r'\n\s*\n\s*\n', '\n\n', content)
    
    return content

def process_file(file_path):
    """Process a single HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Aggressive cleanup
    content = aggressive_cleanup(content)
    
    # Remove any leftover gtag functions if they contain old IDs
    if 'G-74VNSC' in content or 'G-74VNSC0MNX' in content:
        lines = content.split('\n')
        cleaned_lines = []
        for line in lines:
            if 'G-74VNSC' not in line and 'G-74VNSC0MNX' not in line:
                cleaned_lines.append(line)
        content = '\n'.join(cleaned_lines)
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 60)
    print("AGGRESSIVE CLEANUP - REMOVING ALL OLD ANALYTICS")
    print("=" * 60)
    print()
    
    html_files = list(Path(ROOT_PATH).rglob('*.html'))
    total = len(html_files)
    cleaned = 0
    
    for idx, file_path in enumerate(html_files, 1):
        rel_path = file_path.relative_to(ROOT_PATH)
        print(f"[{idx:2d}/{total}] {rel_path}...", end=' ')
        
        try:
            if process_file(str(file_path)):
                cleaned += 1
                print("✓ CLEANED")
            else:
                print("OK")
        except Exception as e:
            print(f"ERROR: {e}")
    
    print()
    print("=" * 60)
    print(f"Total: {total} | Cleaned: {cleaned}")
    print("=" * 60)

if __name__ == '__main__':
    main()
