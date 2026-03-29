# convex-chat Setup Design

**Date:** 2026-03-29
**Status:** Approved

## Overview

Establish `convex-chat` as a standalone git repository within `fullstack-development/`, create a `CLAUDE.md`, and configure four Claude Code subagents (frontend, backend, design, cicd). The restructuring moves the existing `nextjs/realtime-slack-clone-project/` contents to `convex-chat/` as the new git root.

---

## Part 1 — Claude Agents

Four context-focused agents with full tool access, each carrying deep knowledge of their domain. Stored in `.claude/agents/` at the `convex-chat/` repo root.

### frontend
- **Scope:** `src/app/`, `src/features/`, `src/hooks/`, `src/lib/`
- **Responsibilities:** Next.js 16 app router pages, layouts, routing, server/client components, data fetching via Convex React hooks, Jotai state, nuqs URL state

### backend
- **Scope:** `convex/`
- **Responsibilities:** Convex schema definitions, queries, mutations, actions, HTTP routes, auth config (`@convex-dev/auth`), file upload, real-time subscriptions

### design
- **Scope:** `src/components/`, Tailwind classes across all files
- **Responsibilities:** shadcn/ui components, Radix UI primitives, Tailwind v4 styling, Quill editor, responsiveness, dark mode via `next-themes`, visual consistency

### cicd
- **Scope:** `lefthook.yml`, `commitlint.config.js`, `package.json` scripts
- **Responsibilities:** Git hooks (pre-commit lint, pre-push build+test, commit-msg validation), Conventional Commits enforcement, Convex and Vercel deployment pipeline

---

## Part 2 — CLAUDE.md

Located at `convex-chat/` root. Sections:

1. Project overview (Slack-like realtime chat app)
2. Tech stack (Next.js 16, Convex, Tailwind v4, Radix UI/shadcn, Quill, Bun, TypeScript)
3. Folder structure (`src/` and `convex/` breakdown)
4. Dev commands (`bun run dev`, `bun run build`, `bun run lint`, `bun test`, `bunx convex dev`)
5. Git conventions (Conventional Commits via commitlint)
6. Agents (when to invoke each)
7. Git hooks summary (lefthook)

---

## Part 3 — Repo Restructuring

**Goal:** Preserve full git history. Use `git mv` to restructure files into `convex-chat/`, commit the reorg, then move `.git/` into `convex-chat/` so it becomes the repo root. App name renamed to `convex-chat` in `package.json`.

**Steps:**
1. Create `fullstack-development/convex-chat/`
2. `git mv` all contents from `nextjs/realtime-slack-clone-project/` → `convex-chat/` (preserves rename history)
3. `git mv commitlint.config.js` → `convex-chat/`
4. Update `lefthook.yml` — strip all `root: "nextjs/realtime-slack-clone-project/"` lines, move to `convex-chat/`
5. Merge devDependencies (`lefthook`, `commitlint` packages) into `convex-chat/package.json`
6. Rename `"name"` in `convex-chat/package.json` → `"convex-chat"`
7. Commit the reorg via the existing `fullstack-development/` git repo
8. Move `.git/` from `fullstack-development/` → `convex-chat/`
9. `convex-chat/` is now a fully functional git repo with complete history
10. Install deps inside `convex-chat/` and verify lefthook hooks work

**Updated lefthook.yml (key change):**
Remove all `root: "nextjs/realtime-slack-clone-project/"` lines — all commands run from repo root directly.

---

## Execution Order

1. Create agents in current project location (`nextjs/realtime-slack-clone-project/.claude/agents/`)
2. Create `CLAUDE.md` in `nextjs/realtime-slack-clone-project/`
3. Restructure into `convex-chat/` (separate step)
4. Update lefthook paths
