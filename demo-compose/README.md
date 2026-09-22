# Demo Compose Snippets

These files are presenter aids for the live build. Each file is intentionally broken in a way that matches one slide topic, so you can copy it in live, show the symptom, then repair it in `docker-compose.yml`.

Suggested copy order:

1. `01-foundation-compose-shell.yml`
2. `02-dependencies-bad-relative-path.yml`
3. `03-database-flow-wrong-job-condition.yml`
4. `04-app-services-pull-access-denied.yml`
5. `05a-front-end-no-ports.yml`
6. `05b-front-end-wrong-port.yml`
7. `06-reliability-missing-migration-dependency.yml`

How to use them:

- `01` gives you the empty shell to start from.
- `02` introduces the dependency services and a broken PostgreSQL bind-mount path.
- `03` introduces the cleanup and migration jobs, but the migration job uses the wrong wait condition for a one-off job.
- `04` introduces the application services and a bad API image reference, so Compose pulls instead of building.
- `05` introduces the web service with no published host port.
- `05` continues the front-end stage with the wrong host port.
- `06` shows the API without the migration dependency, so startup order looks right but readiness is wrong.

Use [`docker-compose.yml`](../docker-compose.yml) as the fixed reference state after each repair.
