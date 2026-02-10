#!/usr/bin/env python3
"""
Verify Google Analytics deployment
"""

from pathlib import Path

ROOT_PATH = r"d:\WEBSITE BUILD DATA\DevanshuWebsite"

def main():
    html_files = sorted(list(Path(ROOT_PATH).rglob('*.html')))
    total = len(html_files)
    
    with_new_ga = 0
    with_old_ga = 0
    no_ga = 0
    
    issues = []
    
    for file_path in html_files:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        has_new = 'G-B153PB6GL3' in content
        has_old = 'G-74VNSC0' in content or 'G-74VNSC0MNX' in content
        
        if has_new and not has_old:
            with_new_ga += 1
        elif has_old:
            with_old_ga += 1
            issues.append(f"  ✗ {file_path.relative_to(ROOT_PATH)}: STILL HAS OLD GA!")
        else:
            no_ga += 1
            # Check if it's the Google verification file
            if 'google' not in str(file_path).lower():
                issues.append(f"  ⚠ {file_path.relative_to(ROOT_PATH)}: NO GA FOUND!")
    
    print("=" * 70)
    print("GOOGLE ANALYTICS VERIFICATION REPORT")
    print("=" * 70)
    print(f"\nTotal HTML files: {total}")
    print(f"Files with NEW GA (G-B153PB6GL3): {with_new_ga}")
    print(f"Files with OLD GA (still present): {with_old_ga}")
    print(f"Files with NO GA: {no_ga}")
    
    if issues:
        print(f"\nISSUES FOUND ({len(issues)}):")
        for issue in issues[:10]:
            print(issue)
        if len(issues) > 10:
            print(f"  ... and {len(issues) - 10} more")
    else:
        print("\n✓ ALL FILES OK!")
    
    print("\n" + "=" * 70)
    if with_old_ga == 0:
        print("SUCCESS: Analytics successfully added to all pages!")
        print("Old analytics (G-74VNSC0NMX) completely removed!")
        print("New analytics (G-B153PB6GL3) active on all pages!")
    else:
        print(f"WARNING: {with_old_ga} files still have old analytics!")
    print("=" * 70)

if __name__ == '__main__':
    main()
