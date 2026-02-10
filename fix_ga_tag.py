#!/usr/bin/env python3
"""
Fix Google Analytics Tag - Add complete GA tag to all HTML files
"""
import os
import re
from pathlib import Path

# The COMPLETE Google Analytics tag
COMPLETE_GA_TAG = """    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-B153PB6GL3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-B153PB6GL3');
    </script>"""

def fix_html_file(file_path):
    """Add complete GA tag to HTML file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Skip if it's not a real HTML file or is a verification file
        if 'googleebf212af9f193966.html' in file_path:
            return False
            
        # Remove existing incomplete gtag scripts
        # Pattern 1: Old incomplete gtag without async src
        content = re.sub(
            r'    <script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\){dataLayer\.push\(arguments\);}\s*gtag\([\'"]js[\'"],\s*new Date\(\)\);\s*gtag\([\'"]config[\'"],\s*[\'"]G-B153PB6GL3["\']\);\s*</script>',
            '',
            content,
            flags=re.MULTILINE | re.DOTALL
        )
        
        # Pattern 2: Different formatting of gtag
        content = re.sub(
            r'    <script>\s*\n\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*\n\s*function gtag\(\) { dataLayer\.push\(arguments\); }\s*\n\s*gtag\([\'"]js["\']\s*,\s*new Date\(\)\);\s*\n\s*gtag\([\'"]config["\']\s*,\s*[\'"]G-B153PB6GL3["\']\);\s*\n\s*</script>',
            '',
            content,
            flags=re.MULTILINE | re.DOTALL
        )
        
        # Pattern 3: Another variation
        content = re.sub(
            r'<script>\s*window\.dataLayer = window\.dataLayer \|\| \[\];\s*function gtag\(\){dataLayer\.push\(arguments\);}\s*gtag\([\'"]js["\']\s*,\s*new Date\(\)\);\s*gtag\([\'"]config["\']\s*,\s*[\'"]G-B153PB6GL3["\']\);\s*</script>',
            '',
            content,
            flags=re.MULTILINE | re.DOTALL
        )
        
        # Remove any old async GA scripts
        content = re.sub(
            r'    <script async src="https://www\.googletagmanager\.com/gtag/js\?id=G-[A-Z0-9]*"></script>',
            '',
            content
        )
        
        # Find the </head> tag
        head_close = content.find('</head>')
        
        if head_close == -1:
            print(f"[SKIP] {file_path} - No </head> tag found")
            return False
        
        # Check if COMPLETE tag already exists
        if 'script async src="https://www.googletagmanager.com/gtag/js?id=G-B153PB6GL3"' in content:
            print(f"[OK] {file_path} - Already has complete GA tag")
            return True
        
        # Insert the COMPLETE GA tag before </head>
        new_content = content[:head_close] + COMPLETE_GA_TAG + '\n' + content[head_close:]
        
        # Write back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print(f"[FIXED] {file_path}")
        return True
        
    except Exception as e:
        print(f"[ERROR] {file_path} - {str(e)}")
        return False

def main():
    print("=" * 70)
    print("FIX GOOGLE ANALYTICS TAG - Add complete GA tag to all HTML files")
    print("=" * 70)
    print()
    
    # Find all HTML files
    html_files = []
    for root, dirs, files in os.walk('.'):
        for file in files:
            if file.endswith('.html'):
                html_files.append(os.path.join(root, file))
    
    html_files.sort()
    
    print(f"Found {len(html_files)} HTML files\n")
    
    fixed = 0
    for html_file in html_files:
        if fix_html_file(html_file):
            fixed += 1
    
    print()
    print("=" * 70)
    print(f"Total: {len(html_files)} | Fixed: {fixed}")
    print("=" * 70)
    print()
    print("✓ Complete Google Analytics tag added to all files!")
    print("  Tag includes:")
    print("  - Async script: <script async src=...>")
    print("  - Configuration: gtag('config', 'G-B153PB6GL3')")
    print()

if __name__ == '__main__':
    main()
