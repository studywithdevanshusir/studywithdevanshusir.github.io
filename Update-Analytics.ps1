# Simple and reliable approach
$rootPath = "d:\WEBSITE BUILD DATA\DevanshuWebsite"
$updated = 0
$total = 0

Write-Host "========== GOOGLE ANALYTICS UPDATE ==========" -ForegroundColor Green
Write-Host "New GA ID: G-B153PB6GL3"
Write-Host ""

$files = Get-ChildItem -Path $rootPath -Filter "*.html" -Recurse

foreach ($file in $files) {
    $total++
    $filePath = $file.FullName
    
    Write-Host "[$total] $($file.Name):" -NoNewline
    
    $content = [System.IO.File]::ReadAllText($filePath, [System.Text.Encoding]::UTF8)
    $original = $content
    
    # Remove old analytics (simple approach - remove anything between <!-- Google tag and the closing </script> that contains G-74VNSC0NMX)
    if ($content -contains 'G-74VNSC0NMX') {
        # Find and remove old analytics block
        $lines = $content -split "`n"
        $newLines = @()
        $skipUntilClose = $false
        
        foreach ($line in $lines) {
            if ($line -like "*G-74VNSC0NMX*") {
                $skipUntilClose = $true
            }
            
            if ($skipUntilClose) {
                if ($line -like "*</script>*") {
                    $skipUntilClose = $false
                }
            } else {
                if ($line -notlike "*<!-- Google tag*" -or $line -notlike "*G-74VNSC0NMX*") {
                    $newLines += $line
                }
            }
        }
        
        $content = $newLines -join "`n"
    }
    
    # Remove any duplicate new analytics
    $content = $content -replace '(?s)    <!-- Google tag \(gtag\.js\) -->.*?gtag\(''config'', ''G-B153PB6GL3''\);.*?\n    </script>', ''
    
    # Add new analytics before </head> if not present
    if ($content -notlike "*G-B153PB6GL3*") {
        $newAnalytics = @"
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-B153PB6GL3"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-B153PB6GL3');
    </script>
"@
        $content = $content -replace '</head>', "$newAnalytics`n</head>"
    }
    
    # Save
    if ($content -ne $original) {
        [System.IO.File]::WriteAllText($filePath, $content, [System.Text.Encoding]::UTF8)
        $updated++
        Write-Host " OK" -ForegroundColor Green
    } else {
        Write-Host " SKIP" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "========== COMPLETE ==========" -ForegroundColor Green
Write-Host "Total: $total | Updated: $updated"
