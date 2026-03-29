# convex-chat Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Create four Claude Code subagents, a CLAUDE.md, then restructure the repo so `convex-chat/` is the git root with full history preserved.

**Architecture:** Create agents and CLAUDE.md inside the current project first, then use `git mv` to restructure everything into `convex-chat/`, commit, and physically move `.git/` to make `convex-chat/` the repo root.

**Tech Stack:** Next.js 16, Convex, Tailwind v4, shadcn/ui, Radix UI, Quill, Jotai, Bun, TypeScript, Lefthook, commitlint

---

## File Map

**Created:**
- `nextjs/realtime-slack-clone-project/.claude/agents/frontend.md`
- `nextjs/realtime-slack-clone-project/.claude/agents/backend.md`
- `nextjs/realtime-slack-clone-project/.claude/agents/design.md`
- `nextjs/realtime-slack-clone-project/.claude/agents/cicd.md`
- `nextjs/realtime-slack-clone-project/CLAUDE.md`

**Moved (git mv):**
- `nextjs/realtime-slack-clone-project/` → `convex-chat/` (entire directory)
- `commitlint.config.js` → `convex-chat/commitlint.config.js`

**Updated:**
- `convex-chat/package.json` — rename to `convex-chat`, merge lefthook/commitlint devDeps
- `convex-chat/lefthook.yml` — remove `root:` path prefixes

---

## Task 1: Create frontend agent

**Files:**
- Create: `nextjs/realtime-slack-clone-project/.claude/agents/frontend.md`

- [ ] **Step 1: Create the agent file**

```markdown
---
name: frontend
description: Use when working on Next.js 16 pages, app router layouts, routing, React server/client components, data fetching with Convex hooks (useQuery/useMutation), Jotai state, nuqs URL state, or anything in src/app/, src/features/, src/hooks/, or src/lib/.
---

You are the frontend specialist for convex-chat, a Slack-like realtime chat app.

## Your Domain
- `src/app/` — Next.js 16 App Router: pages, layouts, loading states, error boundaries
- `src/features/` — Feature modules: auth, channels, conversations, members, messages, reactions, upload, workspaces
- `src/hooks/` — Custom React hooks
- `src/lib/` — Shared utilities

## Tech Stack
- **Next.js 16** with App Router — use server components by default, `"use client"` only when needed (event handlers, browser APIs, hooks)
- **Convex** for data — `useQuery(api.*)` for reads, `useMutation(api.*)` for writes, all real-time by default
- **Jotai** for local/global UI state — atoms in `src/features/*/store.ts` or `src/lib/`
- **nuqs** for URL state — `useQueryState()` for things like selected workspace, channel, message thread panel

## Conventions
- Feature folders under `src/features/<name>/` contain components, hooks, and API wrappers
- Pages live at `src/app/(routes)/`
- Prefer `useQuery` + loading states over manual fetch
- Use `ConvexClientProvider` (already in `src/app/ConvexClientProvider.tsx`) for Convex context
- Use `"use client"` directive only when the component uses hooks, event handlers, or browser APIs
```

- [ ] **Step 2: Verify file exists**

```bash
ls nextjs/realtime-slack-clone-project/.claude/agents/frontend.md
```
Expected: file listed.

---

## Task 2: Create backend agent

**Files:**
- Create: `nextjs/realtime-slack-clone-project/.claude/agents/backend.md`

- [ ] **Step 1: Create the agent file**

```markdown
---
name: backend
description: Use when working on Convex backend functions (queries, mutations, actions), schema changes, auth configuration with @convex-dev/auth, HTTP endpoints, file upload, or anything in the convex/ directory.
---

You are the backend specialist for convex-chat, using Convex as the backend platform.

## Your Domain
- `convex/schema.ts` — Database schema (tables, indexes, validators)
- `convex/workspaces.ts`, `convex/channels.ts`, `convex/conversations.ts`, `convex/members.ts`, `convex/messages.ts`, `convex/reactions.ts`, `convex/users.ts`, `convex/upload.ts` — Feature functions
- `convex/auth.ts` + `convex/auth.config.ts` — Auth via `@convex-dev/auth`
- `convex/http.ts` — HTTP routes
- `convex/_generated/` — Auto-generated types (never edit manually)

## Tech Stack
- **Convex** — serverless backend: `query`, `mutation`, `action` functions
- **@convex-dev/auth** — authentication and session management
- Run locally: `bunx convex dev`

## Conventions
- Always define argument and return validators using `v.*` from `convex/values`
- Use `ctx.db.query()` for reads, `ctx.db.insert/patch/delete()` for writes
- Use `ctx.auth.getUserIdentity()` to get the current user in a function
- Indexes are defined in `schema.ts` — add `.index("by_field", ["field"])` before querying by non-id fields
- Never edit `convex/_generated/` — it is auto-generated on every `bunx convex dev` run
- Actions (not mutations) are used for side effects like sending emails or calling external APIs
```

- [ ] **Step 2: Verify file exists**

```bash
ls nextjs/realtime-slack-clone-project/.claude/agents/backend.md
```
Expected: file listed.

---

## Task 3: Create design agent

**Files:**
- Create: `nextjs/realtime-slack-clone-project/.claude/agents/design.md`

- [ ] **Step 1: Create the agent file**

```markdown
---
name: design
description: Use when working on UI components, Tailwind v4 styling, shadcn/ui components, Radix UI primitives, Quill editor, dark mode with next-themes, responsiveness, or anything in src/components/. Also use for visual consistency reviews.
---

You are the design specialist for convex-chat, responsible for UI components and visual consistency.

## Your Domain
- `src/components/` — Shared UI: editor, message-list, message, reactions, toolbar, profile, hints, emoji-popover, thumbnails, thread-bar, channel-hero, conversation-hero, renderer
- `src/components/ui/` — shadcn/ui primitives (button, dialog, dropdown-menu, avatar, separator, etc.)
- Tailwind classes across all files
- `src/app/globals.css` — Global styles and CSS variables

## Tech Stack
- **Tailwind v4** — utility-first CSS, configured via CSS variables in `globals.css` (no `tailwind.config.js`)
- **shadcn/ui** + **Radix UI** — headless accessible components. Registry config in `components.json`
- **Quill** — rich text editor, wrapped in `src/components/editor.tsx`
- **next-themes** — dark/light mode provider
- **lucide-react** + **react-icons** — icon libraries
- **class-variance-authority (cva)** + **clsx** + **tailwind-merge** — variant-based class composition

## Conventions
- Use `cn()` from `src/lib/utils.ts` for conditional class merging (combines clsx + tailwind-merge)
- Add new shadcn components via: `bunx shadcn@latest add <component>`
- Dark mode classes use `dark:` prefix
- Responsive breakpoints are mobile-first: `sm:640px`, `md:768px`, `lg:1024px`
- Never hardcode colour values — use CSS variables defined in `globals.css`
- `react-resizable-panels` is used for the main layout split panes
```

- [ ] **Step 2: Verify file exists**

```bash
ls nextjs/realtime-slack-clone-project/.claude/agents/design.md
```
Expected: file listed.

---

## Task 4: Create cicd agent

**Files:**
- Create: `nextjs/realtime-slack-clone-project/.claude/agents/cicd.md`

- [ ] **Step 1: Create the agent file**

```markdown
---
name: cicd
description: Use when working on git hooks, lefthook.yml, commitlint, build pipeline, package.json scripts, ESLint config, or Vercel/Convex deployment setup.
---

You are the CI/CD specialist for convex-chat.

## Your Domain
- `lefthook.yml` — Git hooks configuration
- `commitlint.config.js` — Commit message linting rules
- `package.json` scripts — `dev`, `build`, `start`, `lint`, `test`
- `eslint.config.mjs` — ESLint rules (flat config format)
- Vercel deployment (frontend) + Convex deployment (backend)

## Tech Stack
- **Bun** — package manager and test runner (`bun install`, `bun test`, `bun run <script>`)
- **Lefthook** — Git hooks manager. Register hooks after install: `bunx lefthook install`
- **commitlint** with `@commitlint/config-conventional` — enforces Conventional Commits
- **ESLint 9** — flat config in `eslint.config.mjs`

## Git Hooks (lefthook.yml)
- **commit-msg:** `bunx commitlint --edit {1}` — validates commit message format
- **pre-commit (parallel):** lint staged `*.{js,ts,jsx,tsx}` files + run build
- **pre-push (sequential):** build then `bun test`

## Conventional Commits Format
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore, ci
Example: feat(messages): add thread reply count
```

## Deployment
- **Convex backend:** `bunx convex deploy` — deploys all functions in `convex/`
- **Vercel frontend:** push to `main` triggers auto-deploy
- Environment variables: configured in Convex dashboard and Vercel dashboard — never committed to `.env.local` for production secrets
```

- [ ] **Step 2: Verify file exists**

```bash
ls nextjs/realtime-slack-clone-project/.claude/agents/cicd.md
```
Expected: file listed.

---

## Task 5: Create CLAUDE.md

**Files:**
- Create: `nextjs/realtime-slack-clone-project/CLAUDE.md`

- [ ] **Step 1: Create CLAUDE.md**

```markdown
# convex-chat

A Slack-like realtime chat application built with Next.js and Convex.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16 (App Router), React 19, TypeScript |
| Backend | Convex (serverless, realtime) |
| Auth | @convex-dev/auth |
| Styling | Tailwind v4, shadcn/ui, Radix UI |
| Editor | Quill |
| State | Jotai (UI state), nuqs (URL state), Convex (server state) |
| Runtime | Bun |

## Folder Structure

```
convex-chat/
├── convex/                  # Backend (Convex functions)
│   ├── schema.ts            # Database schema & indexes
│   ├── auth.ts              # Auth setup
│   ├── auth.config.ts       # Auth provider config
│   ├── workspaces.ts        # Workspace queries/mutations
│   ├── channels.ts
│   ├── conversations.ts
│   ├── members.ts
│   ├── messages.ts
│   ├── reactions.ts
│   ├── users.ts
│   ├── upload.ts
│   └── http.ts              # HTTP endpoints
├── src/
│   ├── app/                 # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── auth/            # Auth pages
│   │   ├── workspace/       # Workspace pages
│   │   └── join/            # Join workspace pages
│   ├── features/            # Feature modules
│   │   ├── auth/
│   │   ├── channels/
│   │   ├── conversations/
│   │   ├── members/
│   │   ├── messages/
│   │   ├── reactions/
│   │   ├── upload/
│   │   └── workspaces/
│   ├── components/          # Shared UI components
│   │   └── ui/              # shadcn/ui primitives
│   ├── hooks/               # Custom React hooks
│   └── lib/                 # Utilities (cn, etc.)
```

## Dev Commands

```bash
# Start Next.js dev server
bun run dev

# Start Convex backend (run alongside dev server in a separate terminal)
bunx convex dev

# Build for production
bun run build

# Lint
bun run lint

# Run tests
bun test

# Add a shadcn/ui component
bunx shadcn@latest add <component>

# Deploy Convex backend to production
bunx convex deploy
```

## Git Conventions

Commit messages follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore, ci
Example: feat(messages): add emoji reaction support
```

Enforced automatically by commitlint on every commit.

## Agents

Four Claude Code subagents in `.claude/agents/` — each specialises in a domain:

| Agent | Use when... |
|-------|------------|
| `frontend` | Next.js pages, routing, Convex data hooks, Jotai state, nuqs — `src/app/`, `src/features/`, `src/hooks/`, `src/lib/` |
| `backend` | Convex schema, queries, mutations, actions, auth — `convex/` |
| `design` | UI components, Tailwind styling, shadcn/ui, Radix UI, Quill, responsiveness — `src/components/` |
| `cicd` | Git hooks, lefthook, commitlint, build pipeline, deployments |

## Git Hooks (lefthook)

| Hook | What runs |
|------|-----------|
| `commit-msg` | commitlint — validates Conventional Commits format |
| `pre-commit` | ESLint on staged `.js/.ts/.jsx/.tsx` files + build check (parallel) |
| `pre-push` | Full build + `bun test` (sequential) |

Run `bunx lefthook install` after cloning to register hooks.
```

- [ ] **Step 2: Verify file exists**

```bash
ls nextjs/realtime-slack-clone-project/CLAUDE.md
```
Expected: file listed.

---

## Task 6: Commit agents and CLAUDE.md

**Files:** All files from Tasks 1–5

- [ ] **Step 1: Stage and commit**

Run from `fullstack-development/`:
```bash
git add nextjs/realtime-slack-clone-project/.claude/agents/frontend.md
git add nextjs/realtime-slack-clone-project/.claude/agents/backend.md
git add nextjs/realtime-slack-clone-project/.claude/agents/design.md
git add nextjs/realtime-slack-clone-project/.claude/agents/cicd.md
git add nextjs/realtime-slack-clone-project/CLAUDE.md
git commit -m "chore: add CLAUDE.md and four Claude Code subagents"
```
Expected: commit succeeds, commit-msg hook validates message.

---

## Task 7: git mv project into convex-chat/

**Files:** All tracked files in `nextjs/realtime-slack-clone-project/` + `commitlint.config.js`

- [ ] **Step 1: Move the project directory**

Run from `fullstack-development/`:
```bash
git mv nextjs/realtime-slack-clone-project convex-chat
```
Expected: `convex-chat/` now exists with all project files; `nextjs/` is now empty.

- [ ] **Step 2: Move commitlint config**

```bash
git mv commitlint.config.js convex-chat/commitlint.config.js
```
Expected: `convex-chat/commitlint.config.js` exists.

- [ ] **Step 3: Verify structure**

```bash
ls convex-chat/
```
Expected: `src/`, `convex/`, `package.json`, `CLAUDE.md`, `.claude/`, `commitlint.config.js`, `bun.lock`, `components.json`, `eslint.config.mjs`, `next.config.ts`, `tsconfig.json`, etc.

- [ ] **Step 4: Manually copy .env.local (not tracked by git)**

```bash
cp nextjs/realtime-slack-clone-project/.env.local convex-chat/.env.local
```
Note: `.env.local` is git-ignored, so `git mv` does not touch it. Copy it manually.

---

## Task 8: Update package.json — rename and merge devDeps

**Files:**
- Modify: `convex-chat/package.json`

- [ ] **Step 1: Update package.json**

Edit `convex-chat/package.json`. Change `"name"` and add the three root-level devDependencies:

```json
{
  "name": "convex-chat",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "bun test"
  },
  "dependencies": {
    "@auth/core": "0.37.0",
    "@convex-dev/auth": "^0.0.90",
    "@emoji-mart/data": "^1.2.1",
    "@emoji-mart/react": "^1.1.1",
    "@radix-ui/react-avatar": "^1.1.11",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-separator": "^1.1.8",
    "@radix-ui/react-slot": "^1.2.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "convex": "^1.31.2",
    "date-fns": "^4.1.0",
    "jotai": "^2.16.1",
    "lucide-react": "^0.562.0",
    "next": "16.1.1",
    "next-themes": "^0.4.6",
    "nuqs": "^2.8.9",
    "quill": "^2.0.3",
    "radix-ui": "^1.4.3",
    "react": "19.2.3",
    "react-dom": "19.2.3",
    "react-icons": "^5.5.0",
    "react-resizable-panels": "^4",
    "react-use": "^17.6.0",
    "react-verification-input": "^4.2.2",
    "sonner": "^2.0.7",
    "tailwind-merge": "^3.4.0"
  },
  "devDependencies": {
    "@commitlint/cli": "^20.4.1",
    "@commitlint/config-conventional": "^20.4.1",
    "@tailwindcss/postcss": "^4",
    "@types/bun": "^1.3.9",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "16.1.1",
    "eslint-plugin-import": "^2.32.0",
    "lefthook": "^2.1.1",
    "tailwindcss": "^4",
    "tw-animate-css": "^1.4.0",
    "typescript": "^5"
  },
  "ignoreScripts": [
    "sharp",
    "unrs-resolver"
  ],
  "trustedDependencies": [
    "sharp",
    "unrs-resolver"
  ]
}
```

---

## Task 9: Create updated lefthook.yml in convex-chat/

**Files:**
- Create: `convex-chat/lefthook.yml`

Note: The old `lefthook.yml` at `fullstack-development/` root is no longer needed (it referenced `nextjs/realtime-slack-clone-project/` paths). Write the new one directly at `convex-chat/lefthook.yml`.

- [ ] **Step 1: Create lefthook.yml without path prefixes**

```yaml
# convex-chat

# Validate commit messages follow Conventional Commits format
commit-msg:
  commands:
    commitlint:
      run: bunx commitlint --edit {1}

pre-commit:
  parallel: true
  commands:
    lint:
      glob: "*.{js,ts,jsx,tsx}"
      run: bun run lint {staged_files}

    build:
      run: bun run build

pre-push:
  parallel: false
  commands:
    build:
      run: bun run build

    test:
      run: bun test
```

- [ ] **Step 2: Remove the old lefthook.yml from root**

```bash
git rm lefthook.yml
```

---

## Task 10: Commit the reorg

- [ ] **Step 1: Stage all changes and commit**

Run from `fullstack-development/`:
```bash
git add convex-chat/package.json
git add convex-chat/lefthook.yml
git add -u
git status
```
`git add -u` stages the deletions from `git rm lefthook.yml` (Task 9 Step 2) and any other tracked modifications. Verify: only expected files staged (the git mv renames, updated package.json, new lefthook.yml, removed root lefthook.yml).

- [ ] **Step 2: Commit**

```bash
git commit -m "chore: restructure repo into convex-chat/ and update tooling"
```
Expected: commit succeeds (note: commit-msg hook still runs from old lefthook, that's fine).

---

## Task 11: Move .git/ into convex-chat/ and verify

- [ ] **Step 1: Move the .git directory**

Run from `fullstack-development/`:
```bash
mv .git convex-chat/.git
```
Expected: `fullstack-development/` no longer has a `.git/`. `convex-chat/` is now a git repo.

- [ ] **Step 2: Verify git works from convex-chat/**

```bash
cd convex-chat && git log --oneline -5
```
Expected: full commit history shown, most recent being the reorg commit.

- [ ] **Step 3: Install dependencies**

```bash
bun install
```
Expected: installs all deps including `lefthook` and `@commitlint/*`.

- [ ] **Step 4: Register lefthook hooks**

```bash
bunx lefthook install
```
Expected: `Lefthook installed` — hooks registered in `.git/hooks/`.

- [ ] **Step 5: Verify lint passes**

```bash
bun run lint
```
Expected: no errors.

- [ ] **Step 6: Verify build passes**

```bash
bun run build
```
Expected: build succeeds.
