import fs from "node:fs/promises";
import path from "node:path";

const messageFile = process.argv[2];

if (!messageFile) {
  console.error("Commit message validation failed. Missing commit message file path.");
  process.exit(1);
}

const fullPath = path.resolve(process.cwd(), messageFile);
const raw = await fs.readFile(fullPath, "utf8");
const lines = raw
  .split(/\r?\n/)
  .map((line) => line.trimEnd());

const subject = (lines[0] || "").trim();
const allowedTypes = ["feat", "fix", "docs", "refactor", "chore", "data", "design"];
const subjectPattern = new RegExp(
  `^(?:${allowedTypes.join("|")})\\([a-z0-9-]+\\): .+`
);

if (!subjectPattern.test(subject)) {
  console.error("Invalid commit subject.");
  console.error("Required format: type(scope): short summary");
  console.error(`Allowed types: ${allowedTypes.join(", ")}`);
  process.exit(1);
}

const hasSummary = lines.some((line) => line.startsWith("Summary:"));
const hasWhy = lines.some((line) => line.startsWith("Why:"));
const hasFollowUp = lines.some((line) => line.startsWith("Follow-up:"));

if (!hasSummary || !hasWhy || !hasFollowUp) {
  console.error("Invalid commit body.");
  console.error("Commit body must include:");
  console.error("- Summary:");
  console.error("- Why:");
  console.error("- Follow-up:");
  process.exit(1);
}

console.log("Commit message format OK.");
