# GitHub Update

Purpose: standardize how assistants prepare commits and pushes so repository history stays clear, consistent, and aligned with project state files.

Use this skill whenever work is being finalized, handed off, committed, or pushed.

## Required Before Commit

- review the files changed and keep commits scoped to one coherent unit of work
- update `notes/WORKLOG.md` with a new timestamped entry
- update `TODO.md` so the current next step reflects the latest project state
- confirm generated or derived files are in sync with their sources
- avoid committing unrelated edits together

## Required Commit Format

Commit subject must use:

`type(scope): short summary`

Allowed types:
- `feat`
- `fix`
- `docs`
- `refactor`
- `chore`
- `data`
- `design`

Example:

`feat(agents): add shared worklog and github update skills`

## Required Commit Body

Each commit body should include:

- `Summary:` what changed
- `Why:` why the change was made
- `Follow-up:` next action, open issue, or `none`

## Push Rules

- do not push if `notes/WORKLOG.md` and `TODO.md` do not reflect the latest work session
- do not push if generated agent outputs are out of sync
- do not use vague commit messages like `update`, `progress`, or `fix stuff`
- make sure timestamp, date, and actor identity are recorded in project state files before push
- rely on the repository Git hooks as the default enforcement path, not on memory or manual checking

## Time Logging

Every commit-related update must preserve:
- date
- time
- timezone
- actor or user name

Repository history and project state should always tell the same story.
