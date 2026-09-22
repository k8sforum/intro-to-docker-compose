# Demo Compose Snippets

These files are presenter aids for the live build. Each file is intentionally broken in a way that matches one slide topic, so you can copy it in live, show the symptom, then repair it in `docker-compose.yml`.

Suggested copy order:

1. `00-compose-shell.yml`
2. `01-dependencies-bad-relative-path.yml`
3. `02-database-flow-missing-health-wait.yml`
4. `03-app-services-pull-access-denied.yml`
5. `04-front-end-no-ports.yml`
6. `05-front-end-wrong-port.yml`
7. `06-reliability-missing-migration-dependency.yml`

How to use them:

- `00` gives you the empty shell to start from.
- `01` introduces the dependency services and a broken PostgreSQL bind-mount path.
- `02` introduces the cleanup and migration jobs, but the migration job uses the wrong wait condition for a one-off job.
- `03` introduces the application services and a bad API image reference, so Compose pulls instead of building.
- `04` introduces the web service with no published host port.
- `05` keeps the web service but maps the wrong host port.
- `06` shows the API without the migration dependency, so startup order looks right but readiness is wrong.

Use [`docker-compose.yml`](../docker-compose.yml) as the fixed reference state after each repair.
