# Spotify Strat Analysis

This repository supports a team-built interactive website for a strategic analysis assignment. The final deliverable is not a paper. It is a web experience that explains the company, presents a real strategic problem, shows the supporting evidence, and argues for a clear recommendation.

The repo is set up so both human collaborators and multiple AI assistants can work from the same project structure without losing context or stepping on each other.

## Project Overview

The goal of this project is to build an interactive strategy website that:

- explains the company and its market context
- identifies one clear strategic problem
- supports that problem with research, data, and analysis
- proposes a defensible recommendation
- presents everything through a polished web experience

The working model for this repo is backend to frontend:

1. organize research, content, and data
2. structure the strategic argument
3. build the frontend experience in Vite

## Current Status

The project foundation is in place.

Completed so far:

- top-level project folders created
- shared multi-assistant agent system created
- baseline source agents added for Claude, Codex, and Gemini
- shared agent skills and schema added
- agent merge and distribution pipeline added
- worklog and TODO system added
- Git hook workflow added for sync, commit validation, and push checks

Not built yet:

- Vite frontend scaffold
- company-specific research and content
- site narrative and design system
- charts, pages, and interactive presentation layer

## Repository Structure

Top-level folders:

- `frontend/`: Vite app, components, styling, charts, and interactions
- `backend/`: optional backend logic, APIs, or utility services if needed later
- `content/`: structured site copy and section-level narrative content
- `data/`: cleaned datasets and chart-ready files
- `research/`: source notes, analysis drafts, and supporting material
- `assets/`: images, screenshots, media, and other visual assets
- `notes/`: planning docs and the historical worklog
- `agents/`: shared multi-assistant system for Claude, Codex, and Gemini
- `scripts/`: automation scripts for sync, worklog updates, and Git workflow

Important project-state files:

- `TODO.md`: the current baton, next step, and active scope
- `notes/WORKLOG.md`: the historical timeline of work sessions and handoffs

## AI Assistant System

The repo includes a shared agent framework so Claude, Codex, and Gemini can all work from the same baseline.

Agent structure:

- `agents/sources/claude/`: Claude source agent definitions
- `agents/sources/codex/`: Codex source agent definitions
- `agents/sources/gemini/`: Gemini source agent definitions
- `agents/shared/skills/`: reusable shared skill instructions
- `agents/shared/schemas/`: canonical schema for normalized agents
- `agents/shared/templates/`: reusable templates for future agents
- `agents/generated/normalized/`: normalized agent outputs
- `agents/generated/merged/`: merged canonical agent definitions
- `agents/generated/distributed/`: generated assistant-facing outputs
- `agents/generated/reports/`: merge reports and sync state

Current baseline agents exist in all three source folders:

- `frontend-developer`
- `research-analyst`
- `data-analyst`
- `financial-analyst`
- `strategy-analyst`
- `recommendation-architect`
- `narrative-editor`

Important rule:

- source agent files may be edited
- shared skills and schema may be edited
- generated files should not be edited manually

## Collaboration Workflow

This repo is designed so contributors can stay aligned even when multiple people and AI assistants are involved.

Expected workflow:

1. read `README.md`
2. read `TODO.md`
3. read the latest entry in `notes/WORKLOG.md`
4. work only within your current scope
5. let Git hooks update project state during commit
6. push only when the repo is clean and synchronized

The main collaboration principle is simple:

- `WORKLOG.md` explains what happened
- `TODO.md` explains what should happen next

## Worklog And TODO

The repository uses two different state files on purpose.

`notes/WORKLOG.md` is the historical record.
Each meaningful work session should append a new entry including:

- date
- time
- timezone
- actor
- objective
- files changed
- summary
- decisions
- open questions
- next step
- owns next
- do not touch

`TODO.md` is the current baton.
It should stay short and current, showing:

- current date
- current time
- current timezone
- current actor
- current objective
- next step
- blockers
- files in scope
- files out of scope

Whenever the worklog is updated, `TODO.md` should also be updated.

## Git Automation

This repo is intended to be Git-hook-driven.

Hooks live in `.githooks/` and enforce the shared workflow:

- `pre-commit`
  - detects staged work
  - runs agent merge when needed
  - updates `notes/WORKLOG.md`
  - updates `TODO.md`
  - stages generated outputs and project state files

- `commit-msg`
  - enforces commit message format
  - required subject format: `type(scope): short summary`
  - required body fields: `Summary:`, `Why:`, and `Follow-up:`

- `pre-push`
  - reruns agent checks
  - blocks push if generated agent files, `WORKLOG.md`, or `TODO.md` changed but were not committed

The default assumption is that contributors should rely on Git hooks rather than memory to keep the repo in sync.

## Commit Standard

All commits should use this subject format:

`type(scope): short summary`

Allowed types:

- `feat`
- `fix`
- `docs`
- `refactor`
- `chore`
- `data`
- `design`

Required commit body:

- `Summary:`
- `Why:`
- `Follow-up:`

Example:

```text
feat(agents): add baseline multi-assistant source agents

Summary:
- add starter agent files for Claude, Codex, and Gemini
- establish shared baseline for future repo clones

Why:
- ensure all assistants start from the same source-layer foundation

Follow-up:
- verify generated outputs and commit the project foundation
```

## Skills

Shared assistant skills live in `agents/shared/skills/`.

Important current skills:

- `github-update.md`: rules for commits and pushes
- `worklog-update.md`: rules for updating the worklog and TODO
- `company-research.md`
- `financial-analysis.md`
- `competitor-benchmarking.md`
- `industry-analysis.md`
- `narrative-structuring.md`
- `source-validation.md`
- `frontend-storytelling.md`

These files define how assistants should behave across the repo.

## Getting Started

If you are new to the repo, do this first:

1. read this `README.md`
2. read `TODO.md`
3. read the latest entry in `notes/WORKLOG.md`
4. confirm what files are in scope for your task
5. make your changes
6. commit with the required format
7. push only after the repo is clean

If you are using an AI assistant, make sure it follows the shared skills and respects the worklog and TODO system.

## Current Next Step

The next major task is to verify the full Git-hook workflow with a normal local commit, then move into actual project build-out:

- confirm hook execution on the local machine without environment restrictions
- begin the Vite/frontend scaffold
- start company-specific research and content planning
