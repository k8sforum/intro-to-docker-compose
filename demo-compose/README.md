# Demo Compose Snippets

These files are presenter aids for the live build. Each stage folder matches the slide timeline and contains:

- `broken.yml`: copy this during the live demo.
- `fixed.yml`: presenter-only hints for the repair, kept out of the file you copy in front of the audience.

Suggested copy order:

1. `01-foundation/broken.yml`
2. `02-dependencies/broken.yml`
3. `03-database-flow/broken.yml`
4. `04-app-services/broken.yml`
5. `05-front-end/no-ports/broken.yml`
6. `05-front-end/wrong-port/broken.yml`

How to use them:

- `01` gives you the empty shell to start from.
- `02` introduces stateful dependencies and bind mounts.
- `03` introduces cleanup and migration jobs.
- `04` introduces the application services and image resolution.
- `05` introduces host access for the web service.
- `05` continues the front-end stage with port publishing behavior.

Use [`docker-compose.yml`](../docker-compose.yml) as the fixed reference state after each repair.
