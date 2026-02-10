#!/usr/bin/env python3
"""
Auto-generate unique meta titles/descriptions from filenames and add JSON-LD for courses and articles.
Runs safely: skips verification files and preserves existing content where possible.
"""
import os
import re
from pathlib import Path
import json

ROOT = Path('.')
SKIP = {'googleebf212af9f193966.html'}

def humanize(path: Path) -> str:
    # Create readable name from filename/path
    s = path.as_posix()
    s = s.replace('index.html', '')
    # remove .html extension for filenames
    if s.endswith('.html'):
        s = s[:-5]
    s = s.strip('/')
    if not s:
        return 'Study With Devanshu Sir'
    parts = s.split('/')
    parts = [p.replace('-', ' ').replace('_', ' ') for p in parts if p]
    return ' - '.join([p.title() for p in parts])

def make_title(path: Path) -> str:
    name = humanize(path)
    if name == 'Study With Devanshu Sir':
        return 'Study With Devanshu Sir'
    return f"{name} | Study With Devanshu Sir"

def make_description(path: Path) -> str:
    name = humanize(path)
    if name == 'Study With Devanshu Sir':
        return 'Online study notes, classes, and learning resources by Devanshu Sir'
    # Short descriptive sentence
    base = name.split(' - ')[0]
    return f"{base} study notes, tutorials and classes by Devanshu Sir. Free resources for CBSE and beginners."

def create_jsonld(path: Path):
    # Add Course schema for course pages, Article schema for notes/blog
    s = path.as_posix()
    title = make_title(path)
    url = 'https://studywithdevanshusir.github.io/' + s if not s.endswith('/') else 'https://studywithdevanshusir.github.io/' + s
    if s.startswith('courses') or 'class' in s:
        schema = {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": title,
            "description": make_description(path),
            "url": url
        }
        return '<script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False) + '</script>'
    if s.startswith('notes') or s.startswith('blog') or s.startswith('presentations'):
        schema = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": make_description(path),
            "url": url
        }
        return '<script type="application/ld+json">' + json.dumps(schema, ensure_ascii=False) + '</script>'
    return ''

def process_html(path: Path):
    try:
        with open(path, 'r', encoding='utf-8') as f:
            html = f.read()
    except Exception:
        return False, 'read error'

    name = path.name
    if name in SKIP:
        return False, 'skip verification file'

    # Replace or insert title
    title_tag = f'<title>{make_title(path)}</title>'
    if re.search(r'<title>.*?</title>', html, flags=re.IGNORECASE|re.DOTALL):
        html = re.sub(r'<title>.*?</title>', title_tag, html, flags=re.IGNORECASE|re.DOTALL)
    else:
        # put after <head>
        html = re.sub(r'(<head[^>]*>\s*)', r"\1" + title_tag + "\n    ", html, count=1, flags=re.IGNORECASE)

    # Replace or insert meta description
    meta = f'<meta name="description" content="{make_description(path)}">'
    if re.search(r'<meta[^>]*name=[\'\"]description[\'\"][^>]*>', html, flags=re.IGNORECASE):
        html = re.sub(r'<meta[^>]*name=[\'\"]description[\'\"][^>]*>', meta, html, flags=re.IGNORECASE)
    else:
        # after title
        html = re.sub(r'(</title>\s*)', r"\1\n    " + meta + "\n", html, count=1, flags=re.IGNORECASE)

    # Add JSON-LD schema before </head>
    jsonld = create_jsonld(path)
    if jsonld:
        # remove existing similar JSON-LD for safety
        html = re.sub(r'<script type="application/ld\+json">[\s\S]*?<\/script>', '', html, flags=re.IGNORECASE)
        if '</head>' in html:
            html = html.replace('</head>', '\n    ' + jsonld + '\n</head>')

    try:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(html)
    except Exception as e:
        return False, f'write error: {e}'

    return True, 'updated'

def main():
    changed = 0
    total = 0
    for p in sorted(ROOT.rglob('*.html')):
        # skip hidden dirs
        if any(part.startswith('.') for part in p.parts):
            continue
        total += 1
        ok, msg = process_html(p)
        rel = p.relative_to(ROOT)
        if ok:
            changed += 1
            print(f'[UPDATED] {rel}')
        else:
            print(f'[SKIPPED] {rel} -> {msg}')

    print('\nSummary:')
    print(f'  Processed: {total} HTML files')
    print(f'  Updated: {changed}')

if __name__ == '__main__':
    main()
