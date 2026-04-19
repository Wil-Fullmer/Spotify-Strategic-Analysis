import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const ROOT = process.cwd();
const WORKLOG_PATH = path.join(ROOT, "notes", "WORKLOG.md");
const TODO_PATH = path.join(ROOT, "TODO.md");
const TIMEZONE = "America/Denver";

const AGENT_PATH_PREFIXES = [
  "agents/sources/",
  "agents/shared/",
  "agents/generated/",
  "scripts/merge-agents.mjs",
  "scripts/watch-agents.mjs",
  "scripts/start-agent-sync.ps1",
  "scripts/start-agent-sync.sh",
  "scripts/pre-commit-agent-sync.mjs",
  "scripts/pre-push-agent-check.mjs",
  "scripts/update-worklog.mjs"
];

async function getGitOutput(args) {
  const { stdout } = await execFileAsync("git", args, { cwd: ROOT });
  return stdout.trim();
}

function isAgentRelated(file) {
  return AGENT_PATH_PREFIXES.some((prefix) => file.startsWith(prefix));
}

function inferActor(files) {
  if (files.some((file) => file.startsWith("agents/sources/claude/"))) {
    return "claude";
  }
  if (files.some((file) => file.startsWith("agents/sources/codex/"))) {
    return "codex";
  }
  if (files.some((file) => file.startsWith("agents/sources/gemini/"))) {
    return "gemini";
  }
  if (process.env.AI_ASSISTANT) {
    return process.env.AI_ASSISTANT;
  }
  if (process.env.USERNAME) {
    return process.env.USERNAME;
  }
  if (process.env.USER) {
    return process.env.USER;
  }
  return "unknown";
}

function formatLocalParts(date = new Date()) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });

  const parts = Object.fromEntries(
    formatter.formatToParts(date).map((part) => [part.type, part.value])
  );

  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    time: `${parts.hour}:${parts.minute}`
  };
}

async function ensureFile(filePath, content) {
  try {
    await fs.access(filePath);
  } catch {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, "utf8");
  }
}

function buildSummary(files) {
  if (files.length === 0) {
    return "No staged file changes detected.";
  }
  if (files.some(isAgentRelated)) {
    return "Updated agent-related files and synchronized assistant-facing project state.";
  }
  return "Updated project files and refreshed collaboration state.";
}

function buildDecisions(files) {
  if (files.some(isAgentRelated)) {
    return "Agent-related changes should remain synchronized through generated outputs and shared skills.";
  }
  return "Project state files should stay aligned with the latest committed work.";
}

function buildOpenQuestions(files) {
  if (files.some((file) => file.startsWith("agents/sources/claude/") || file.startsWith("agents/sources/gemini/"))) {
    return "Verify cross-assistant normalization and merge behavior after additional source agents are added.";
  }
  return "none";
}

function buildNextStep(files) {
  if (files.some(isAgentRelated)) {
    return "Review generated agent outputs, then continue with the next planned assistant or project task.";
  }
  return "Continue the next scoped project task using the current baton state.";
}

function buildOwnsNext(files) {
  return files.length > 0 ? files.join(", ") : "none";
}

function buildDoNotTouch(files) {
  const topLevel = ["frontend/", "backend/", "content/", "data/", "research/", "assets/"];
  const touched = new Set(
    files
      .map((file) => `${file.split("/")[0]}/`)
      .filter((value) => value !== "./")
  );

  const untouched = topLevel.filter((segment) => !touched.has(segment));
  return untouched.length > 0 ? untouched.join(", ") : "none";
}

async function main() {
  await ensureFile(
    WORKLOG_PATH,
    "# Worklog\n\nThis file is the historical timeline for the project. Each meaningful work session should append a new entry so human collaborators and AI assistants can reconstruct what changed, why it changed, and what should happen next.\n\n## Entry Template\n\n```md\n## YYYY-MM-DD HH:MM Timezone - actor\n\n- Objective:\n- Files Changed:\n- Summary:\n- Decisions:\n- Open Questions:\n- Next Step:\n- Owns Next:\n- Do Not Touch:\n```\n\n## Entries\n"
  );

  await ensureFile(
    TODO_PATH,
    "# TODO\n\n- Current Date:\n- Current Time:\n- Current Timezone:\n- Current Actor:\n- Current Objective:\n- Next Step:\n- Blockers:\n- Files In Scope:\n- Files Out Of Scope:\n"
  );

  const stagedRaw = await getGitOutput(["diff", "--cached", "--name-only"]);
  const stagedFiles = stagedRaw
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .filter((file) => file !== "notes/WORKLOG.md" && file !== "TODO.md");

  if (stagedFiles.length === 0) {
    console.log("Worklog update skipped. No staged project files.");
    return;
  }

  const actor = inferActor(stagedFiles);
  const branch = await getGitOutput(["branch", "--show-current"]);
  const { date, time } = formatLocalParts();
  const objective = stagedFiles.some(isAgentRelated)
    ? "Synchronize agent system and project state"
    : "Update project files and maintain collaboration state";
  const summary = buildSummary(stagedFiles);
  const decisions = buildDecisions(stagedFiles);
  const openQuestions = buildOpenQuestions(stagedFiles);
  const nextStep = buildNextStep(stagedFiles);
  const ownsNext = buildOwnsNext(stagedFiles);
  const doNotTouch = buildDoNotTouch(stagedFiles);

  const entry = [
    `## ${date} ${time} ${TIMEZONE} - ${actor}`,
    "",
    `- Objective: ${objective}`,
    `- Branch: ${branch || "(unknown)"}`,
    `- Files Changed: ${stagedFiles.join(", ")}`,
    `- Summary: ${summary}`,
    `- Decisions: ${decisions}`,
    `- Open Questions: ${openQuestions}`,
    `- Next Step: ${nextStep}`,
    `- Owns Next: ${ownsNext}`,
    `- Do Not Touch: ${doNotTouch}`,
    ""
  ].join("\n");

  const currentWorklog = await fs.readFile(WORKLOG_PATH, "utf8");
  await fs.writeFile(WORKLOG_PATH, `${currentWorklog.trimEnd()}\n\n${entry}`, "utf8");

  const todoContent = [
    "# TODO",
    "",
    `- Current Date: ${date}`,
    `- Current Time: ${time}`,
    `- Current Timezone: ${TIMEZONE}`,
    `- Current Actor: ${actor}`,
    `- Current Objective: ${objective}`,
    `- Next Step: ${nextStep}`,
    "- Blockers: none",
    `- Files In Scope: ${ownsNext}`,
    `- Files Out Of Scope: ${doNotTouch}`,
    ""
  ].join("\n");

  await fs.writeFile(TODO_PATH, todoContent, "utf8");
  console.log("Worklog and TODO updated.");
}

main().catch((error) => {
  console.error("Failed to update worklog and TODO.");
  console.error(error);
  process.exit(1);
});
