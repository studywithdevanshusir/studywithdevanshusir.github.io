#!/usr/bin/env python3
"""
Generate a full sitemap.xml for the site by scanning all HTML files.
Writes `sitemap.xml` at repository root (UTF-8, no BOM).
Skips verification files and hidden files.
"""
import os
from pathlib import Path
from datetime import datetime

BASE_URL = 'https://studywithdevanshusir.github.io'
ROOT = Path('.')
SKIP = {'googleebf212af9f193966.html'}

def file_url(p: Path) -> str:
    # Convert filesystem path to site URL
    p = p.as_posix()
    if p == 'index.html':
        return BASE_URL + '/'
    if p.endswith('/index.html'):
        return BASE_URL + '/' + p.rsplit('/index.html', 1)[0] + '/'
    return BASE_URL + '/' + p

def priority_for(p: Path) -> str:
    # simple heuristic: root index 1.0, directory indexes 0.9, top-level pages 0.8, others 0.6
    s = p.as_posix()
    if s == 'index.html':
        return '1.0'
    if s.count('/') == 0:
        return '0.8'
    if s.endswith('index.html'):
        return '0.9'
    return '0.6'

def lastmod_for(p: Path) -> str:
    try:
        ts = p.stat().st_mtime
        return datetime.utcfromtimestamp(ts).date().isoformat()
    except Exception:
        return datetime.utcnow().date().isoformat()

def main():
    html_files = []
    for p in ROOT.rglob('*.html'):
        # ignore files in .git or node_modules or .github
        if any(part.startswith('.') for part in p.parts):
            if p.parts[0].startswith('.'):
                continue
        rel = p.relative_to(ROOT)
        if rel.name in SKIP:
            continue
        html_files.append(rel)

    html_files = sorted(html_files, key=lambda x: x.as_posix())

    lines = []
    lines.append('<?xml version="1.0" encoding="UTF-8"?>')
    lines.append('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

    for p in html_files:
        url = file_url(p)
        lastmod = lastmod_for(p)
        pr = priority_for(p)
        lines.append('  <url>')
        lines.append(f'    <loc>{url}</loc>')
        lines.append(f'    <lastmod>{lastmod}</lastmod>')
        lines.append(f'    <priority>{pr}</priority>')
        lines.append('  </url>')

    lines.append('</urlset>')

    out = '\n'.join(lines) + '\n'
    with open('sitemap.xml', 'w', encoding='utf-8') as f:
        f.write(out)

    print(f'Wrote sitemap.xml with {len(html_files)} entries')

if __name__ == '__main__':
    main()
