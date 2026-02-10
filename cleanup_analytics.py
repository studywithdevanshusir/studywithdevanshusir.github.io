#!/usr/bin/env python3
"""
Remove ALL old analytics codes from HTML files
This removes any Google Analytics block regardless of ID or format
"""

import re
from pathlib import Path

ROOT_PATH = r"d:\WEBSITE BUILD DATA\DevanshuWebsite"

def remove_all_old_analytics(content):
    """
    Remove ALL old Google Analytics blocks
    Patterns:
    1. <!-- Google tag (gtag.js) --> ... </script>
    2. Handles any GA ID (G-74VNSC0NMX, G-74VNSC0MNX, or any variation)
    3. Keeps only the NEW G-B153PB6GL3 code
    """
    # Pattern: <!-- Google tag (gtag.js) --> ... </script>
    # This is a greedy pattern that removes from comment to closing script tag
    
    lines = content.split('\n')
    newlines =[]
    skip = False
    skip_count = 0
    
    for i, line in enumerate(lines):
        # Start skipping if we find the Google tag comment AND it's NOT the new GA
        if ('<!-- Google tag (gtag.js) -->' in line and 'G-B153PB6GL3' not in '\n'.join(lines[i:min(i+10, len(lines))])):
            skip = True
            skip_count = 0
            continue
        
        # Stop skipping after closing script tag (within 10 lines of start)
        if skip:
            skip_count += 1
            if '</script>' in line or skip_count > 10:
                skip = False
            continue
        
        # Add line if not skipping
        if not skip:
            newlines.append(line)
    
    return '\n'.join(newlines)

def process_file(file_path):
    """Process a single HTML file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    original = content
    content = remove_all_old_analytics(content)
    
    if content != original:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        return True
    return False

def main():
    print("=" * 60)
    print("REMOVING OLD ANALYTICS CODE")
    print("=" * 60)
    print()
    
    html_files = list(Path(ROOT_PATH).rglob('*.html'))
    total = len(html_files)
    updated = 0
    
    for idx, file_path in enumerate(html_files, 1):
        rel_path = file_path.relative_to(ROOT_PATH)
        print(f"[{idx:2d}/{total}] {rel_path}...", end=' ')
        
        try:
            if process_file(str(file_path)):
                updated += 1
                print("✓ REMOVED OLD CODE")
            else:
                print("SKIP")
        except Exception as e:
            print(f"ERROR: {e}")
    
    print()
    print("=" *60)
    print(f"Total: {total} | Cleaned: {updated}")
    print("=" * 60)

if __name__ == '__main__':
    main()
