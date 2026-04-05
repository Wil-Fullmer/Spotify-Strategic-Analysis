import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();

async function getGitOutput(args) {
  const { stdout } = await execFileAsync("git", args, { cwd: ROOT });
  return stdout.trim();
}

async function main() {
  await execFileAsync(process.execPath, ["scripts/merge-agents.mjs"], { cwd: ROOT, stdio: "inherit" });

  const status = await getGitOutput(["status", "--porcelain"]);
  const relevantDirty = status
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((line) =>
      ["agents/generated/", "notes/WORKLOG.md", "TODO.md"].some((segment) => line.includes(segment))
    );

  if (relevantDirty.length > 0) {
    console.error("Push blocked. Generated agent files, worklog, or TODO changed and are not committed.");
    for (const line of relevantDirty) {
      console.error(line);
    }
    process.exit(1);
  }

  console.log("Pre-push agent check passed.");
}

main().catch((error) => {
  console.error("Pre-push agent check failed.");
  console.error(error);
  process.exit(1);
});
