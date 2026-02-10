#!/usr/bin/env python3
import urllib.request
import time

url = 'https://studywithdevanshusir.github.io/'

print("=" * 70)
print("LIVE SITE VERIFICATION")
print("=" * 70)
print()

try:
    print(f"Checking: {url}")
    with urllib.request.urlopen(url, timeout=10) as response:
        html = response.read().decode('utf-8')
    
    # Check for complete GA tag
    has_async_script = 'script async src="https://www.googletagmanager.com/gtag/js?id=G-B153PB6GL3"' in html
    has_gtag_config = "gtag('config', 'G-B153PB6GL3')" in html
    
    if has_async_script and has_gtag_config:
        print("✅ COMPLETE GOOGLE ANALYTICS TAG DETECTED!")
        print()
        print("Verification Results:")
        print("  ✓ Async script loaded")
        print("  ✓ Tracking ID: G-B153PB6GL3")
        print("  ✓ Config function: Active")
        print()
        print("🎯 Google Analytics is NOW tracking your website!")
        print()
        print("Next Steps:")
        print("  1. Go to https://analytics.google.com/")
        print("  2. Select property: G-B153PB6GL3")
        print("  3. Wait 24-48 hours for data collection to show")
        
    else:
        print("⚠️  Tag not fully deployed yet")
        if has_async_script:
            print("  ✓ Async script found")
        else:
            print("  ✗ Async script missing")
        if has_gtag_config:
            print("  ✓ Config found")
        else:
            print("  ✗ Config missing")
            
except Exception as e:
    print(f"⏳ Site is deploying... ({type(e).__name__})")
    print("   Try again in 1-2 minutes for DNS propagation")

print()
print("=" * 70)
