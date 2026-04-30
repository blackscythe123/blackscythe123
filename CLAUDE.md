# CLAUDE.md — GitHub Profile README

This is the **GitHub profile README** repository for [@blackscythe123](https://github.com/blackscythe123).
It renders directly on the GitHub profile page and serves as a living portfolio of skills and projects.

---

## Repository Structure

```
.
├── README.md                  # The profile README rendered on GitHub
├── dist/                      # Auto-generated snake contribution SVGs (CI workflow)
├── .github/workflows/         # GitHub Actions (snake animation generation)
├── .claude/
│   └── skills/
│       └── update-stack.md   # Skill: audit repos and refresh the Tech Stack section
└── CLAUDE.md                  # This file
```

---

## README Structure

The README has three logical sections — **do not reorder them**:

| Section | Purpose |
|---|---|
| Header + social badges | Name, tagline, typing SVG, social links |
| GitHub Stats | Streak, stats card, top-languages card (via custom Vercel stats server) |
| Tech Stack | Flat-square badges grouped by category |
| Footer | Snake SVG + capsule-render wave |

---

## Tech Stack — Sections & Curation Rules

The Tech Stack uses `flat-square` shields.io badges. There are **7 sections** in order:

1. **Frontend** — languages, frameworks, UI libraries, animation, data-viz, routing
2. **Backend** — server frameworks, ORMs, languages, communication APIs
3. **Mobile** — cross-platform & native SDKs, on-device ML
4. **Database & Cloud** — databases (SQL + NoSQL), BaaS, hosting, deployment platforms, containers
5. **AI / Data Science** — ML frameworks, CV, data libraries, AI APIs
6. **Web3 / Blockchain** — smart contract languages, Ethereum client libraries
7. **Tools & Workflow** — build tools, dev tools, payment gateways, protocols, OS, package managers

### Adding new sections

The 7 sections above are the current baseline — **new sections can and should be created**
whenever a coherent technology group emerges that doesn't fit cleanly into an existing one.

Examples of when to add a new section:
- A new paradigm is adopted (e.g. "Edge / Serverless", "DevOps & CI/CD", "Game Dev")
- A technology cluster grows large enough to deserve its own grouping
- An existing section becomes overloaded (>10 badges) and splitting it improves readability

When creating a new section, place it logically between related existing sections and add
it to this list in CLAUDE.md so future sessions stay consistent.

### What to include
- Frameworks and libraries used **across multiple repos**, or in any **substantial project**
- Technologies that are **recognisable on a CV/portfolio** (employers know what they are)
- Languages detected as a **primary language** in at least one repo

### What to skip
- Tiny utility libraries (Zod, Gunicorn, polyline, fflate, etc.)
- Build-time-only tools that aren't part of the visible stack (Autoprefixer, PostCSS, ESLint configs)
- Academic/coursework-only repos where the language isn't used in any real project
- Duplicate abstractions (Radix UI is already covered by shadcn/ui)

### Badge format

```markdown
![Name](https://img.shields.io/badge/Display_Name-HEXCOLOR?style=flat-square&logo=LOGONAME&logoColor=white)
```

Use `logoColor=black` when the badge background is light (e.g. yellow/white).

---

## Prerequisites

- **GitHub CLI (`gh`)** must be installed and authenticated:
  ```
  gh auth login
  gh auth status   # should show your account
  ```
- `gh` must be on `PATH` (verify with `gh --version`)
- The token needs `repo` scope to access private repositories

---

## Available Skills

| Skill | Command | Description |
|---|---|---|
| update-stack | `/update-stack` | Audit all repos (public + private), find new tech, update README badges, commit |

---

## Commit Style

- Keep commit messages short and descriptive
- Use `[skip ci]` suffix only for snake-image auto-commits (already handled by the workflow)
- Tech stack updates do **not** need `[skip ci]`
