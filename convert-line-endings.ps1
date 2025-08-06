# Convert line endings from CRLF to LF for Linux hosting
# This script converts all text files to use LF line endings

Write-Host "Converting line endings from CRLF to LF..." -ForegroundColor Green

# Get all text files that should use LF
$files = @(
    "backend/server.js",
    "backend/database.js",
    "backend/package.json",
    "backend/env.example",
    "backend/render.yaml",
    "render.yaml",
    "README.md",
    ".gitattributes"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        Write-Host "Converting: $file" -ForegroundColor Yellow
        
        # Read file content
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # Replace CRLF with LF
        $content = $content -replace "`r`n", "`n"
        
        # Write back with LF line endings
        [System.IO.File]::WriteAllText($file, $content, [System.Text.Encoding]::UTF8)
        
        Write-Host "✓ Converted: $file" -ForegroundColor Green
    } else {
        Write-Host "⚠ File not found: $file" -ForegroundColor Red
    }
}

Write-Host "Line ending conversion completed!" -ForegroundColor Green 