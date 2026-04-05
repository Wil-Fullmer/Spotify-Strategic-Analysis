#!/usr/bin/env bash
set -euo pipefail

REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$REPO_ROOT"

if ! command -v node >/dev/null 2>&1; then
  echo "Node.js is not installed or not in PATH." >&2
  exit 1
fi

echo "Starting agent sync watcher..."
node scripts/watch-agents.mjs
