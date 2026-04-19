$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
Set-Location $repoRoot

if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
  Write-Error "Node.js is not installed or not available in PATH."
  exit 1
}

Write-Host "Starting agent sync watcher..."
node scripts/watch-agents.mjs
