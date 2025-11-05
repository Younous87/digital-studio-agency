# Cleanup Script - Remove Embedded Studio from Next.js

Write-Host "🧹 Cleaning up embedded Sanity Studio from Next.js app..." -ForegroundColor Cyan

# Remove studio route
if (Test-Path "app\studio") {
    Remove-Item -Recurse -Force "app\studio"
    Write-Host "✓ Removed app/studio directory" -ForegroundColor Green
}

# Remove root-level Sanity configs
if (Test-Path "sanity.config.ts") {
    Remove-Item -Force "sanity.config.ts"
    Write-Host "✓ Removed sanity.config.ts" -ForegroundColor Green
}

if (Test-Path "sanity.cli.ts") {
    Remove-Item -Force "sanity.cli.ts"
    Write-Host "✓ Removed sanity.cli.ts" -ForegroundColor Green
}

# Remove schemas (now in separate studio)
if (Test-Path "sanity\schemas") {
    Remove-Item -Recurse -Force "sanity\schemas"
    Write-Host "✓ Removed sanity/schemas directory" -ForegroundColor Green
}

# Remove Studio wrapper component
if (Test-Path "components\studio") {
    Remove-Item -Recurse -Force "components\studio"
    Write-Host "✓ Removed components/studio directory" -ForegroundColor Green
}

Write-Host ""
Write-Host "✅ Cleanup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Next steps:" -ForegroundColor Yellow
Write-Host "1. Update package.json - remove 'sanity' dependency (keep 'next-sanity')" -ForegroundColor White
Write-Host "2. Run: npm install" -ForegroundColor White
Write-Host "3. Restart Next.js: npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "🎨 To run the Studio:" -ForegroundColor Yellow
Write-Host "cd sanity-studio" -ForegroundColor White
Write-Host "npm run dev" -ForegroundColor White
Write-Host ""
Write-Host "Studio will be at: http://localhost:3333" -ForegroundColor Cyan
Write-Host "Next.js will be at: http://localhost:3000" -ForegroundColor Cyan
