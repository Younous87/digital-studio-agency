const fs = require('node:fs')
const path = require('node:path')
const { spawnSync } = require('node:child_process')

const SAMPLE_FILE = path.join(__dirname, 'sample-data.ndjson')
const OUT_FILE = path.join(__dirname, 'about-only.ndjson')

function generateSample() {
  console.log('No sample-data.ndjson found — generating with generate-import-file.js')
  const res = spawnSync(process.execPath, [path.join(__dirname, 'generate-import-file.js')], { stdio: 'inherit' })
  if (res.status !== 0) {
    console.error('Failed to generate sample-data.ndjson')
    process.exit(res.status || 1)
  }
}

function extractAbout() {
  if (!fs.existsSync(SAMPLE_FILE)) {
    generateSample()
  }

  const lines = fs.readFileSync(SAMPLE_FILE, 'utf8').split(/\r?\n/).filter(Boolean)
  const aboutLines = lines.filter((line) => {
    try {
      const json = JSON.parse(line)
      return json && json._type === 'about'
    } catch (err) {
      // ignore badly formatted lines — not expected in NDJSON, but continue
      return false
    }
  })

  if (aboutLines.length === 0) {
    console.log('No About documents found in sample-data.ndjson')
    return
  }

  fs.writeFileSync(OUT_FILE, aboutLines.join('\n') + '\n')
  console.log(`✅ Created ${path.basename(OUT_FILE)} containing ${aboutLines.length} About document(s).`)
  // Also create a copy without _id to avoid replacing existing docs during import
  const noId = aboutLines.map(line => {
    try {
      const obj = JSON.parse(line)
      delete obj._id
      return JSON.stringify(obj)
    } catch (err) {
      return null
    }
  }).filter(Boolean)
  const OUT_FILE_NOID = path.join(__dirname, 'about-only-noid.ndjson')
  fs.writeFileSync(OUT_FILE_NOID, noId.join('\n') + '\n')
  console.log(`✅ Created ${path.basename(OUT_FILE_NOID)} without _id for safe import (won't overwrite).`)
  console.log('\nImport into Sanity using:')
  console.log('  cd sanity-studio')
  console.log(`  npx sanity dataset import ../scripts/about-only.ndjson production --replace`) 
}

extractAbout()
