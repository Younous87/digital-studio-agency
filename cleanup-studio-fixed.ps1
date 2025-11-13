# Cleanup Script - Remove Embedded Studio from Next.js (fixed)

Write-Host "🧹 Cleaning up embedded Sanity Studio from Next.js app..." -ForegroundColor Cyan

$items = @(
    @{ Path = "app\studio"; Type = 'dir' },
    @{ Path = "sanity.config.ts"; Type = 'file' },
    @{ Path = "sanity.cli.ts"; Type = 'file' },
    @{ Path = "sanity\schemas"; Type = 'dir' },
    @{ Path = "components\studio"; Type = 'dir' }
)

foreach ($item in $items) {
    $p = Join-Path (Get-Location) $item.Path
    if (Test-Path $p) {
        try {
            if ($item.Type -eq 'dir') { Remove-Item -Recurse -Force -LiteralPath $p }
            else { Remove-Item -Force -LiteralPath $p }
            Write-Host "✓ Removed $($item.Path)" -ForegroundColor Green
        } catch {
            Write-Host "⚠ Failed to remove $($item.Path): $_" -ForegroundColor Yellow
        }
    } else {
        Write-Host "- Not found: $($item.Path)" -ForegroundColor DarkGray
    }
}

Write-Host "\n✅ Cleanup complete!" -ForegroundColor Green
Write-Host "\n📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update package.json - remove 'sanity' and '@sanity/vision' dependencies (keep 'next-sanity')" -ForegroundColor White
Write-Host "2. Run: npm install" -ForegroundColor White
Write-Host "3. Restart Next.js: npm run dev" -ForegroundColor White
Write-Host "\n🎨 To run the Studio:" -ForegroundColor Yellow
Write-Host "cd sanity-studio" -ForegroundColor White
Write-Host "npm run dev" -ForegroundColor White
Write-Host "\nStudio will be at: http://localhost:3333" -ForegroundColor Cyan
Write-Host "Next.js will be at: http://localhost:3000" -ForegroundColor Cyan
