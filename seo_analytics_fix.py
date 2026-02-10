#!/usr/bin/env python3
"""
Apply SEO and Analytics fixes across all HTML files in the repo.
1. Remove old analytics/gtag fragments
2. Insert the complete Google tag before </head>
3. Ensure <title> and meta description are set to required values
4. Skip google verification file
"""
import os
import re

NEW_TITLE = "<title>Study With Devanshu Sir</title>"
NEW_META = '<meta name="description" content="Online study notes, classes, and learning resources by Devanshu Sir">'

GA_BLOCK = '''<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-B153PB6GL3"></script>
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-B153PB6GL3');
</script>'''

SKIP_FILES = {'googleebf212af9f193966.html'}

def process_file(path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()

        fname = os.path.basename(path)
        if fname in SKIP_FILES:
            return False, 'skipped verification file'

        # Remove existing GA scripts (any variant) and old analytics
        # Remove script tags that reference googletagmanager or contain gtag config lines
        html = re.sub(r"<script[^>]*src=[\"']https?://www\.googletagmanager\.com/gtag/js[^<]*</script>", '', html, flags=re.IGNORECASE|re.DOTALL)
        html = re.sub(r"<script[^>]*>[^<]*gtag\([^<]*</script>", '', html, flags=re.IGNORECASE|re.DOTALL)
        html = re.sub(r"<!-- Google tag \(gtag.js\)[\s\S]*?gtag\('config'[^<]*</script>", '', html, flags=re.IGNORECASE)

        # Ensure title
        if '<title>' in html:
            html = re.sub(r'<title>.*?</title>', NEW_TITLE, html, flags=re.IGNORECASE|re.DOTALL)
        else:
            # insert title after <head> or after meta charset
            html = re.sub(r'(<head[^>]*>\s*)', r"\1\n    " + NEW_TITLE + "\n", html, count=1, flags=re.IGNORECASE)

        # Ensure meta description exists/replace
        if 'name="description"' in html.lower():
            html = re.sub(r'<meta[^>]*name=[\'\"]description[\'\"][^>]*>', NEW_META, html, flags=re.IGNORECASE)
        else:
            # insert meta after title
            html = re.sub(r'(</title>\s*)', r"\1\n    " + NEW_META + "\n", html, count=1, flags=re.IGNORECASE)

        # Insert GA block before </head>
        if GA_BLOCK.strip() not in html:
            if '</head>' in html:
                html = html.replace('</head>', '\n    ' + GA_BLOCK + '\n</head>')
            else:
                # skip files without head close
                return False, 'no head tag'

        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)

        return True, 'updated'
    except Exception as e:
        return False, f'error: {e}'

def main():
    root = '.'
    html_files = []
    for dirpath, dirs, files in os.walk(root):
        for fn in files:
            if fn.lower().endswith('.html'):
                html_files.append(os.path.join(dirpath, fn))

    html_files.sort()
    total = len(html_files)
    fixed = 0
    skipped = 0
    errors = []

    for path in html_files:
        ok, msg = process_file(path)
        rel = os.path.relpath(path, '.')
        if ok:
            fixed += 1
            print(f'[UPDATED] {rel}')
        else:
            skipped += 1
            print(f'[SKIPPED] {rel} -> {msg}')
            if msg.startswith('error'):
                errors.append((rel, msg))

    print('\nSummary:')
    print(f'  Total HTML files: {total}')
    print(f'  Updated: {fixed}')
    print(f'  Skipped: {skipped}')
    if errors:
        print('  Errors:')
        for r,m in errors:
            print(f'    - {r}: {m}')

if __name__ == "__main__":
    main()
