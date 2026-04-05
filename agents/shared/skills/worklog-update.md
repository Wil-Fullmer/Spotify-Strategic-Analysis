# Worklog Update

Purpose: keep project memory accurate across people and AI assistants by updating the worklog and TODO state consistently after each meaningful work session.

Use this skill whenever work is completed, handed off, committed, or prepared for push.

## Required Files

- `notes/WORKLOG.md`: historical timeline of what happened
- `TODO.md`: current baton for what should happen next

Both files must be kept aligned.

## Required For Every Worklog Entry

Each new entry must include:
- date
- time
- timezone
- actor or user
- objective
- files changed
- summary of work completed
- decisions made
- open questions
- next step
- owns next
- do not touch

## TODO Update Requirement

Every time `notes/WORKLOG.md` is updated, `TODO.md` must also be reviewed and updated.

`TODO.md` should reflect:
- current date
- current time
- current timezone
- current actor
- current objective
- next step
- blockers
- files in scope
- files out of scope

## Quality Rules

- write what actually happened, not vague progress language
- keep summaries concise but specific
- record ownership clearly so the next contributor knows where to work
- note blockers and unanswered questions explicitly
- make sure the next step in `TODO.md` matches the latest worklog entry

## Time Logging

Every worklog and TODO update must be time-logged with:
- date
- time
- timezone
- actor or user

Project continuity depends on accurate timestamps and attribution.
