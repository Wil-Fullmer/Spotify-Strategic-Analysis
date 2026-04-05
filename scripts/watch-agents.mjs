import fs from "node:fs";
import path from "node:path";
import { spawn } from "node:child_process";

const ROOT = process.cwd();
const WATCH_DIRS = [
  path.join(ROOT, "agents", "sources"),
  path.join(ROOT, "agents", "shared")
];

let timer = null;
let running = false;
let queued = false;

function shouldHandle(filename = "") {
  return [".json", ".md"].includes(path.extname(filename).toLowerCase());
}

function runMerge() {
  if (running) {
    queued = true;
    return;
  }

  running = true;
  const child = spawn(process.execPath, [path.join("scripts", "merge-agents.mjs")], {
    cwd: ROOT,
    stdio: "inherit"
  });

  child.on("exit", (code) => {
    running = false;

    if (code !== 0) {
      console.error(`Agent sync failed with exit code ${code}.`);
    }

    if (queued) {
      queued = false;
      scheduleMerge();
    }
  });
}

function scheduleMerge() {
  clearTimeout(timer);
  timer = setTimeout(() => {
    runMerge();
  }, 250);
}

for (const dir of WATCH_DIRS) {
  fs.watch(dir, { recursive: true }, (_eventType, filename) => {
    if (!shouldHandle(filename)) {
      return;
    }

    console.log(`Change detected: ${filename}`);
    scheduleMerge();
  });
}

console.log("Watching agent source and shared files for changes...");
runMerge();
