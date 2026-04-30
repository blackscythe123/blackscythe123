# Skill: update-stack

Audit every GitHub repository (public **and** private) for the authenticated user, extract
the actual dependency files, identify technologies not yet listed in the README Tech Stack
section, and update the README with accurate `flat-square` shields.io badges.

---

## When to use

Run `/update-stack` whenever:
- A new project has been shipped and the tech stack should reflect it
- You suspect the README is missing a framework or tool
- Doing a periodic portfolio refresh (e.g. every few months)

---

## Prerequisites check

Before starting, verify `gh` is authenticated:

```bash
gh auth status
```

If not logged in, ask the user to run `gh auth login` and choose
**GitHub.com → HTTPS → Login with a web browser**.

---

## Step 1 — Fetch all repositories

Fetch all repos (public + private) with their primary language, languages breakdown, and topics:

```bash
gh repo list --limit 100 --json name,languages,description,repositoryTopics,isPrivate,primaryLanguage
```

Parse the JSON to build a list of repos with their language breakdown.

---

## Step 2 — Fetch dependency files per repo

For each repo, determine which dependency files to fetch based on detected languages.
Use the GitHub Contents API via `gh`:

```bash
gh api repos/OWNER/REPO/contents/PATH --jq '.content'
```

The response is base64-encoded. Decode it in PowerShell:

```powershell
$c = gh api repos/OWNER/REPO/contents/path/to/file --jq '.content' 2>&1
$clean = ($c -join "") -replace '\s',''
$bytes = [System.Convert]::FromBase64String($clean)
[System.Text.Encoding]::UTF8.GetString($bytes)
```

### Dependency file map by language

| Primary language | Files to check | Notes |
|---|---|---|
| TypeScript / JavaScript | `package.json`, subdirs like `frontend/package.json`, `app/package.json` | Check `dependencies` only, not `devDependencies` for framework detection |
| Python | `requirements.txt`, `pyproject.toml` | May be in `backend/` subfolder |
| Dart | `pubspec.yaml` | May be in `app/` or named subfolder |
| Java / Kotlin | `build.gradle`, `pom.xml` | |
| C / C++ | `CMakeLists.txt` | Usually just confirms presence |

If the file isn't at the root, first list the root contents:

```bash
gh api repos/OWNER/REPO/contents/ --jq '.[].name'
```

Then descend into the relevant subfolder.

---

## Step 3 — Read the current README

Read `README.md` and extract all badge names already present in the Tech Stack section.
Do not add a badge that already exists.

---

## Step 4 — Identify new technologies

Compare extracted dependencies against the current badge list. Apply the curation rules
from `CLAUDE.md` to decide what is worth adding.

**Include:**
- Frameworks used across multiple repos, or in any substantial project
- Libraries that are recognisable on a CV/portfolio
- Languages detected as primary in at least one real (non-academic) repo

**Skip:**
- Utility-only packages (Zod, Gunicorn, Autoprefixer, PostCSS, ESLint configs, etc.)
- Dev-only dependencies that aren't part of the visible stack
- Packages that are already covered by a higher-level abstraction already in the README
  (e.g. Radix UI is subsumed by shadcn/ui)

---

## Step 5 — Map new tech to sections

Place each new badge in the correct section (defined in `CLAUDE.md`):

| Section | Typical additions |
|---|---|
| Frontend | UI libs (Framer Motion, shadcn/ui), data-viz (Recharts), routing (React Router), state (TanStack Query) |
| Backend | Server frameworks (FastAPI), ORMs (SQLAlchemy), comms (Twilio) |
| Mobile | On-device ML (Google ML Kit), native SDKs |
| Database & Cloud | New DBs (MongoDB), deployment platforms (Railway) |
| AI / Data Science | ML frameworks (PyTorch), CV (OpenCV), AI APIs |
| Web3 / Blockchain | Smart contract + Ethereum client libs (wagmi, viem) |
| Tools & Workflow | Build tools (Vite), payment gateways (Razorpay, Stripe), protocols (WebRTC) |

**Creating new sections:** If a group of 3+ related technologies doesn't fit cleanly into
any existing section, create a new one. Examples: "Edge / Serverless", "DevOps & CI/CD",
"Game Dev", "Desktop". Insert it at a logical position in the README and add it to the
section list in `CLAUDE.md` so future runs stay consistent.

---

## Step 6 — Generate badges

Badge format:

```markdown
![Display Name](https://img.shields.io/badge/Display_Name-HEXCOLOR?style=flat-square&logo=LOGONAME&logoColor=white)
```

- Use `logoColor=black` for light-background badges (yellow, white, etc.)
- Use the official shields.io simple-icons slug for `logo=`
- Keep display names short and consistent with what's already in the README

Common badge reference:

```markdown
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![OpenCV](https://img.shields.io/badge/OpenCV-5C3EE8?style=flat-square&logo=opencv&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=flat-square&logo=shadcnui&logoColor=white)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=reactrouter&logoColor=white)
![ReactFlow](https://img.shields.io/badge/ReactFlow-FF0072?style=flat-square&logo=react&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=react&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![Twilio](https://img.shields.io/badge/Twilio-F22F46?style=flat-square&logo=twilio&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-0C2451?style=flat-square&logo=razorpay&logoColor=white)
![Railway](https://img.shields.io/badge/Railway-0B0D0E?style=flat-square&logo=railway&logoColor=white)
![Google ML Kit](https://img.shields.io/badge/ML_Kit-4285F4?style=flat-square&logo=google&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)
![HuggingFace](https://img.shields.io/badge/HuggingFace-FFD21E?style=flat-square&logo=huggingface&logoColor=black)
![Solidity](https://img.shields.io/badge/Solidity-363636?style=flat-square&logo=solidity&logoColor=white)
![wagmi](https://img.shields.io/badge/wagmi-1C1B1F?style=flat-square&logo=ethereum&logoColor=white)
![viem](https://img.shields.io/badge/viem-FFC517?style=flat-square&logo=ethereum&logoColor=black)
![WebRTC](https://img.shields.io/badge/WebRTC-333333?style=flat-square&logo=webrtc&logoColor=white)
```

---

## Step 7 — Update README.md

Edit only the `## 🛠️ Tech Stack` section. Do not touch the header, stats, or footer.
Insert new badges at the **end** of the relevant subsection line group.

---

## Step 8 — Commit

```bash
git add README.md
git commit -m "Update tech stack — <brief description of what was added>"
```

Then ask the user if they want to push (`git push origin main`).

---

## Notes

- If `gh api` returns a 404 for a dependency file, the file doesn't exist at that path —
  list the directory contents first and adjust the path.
- Private repos are included automatically as long as `gh auth status` shows `repo` scope.
- The `--limit 100` flag on `gh repo list` covers up to 100 repos; increase if needed.
- Run this skill every time a new project is shipped to keep the README accurate.
