import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();

async function getGitOutput(args) {
  const { stdout } = await execFileAsync("git", args, { cwd: ROOT });
  return stdout.trim();
}

async function runNodeScript(scriptPath) {
  await execFileAsync(process.execPath, [scriptPath], { cwd: ROOT, stdio: "inherit" });
}

async function main() {
  const stagedRaw = await getGitOutput(["diff", "--cached", "--name-only"]);
  const stagedFiles = stagedRaw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (stagedFiles.length === 0) {
    console.log("Pre-commit sync skipped. No staged files.");
    return;
  }

  const agentRelated = stagedFiles.some((file) =>
    [
      "agents/sources/",
      "agents/shared/",
      "scripts/merge-agents.mjs",
      "scripts/watch-agents.mjs",
      "scripts/start-agent-sync.ps1",
      "scripts/start-agent-sync.sh"
    ].some((prefix) => file.startsWith(prefix))
  );

  if (agentRelated) {
    console.log("Agent-related staged changes detected. Running merge...");
    await runNodeScript("scripts/merge-agents.mjs");
    await execFileAsync("git", ["add", "agents/generated"], { cwd: ROOT });
  }

  await runNodeScript("scripts/update-worklog.mjs");
  await execFileAsync("git", ["add", "notes/WORKLOG.md"], { cwd: ROOT });
  await execFileAsync("git", ["add", "TODO.md"], { cwd: ROOT });

  if (agentRelated) {
    await execFileAsync("git", ["add", "agents/generated"], { cwd: ROOT });
  }
}

main().catch((error) => {
  console.error("Pre-commit agent sync failed.");
  console.error(error);
  process.exit(1);
});
