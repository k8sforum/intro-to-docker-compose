# Docker Compose Forum — Proposed Structure (Draft)

Follows the depth and slide budget in [../presentation-content-depth-guide.md](../presentation-content-depth-guide.md). Topic breadth is mapped directly from the intro-to-Docker session's six topic areas (Why Docker, Core Concepts, Working with Images, Networking, Data & Storage, Advanced Topics), so this session covers the equivalent ground for Compose rather than a narrower set of isolated failure symptoms.

## Format

- **Hard cap: 45 minutes total.**
- Each topic is a short **theory → demo** pair: state the concept, then demonstrate it live. No separate "mistakes" block — one seeded mistake is built into the demo for each topic where it fits naturally.
- No separate window for the audience to run commands themselves — all hands-on happens as the presenter drives the terminal live. Participants follow along by watching, not by executing.
- The live demo file is the actual `mytravels` compose file, **minus observability**. In scope: `minio`, `rabbitmq`, `postgres`, `cleanup-migrations`, `migrate-core-db`, `api`, `messaging`, `mcp`, `web`. Out of scope: `otel-collector`, `prometheus`, `tempo`, `postgres-exporter`, `cadvisor`, `grafana` — mentioned only as a "next steps" teaser.

## Timing Budget (45 min)

| Segment | Topic (mapped from intro session) | Time |
| --- | --- | --- |
| 1 | Why Compose | 3 min |
| 2 | Core Concepts + first use (working stack, everyday ops) | 6 min |
| 3 | Working with images/registries — mistake: pull access denied | 6 min |
| 4 | Networking — layered mistake: DNS vs host access vs wrong port | 8 min |
| 5 | Data & Storage — mistake: wrong relative path | 5 min |
| 6 | Everyday dependencies — mistake: wrong dependency order | 6 min |
| 7 | Quality iteration: Dockerfile vs Compose encapsulation | 5 min |
| 8 | Advanced preview | 2 min |
| 9 | Wrap-up (pitfalls recap, next steps) | 3 min |
| Buffer | | 1 min |

## Structure

### 1. Why Compose (3 min, 1–2 slides)
- The problem: multiple `docker run` commands, manual networking, manual ordering — doesn't scale past 2 containers.
- Where Compose fits: one file declares services, networks, volumes, config; `docker compose up` reconciles it. Same "one file, one command" idea as a Dockerfile, one layer up.

### 2. Core Concepts + First Use (6 min, terminal)
- Vocabulary: services, the implicit project network, named volumes — shown directly in the `mytravels` file, not in the abstract.
- Bring the stack up with `docker compose up --build`, confirm it works.
- Everyday operations loop, same shape as the Docker essential-commands table from the intro session: `docker compose ps`, `docker compose logs -f api`, `docker compose exec api sh`, `docker compose down`.

### 3. Working with Images & Registries (6 min: 1 min theory, 4 min demo, 1 min recap)
- Theory: a service can declare both `image:` and `build:`; when an image isn't buildable locally, Compose pulls it, same as `docker pull`.
- Seeded mistake: one service's `image:` points at a repository the presenter doesn't have access to (a typo'd org name or a private registry image).
  - Symptom: `pull access denied ... repository does not exist or may require 'docker login'`.
  - Habit: check whether an image is meant to be built (`build:` present) or pulled (real registry access required) — the error tells you which path Compose tried.

### 4. Networking (8 min: 1 min theory, 6 min layered demo, 1 min recap)
- Theory: Compose creates one project network by default; services reach each other by service name inside that network; `ports:` is a separate concern — it's what makes a service reachable from the host at all.
- Seeded mistake, built up in three steps:
  1. Show `api` reaching `postgres`/`rabbitmq` by service name from inside the network — DNS already works, no setup needed.
  2. Try to reach `web` from the host browser/`curl` with its `ports:` entry removed — connection refused. DNS resolves inside the network, but the host isn't part of it.
  3. Add `ports:` back but with the wrong host-side port mapped — still connection refused from the host, even though the container is healthy and DNS works fine internally.
  - Habit: DNS (service name) only solves container-to-container access; host access always needs a correct `ports:` entry, and the *host* side of `host:container` is the one that must match what you're calling.

### 5. Data & Storage (5 min: 1 min theory, 3 min demo, 1 min recap)
- Theory: named volumes (`pgdata`, `mqdata`, `minio-data`) persist across `down`/`up`; bind mounts map a host path in directly; both bind-mount and build-context paths are relative to the compose file's own location.
- Seeded mistake: wrong relative path in a bind mount or build context.
  - Symptom: `no such file or directory` / build context not found.
  - Habit: paths are relative to the compose file's own location, not the original project.

### 6. Everyday Dependencies (6 min: 1 min theory, 4 min demo, 1 min recap)
- Theory: `depends_on` controls start order and, with a condition, readiness — but only for the dependencies you actually declare.
- Seeded mistake: `api`'s `depends_on` lists `rabbitmq` but omits `migrate-core-db`, so `api` starts before migrations have run.
  - Symptom: `api` starts, but fails against the database (missing table/connection errors) because migrations hadn't completed yet.
  - Habit: declare every real dependency with the right condition (`service_healthy` / `service_completed_successfully`) — don't rely on one dependency happening to finish before another.

### 7. Quality Iteration: Dockerfile vs Compose Encapsulation (5 min: 1 min theory, 3 min demo, 1 min recap)
- Theory: a Dockerfile answers "how do I build and run this app anywhere" (runtime, dependencies, app code, sensible default `CMD`); Compose answers "how does this app relate to *this* environment and its neighbours" (ports, volumes, env values, service dependencies).
- Demo: show a deliberate smell — an environment-specific value (e.g. `ASPNETCORE_ENVIRONMENT`) hardcoded with `ENV` inside a Dockerfile — versus the actual `mytravels` pattern, where the Dockerfile leaves it unset and Compose supplies it per-environment via `environment:`.
  - Habit: if a value should change without rebuilding the image, it belongs in Compose, not baked into the Dockerfile.

### 8. Advanced Preview (2 min, 1 slide)
- One line each on next-level concepts not covered today: profiles, environment overrides per environment (multiple compose files), and production orchestration.

### 9. Wrap-Up (3 min, 1–2 slides)
- Recap the seeded mistakes as a short pitfalls list, in the same style as the intro session's "Common pitfalls, recap" slide.
- One-line teaser only for what's deliberately out of scope today: the observability stack, and Kubernetes as the next layer once a team outgrows a single Compose file.
- Point to the observability add-on and runbook for anyone who wants to see that layer afterward.
