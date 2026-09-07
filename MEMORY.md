# MEMORY.md — Curated memory (auto-loaded)

> Claude Code loads the first **~200 lines / 25KB** of this file in **every session**.
> Keep it **curated and concise**: only durable lessons you want ALWAYS in context.
> Work continuity (session-log, learnings, troubleshooting…) lives in `.agent-memory/` (COMMITTED in this vault: continuity travels with the repo).

## How to use
- **One entry per lesson**, with a one-line summary on top. Record corrections and confirmed approaches (and why they mattered).
- Do not duplicate what the repo, `@AGENTS.md`, or git history already record. Update an existing entry instead of duplicating; delete the ones that turn out wrong.
- Ephemeral or single-session material → `.agent-memory/`, not here.

## Lessons
<!-- Add below. Example:
### [2026-08-02] Destructive DB operations go to a script, not the agent
Why: the agent does write to the DB (migrate, seeds, INSERT/UPDATE with WHERE), but DROP/DELETE/TRUNCATE/fresh/rollback are materialized in `db/` and Carlos runs them (rule 4, fail-closed in git_guard).
-->

## Key reminders
- **Stack and pins:** `@.agent-rules/tech-stack.md` (single source — do not assume versions).
- **Non-negotiables and working mode:** `CLAUDE.md`.
- **Session continuity:** `.agent-memory/` (`project-overview.md`, `session-log.md`, `learnings.md`, `troubleshooting/`, `scratchpads/`).
