import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const gitDir = path.join(ROOT, ".git");
  if (!(await pathExists(gitDir))) {
    console.log("Git hooks not installed. Repository has not been initialized yet.");
    return;
  }

  await execFileAsync("git", ["config", "core.hooksPath", ".githooks"], { cwd: ROOT });
  console.log("Git hooks path configured to .githooks");
}

main().catch((error) => {
  console.error("Failed to install git hooks.");
  console.error(error);
  process.exit(1);
});
