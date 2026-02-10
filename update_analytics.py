#!/usr/bin/env python3
"""
Update Google Analytics across all HTML files
Changes from old GA ID (G-74VNSC0NMX) to new GA ID (G-B153PB6GL3)
"""

import os
import re
from pathlib import Path

ROOT_PATH = r"d:\WEBSITE BUILD DATA\DevanshuWebsite"

# New analytics code
NEW_ANALYTICS = '''    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-B153PB6GL3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-B153PB6GL3');
    </script>
'''

def remove_old_analytics(content):
    """Remove old analytics code with G-74VNSC0NMX"""
    # Pattern to match old analytics block
    pattern = r'    <!-- Google tag \(gtag\.js\) -->.*?gtag\(\'config\', \'G-74VNSC0NMX\'\);.*?</script>\s*'
    content = re.sub(pattern, '', content, flags=re.DOTALL)
    
    # Also try to catch variations
    pattern2 = r'<!-- Google tag \(gtag\.js\) -->.*?gtag\(\'config\', \'G-74VNSC0NMX\'\);.*?</script>\s*'
    content = re.sub(pattern2, '', content, flags=re.DOTALL)
    
    return content

def remove_duplicate_new_analytics(content):
    """Remove any duplicate new analytics"""
    pattern = r'    <!-- Google tag \(gtag\.js\) -->.*?gtag\(\'config\', \'G-B153PB6GL3\'\);.*?</script>\s*'
    while re.search(pattern, content, flags=re.DOTALL):
        content = re.sub(pattern, '', content, flags=re.DOTALL, count=1)
    return content

def process_html_file(file_path):
    """Process a single HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    
    # Step 1: Remove old analytics (G-74VNSC0NMX)
    content = remove_old_analytics(content)
    
    # Step 2: Remove duplicate new analytics
    content = remove_duplicate_new_analytics(content)
    
    # Step 3: Add new analytics before </head> if not present
    if 'G-B153PB6GL3' not in content:
        content = re.sub(r'</head>', NEW_ANALYTICS + '\n</head>', content)
    
    # Save if changed
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 50)
    print("GOOGLE ANALYTICS BULK UPDATE")
    print("=" * 50)
    print(f"Old GA ID: G-74VNSC0NMX")
    print(f"New GA ID: G-B153PB6GL3")
    print("=" * 50)
    print()
    
    # Find all HTML files
    html_files = list(Path(ROOT_PATH).rglob('*.html'))
    total = len(html_files)
    updated = 0
    
    print(f"Found {total} HTML files\n")
    
    for idx, file_path in enumerate(html_files, 1):
        rel_path = file_path.relative_to(ROOT_PATH)
        print(f"[{idx:2d}/{total}] {rel_path}...", end=' ')
        
        try:
            if process_html_file(str(file_path)):
                updated += 1
                print("✓ UPDATED")
            else:
                print("SKIP")
        except Exception as e:
            print(f"ERROR: {e}")
    
    print()
    print("=" * 50)
    print("SUMMARY")
    print("=" * 50)
    print(f"Total files:  {total}")
    print(f"Updated:      {updated}")
    print("Status:       ✓ COMPLETE")
    print("=" * 50)

if __name__ == '__main__':
    main()
