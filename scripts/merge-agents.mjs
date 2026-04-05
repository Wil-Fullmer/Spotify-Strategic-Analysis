import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const ROOT = process.cwd();
const AGENTS_DIR = path.join(ROOT, "agents");
const SOURCES_DIR = path.join(AGENTS_DIR, "sources");
const SHARED_DIR = path.join(AGENTS_DIR, "shared");
const NORMALIZED_DIR = path.join(AGENTS_DIR, "generated", "normalized");
const MERGED_DIR = path.join(AGENTS_DIR, "generated", "merged");
const DISTRIBUTED_DIR = path.join(AGENTS_DIR, "generated", "distributed");
const REPORTS_DIR = path.join(AGENTS_DIR, "generated", "reports");
const STATE_FILE = path.join(REPORTS_DIR, "sync-state.json");

const ASSISTANTS = ["claude", "codex", "gemini"];

async function ensureDir(dirPath) {
  await fs.mkdir(dirPath, { recursive: true });
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

async function pathExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

function isObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

function createHash(value) {
  return crypto.createHash("sha256").update(value).digest("hex");
}

function normalizeAgent(raw, source, filePath) {
  const id = raw.id ?? raw.slug ?? raw.agent_id;
  const name = raw.name ?? raw.title ?? id;
  const description = raw.description ?? raw.summary ?? "No description provided.";
  const version = raw.version ?? "0.1.0";
  const status = raw.status ?? "draft";
  const skills = Array.isArray(raw.skills) ? raw.skills : [];
  const tags = Array.isArray(raw.tags) ? raw.tags : [];
  const capabilities = Array.isArray(raw.capabilities) ? raw.capabilities : [];
  const inputs = Array.isArray(raw.inputs) ? raw.inputs : [];
  const outputs = Array.isArray(raw.outputs) ? raw.outputs : [];
  const extendsList = Array.isArray(raw.extends) ? raw.extends : [];

  const inlineInstructions =
    raw.instructions ??
    raw.prompt ??
    raw.system_prompt ??
    raw.content;

  const instructionsFile = raw.instructions_file ?? raw.file;

  const instructions = instructionsFile
    ? { type: "file", value: instructionsFile }
    : { type: "inline", value: inlineInstructions ?? "TODO: add instructions" };

  if (!id || !name) {
    throw new Error(`Missing required identity fields in ${filePath}`);
  }

  return {
    id,
    name,
    description,
    source,
    version,
    status,
    instructions,
    skills,
    tags,
    capabilities,
    inputs,
    outputs,
    extends: extendsList,
    source_meta: isObject(raw.source_meta)
      ? raw.source_meta
      : {
          original_file: path.relative(ROOT, filePath),
          original_fields: Object.keys(raw)
        }
  };
}

function mergeAgents(agentGroup) {
  const [first, ...rest] = agentGroup;
  const merged = {
    ...first,
    source: "merged",
    source_meta: {
      contributors: agentGroup.map((agent) => ({
        source: agent.source,
        file: agent.source_meta?.original_file ?? null
      }))
    }
  };

  const conflicts = [];

  for (const agent of rest) {
    for (const key of ["name", "description", "version", "status"]) {
      if (merged[key] !== agent[key]) {
        conflicts.push({
          id: merged.id,
          field: key,
          values: [merged[key], agent[key]],
          sources: [merged.source_meta.contributors[0]?.source, agent.source]
        });
      }
    }

    for (const key of ["skills", "tags", "capabilities", "inputs", "outputs", "extends"]) {
      merged[key] = [...new Set([...(merged[key] ?? []), ...(agent[key] ?? [])])];
    }

    if (
      merged.instructions.type !== agent.instructions.type ||
      merged.instructions.value !== agent.instructions.value
    ) {
      conflicts.push({
        id: merged.id,
        field: "instructions",
        values: [merged.instructions, agent.instructions],
        sources: [merged.source_meta.contributors[0]?.source, agent.source]
      });
    }
  }

  return { merged, conflicts };
}

async function getSourceFiles(source) {
  const sourceDir = path.join(SOURCES_DIR, source);
  await ensureDir(sourceDir);
  const entries = await fs.readdir(sourceDir, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
    .map((entry) => path.join(sourceDir, entry.name));
}

async function getSharedFiles() {
  const folders = [
    path.join(SHARED_DIR, "skills"),
    path.join(SHARED_DIR, "schemas"),
    path.join(SHARED_DIR, "templates")
  ];

  const files = [];

  for (const folder of folders) {
    await ensureDir(folder);
    const entries = await fs.readdir(folder, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isFile()) {
        files.push(path.join(folder, entry.name));
      }
    }
  }

  return files.sort();
}

async function writeJson(filePath, data) {
  await fs.writeFile(filePath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function collectInputState() {
  const files = [];

  for (const source of ASSISTANTS) {
    files.push(...(await getSourceFiles(source)));
  }

  files.push(...(await getSharedFiles()));

  const entries = [];
  for (const filePath of files.sort()) {
    const raw = await fs.readFile(filePath);
    entries.push({
      file: path.relative(ROOT, filePath),
      hash: createHash(raw)
    });
  }

  return {
    files: entries,
    digest: createHash(JSON.stringify(entries))
  };
}

async function readState() {
  if (!(await pathExists(STATE_FILE))) {
    return null;
  }

  try {
    return JSON.parse(await fs.readFile(STATE_FILE, "utf8"));
  } catch {
    return null;
  }
}

async function writeDistributedOutputs(mergedAgents) {
  for (const assistant of ASSISTANTS) {
    const assistantDir = path.join(DISTRIBUTED_DIR, assistant);
    await ensureDir(assistantDir);

    for (const agent of mergedAgents) {
      const payload = {
        ...agent,
        source_meta: {
          ...agent.source_meta,
          distributed_for: assistant
        }
      };

      await writeJson(path.join(assistantDir, `${agent.id}.json`), payload);
    }

    await writeJson(path.join(assistantDir, "registry.json"), {
      generated_at: new Date().toISOString(),
      assistant,
      count: mergedAgents.length,
      agents: mergedAgents.map((agent) => ({
        id: agent.id,
        name: agent.name,
        status: agent.status,
        tags: agent.tags
      }))
    });
  }
}

async function main() {
  await Promise.all([
    ensureDir(NORMALIZED_DIR),
    ensureDir(MERGED_DIR),
    ensureDir(DISTRIBUTED_DIR),
    ensureDir(REPORTS_DIR)
  ]);

  const inputState = await collectInputState();
  const previousState = await readState();

  if (previousState?.digest === inputState.digest) {
    console.log("Agent sync skipped. No source or shared file changes detected.");
    return;
  }

  const normalizedAgents = [];
  const skipped = [];

  for (const source of ASSISTANTS) {
    const files = await getSourceFiles(source);

    for (const filePath of files) {
      try {
        const raw = await readJson(filePath);
        const normalized = normalizeAgent(raw, source, filePath);
        normalizedAgents.push(normalized);

        const outPath = path.join(NORMALIZED_DIR, `${normalized.id}.${source}.json`);
        await writeJson(outPath, normalized);
      } catch (error) {
        skipped.push({
          source,
          file: path.relative(ROOT, filePath),
          reason: error.message
        });
      }
    }
  }

  const grouped = new Map();
  for (const agent of normalizedAgents) {
    if (!grouped.has(agent.id)) {
      grouped.set(agent.id, []);
    }
    grouped.get(agent.id).push(agent);
  }

  const mergedAgents = [];
  const conflicts = [];

  for (const group of grouped.values()) {
    const { merged, conflicts: groupConflicts } = mergeAgents(group);
    mergedAgents.push(merged);
    conflicts.push(...groupConflicts);
    await writeJson(path.join(MERGED_DIR, `${merged.id}.json`), merged);
  }

  await writeJson(path.join(MERGED_DIR, "registry.json"), {
    generated_at: new Date().toISOString(),
    count: mergedAgents.length,
    agents: mergedAgents.map((agent) => ({
      id: agent.id,
      name: agent.name,
      source: agent.source,
      status: agent.status,
      tags: agent.tags
    }))
  });

  await writeDistributedOutputs(mergedAgents);

  await writeJson(path.join(REPORTS_DIR, "merge-report.json"), {
    generated_at: new Date().toISOString(),
    normalized_count: normalizedAgents.length,
    merged_count: mergedAgents.length,
    skipped,
    conflicts
  });

  await writeJson(STATE_FILE, {
    generated_at: new Date().toISOString(),
    digest: inputState.digest,
    files: inputState.files,
    normalized_count: normalizedAgents.length,
    merged_count: mergedAgents.length
  });

  console.log(
    `Agent merge complete. Normalized: ${normalizedAgents.length}, merged: ${mergedAgents.length}, conflicts: ${conflicts.length}, skipped: ${skipped.length}`
  );
}

main().catch((error) => {
  console.error("Agent merge failed.");
  console.error(error);
  process.exit(1);
});
