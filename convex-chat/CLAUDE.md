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
