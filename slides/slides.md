---
theme: default
title: "k8s Forum: Mission Composable"
favicon: /favicon.svg
css: unocss
layout: cover
class: slide-navy
---

<div class="eyebrow">Internal training · 20 August 2026</div>

# Kubernetes Forum

<div class="subtitle">Mission:Composable</div>

<div class="absolute bottom-8 left-8 text-sm" style="color:var(--text-light-muted)">
Presented by Liam Carver, Tshepo Ntlhokoa &amp; Vincent Chegwidden
</div>

<div class="absolute bottom-8 right-8 text-sm" style="color:var(--text-light-muted)">
entelect.co.za
</div>

---
layout: default
---

<div class="content-frame agenda-slide">
  <div class="eyebrow">Agenda</div>
  <h1>What we'll cover today</h1>

  <div class="agenda-grid">
    <div class="agenda-item"><span class="agenda-number">01</span><span>Why Compose?</span></div>
    <div class="agenda-item"><span class="agenda-number">02</span><span>Core Concepts</span></div>
    <div class="agenda-item"><span class="agenda-number">03</span><span>Data &amp; Storage</span></div>
    <div class="agenda-item"><span class="agenda-number">04</span><span>Dependency Flow</span></div>
    <div class="agenda-item"><span class="agenda-number">05</span><span>Images &amp; Registries</span></div>
    <div class="agenda-item"><span class="agenda-number">06</span><span>Networking</span></div>
    <div class="agenda-item"><span class="agenda-number">07</span><span>Reliability &amp; Quality</span></div>
  </div>
</div>

---
layout: default
---

<div class="content-frame roadmap-slide">
  <div class="eyebrow">Live build roadmap</div>
  <h1>We will assemble the file in six stages</h1>

  <div class="roadmap-timeline">
    <div class="timeline-step is-active">
      <div class="timeline-marker">01</div>
      <div class="timeline-copy">
        <h3>Foundation</h3>
      </div>
    </div>
    <div class="timeline-step">
      <div class="timeline-marker">02</div>
      <div class="timeline-copy">
        <h3>Dependencies</h3>
      </div>
    </div>
    <div class="timeline-step">
      <div class="timeline-marker">03</div>
      <div class="timeline-copy">
        <h3>Database Flow</h3>
      </div>
    </div>
    <div class="timeline-step">
      <div class="timeline-marker">04</div>
      <div class="timeline-copy">
        <h3>App Services</h3>
      </div>
    </div>
    <div class="timeline-step">
      <div class="timeline-marker">05</div>
      <div class="timeline-copy">
        <h3>Front End</h3>
      </div>
    </div>
  </div>

  <p class="roadmap-note">Every topic feeds the next live build step. Each layer exposes a different kind of Compose problem.</p>
</div>

---
layout: default
class: slide-navy
---

<div class="section-divider">
  <div class="section-number">01</div>
  <h1>Why Compose?</h1>
  <div class="subtitle">One application, many cooperating containers</div>
</div>

---
layout: default
---

<div class="eyebrow">Why Compose</div>
<div class="stage-label">Live build context · before stage 01</div>

# The problem: one container was never the plan

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <ul class="text-lg leading-relaxed">
    <li>A modern application needs an API, database, message broker, storage, and web UI.</li>
    <li>Repeated <code>docker run</code> commands hide configuration in terminal history.</li>
    <li>Starting services in the right order becomes a manual ritual.</li>
  </ul>
  <div class="card-navy">
    <h3>Compose</h3>
    <p>Describe the stack in one versioned file, then create it consistently with one command.</p>
  </div>
</div>

---
layout: default
class: slide-navy
---

<div class="section-divider">
  <div class="section-number">02</div>
  <h1>Core Concepts</h1>
  <div class="subtitle">Start with the shell, then add structure one block at a time</div>
</div>

---
layout: default
---

<div class="eyebrow">Core Concepts</div>
<div class="stage-label">Live build stage 01 · foundation</div>

# A Compose file starts as structure, not magic

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="card">
    <h3>Services</h3>
    <p>Each application or dependency gets a named service block with image, ports, environment, and dependencies.</p>
  </div>
  <div class="card-navy">
    <h3>Shared infrastructure</h3>
    <p>Compose creates one project network and lets services share named volumes and lifecycle commands.</p>
  </div>
</div>

<p class="mt-6 text-lg">The file becomes useful before it becomes complete. We start with the shell, then layer in meaning.</p>

---
layout: default
class: slide-lime
---

<div class="content-frame">
  <div class="eyebrow">Live checkpoint</div>
  <div class="stage-label">Live build timeline</div>
  <div class="checkpoint-timeline">
    <div class="checkpoint-step is-active"><span>01</span><strong>Foundation</strong></div>
    <div class="checkpoint-step"><span>02</span><strong>Dependencies</strong></div>
    <div class="checkpoint-step"><span>03</span><strong>Database Flow</strong></div>
    <div class="checkpoint-step"><span>04</span><strong>App Services</strong></div>
    <div class="checkpoint-step"><span>05</span><strong>Front End</strong></div>
  </div>
  <p class="checkpoint-note">A Compose project needs a clear top-level shape before the service details arrive.</p>

  <h1>Create the compose shell</h1>

  <div class="code-panel mt-6">
    <div>services:</div>
    <div>volumes:</div>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Core Concepts</div>
<div class="stage-label">Live build stages 01-05 · use the same command loop throughout</div>

# Compose CLI essentials

<table class="ref-table mt-8">
  <thead>
    <tr><th>Command</th><th>Use it to</th></tr>
  </thead>
  <tbody>
    <tr><td>docker compose up</td><td>Create and start the services declared in the file</td></tr>
    <tr><td>docker compose ps</td><td>Check service state and published ports</td></tr>
    <tr><td>docker compose logs -f api</td><td>Follow one service while diagnosing it</td></tr>
    <tr><td>docker compose exec api sh</td><td>Run a command inside a running service</td></tr>
    <tr><td>docker compose down</td><td>Stop and remove the environment; named volumes remain</td></tr>
  </tbody>
</table>

---
layout: default
class: slide-navy
---

<div class="section-divider">
  <div class="section-number">03</div>
  <h1>Data &amp; Storage</h1>
  <div class="subtitle">Add stateful dependencies and keep their data outside containers</div>
</div>

---
layout: default
---

<div class="eyebrow">Data &amp; Storage</div>
<div class="stage-label">Live build stage 02 · dependencies</div>

# Named volumes keep MyTravels data

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="card">
    <h3>Named volume</h3>
    <p>Docker-managed storage that persists across <code>docker compose down</code> and the next <code>up</code>.</p>
    <p>Examples: <code>pgdata</code>, <code>mqdata</code>, <code>minio-data</code>.</p>
  </div>
  <div class="card-navy">
    <h3>Bind mount</h3>
    <p>Maps a host file or directory into a container.</p>
    <p>Use it for local configuration or development files, not portable application state.</p>
  </div>
</div>

---
layout: default
class: slide-lime
---

<div class="content-frame">
  <div class="eyebrow">Live checkpoint</div>
  <div class="stage-label">Live build timeline</div>
  <div class="checkpoint-timeline">
    <div class="checkpoint-step is-done"><span>01</span><strong>Foundation</strong></div>
    <div class="checkpoint-step is-active"><span>02</span><strong>Dependencies</strong></div>
    <div class="checkpoint-step"><span>03</span><strong>Database Flow</strong></div>
    <div class="checkpoint-step"><span>04</span><strong>App Services</strong></div>
    <div class="checkpoint-step"><span>05</span><strong>Front End</strong></div>
  </div>
  <p class="checkpoint-note">Stateful dependencies introduce ports, persistent volumes, and host-file bind mounts.</p>

  <h1>Add the stateful dependencies</h1>

  <div class="code-panel mt-6">
    <div>docker compose up</div>
    <div>docker compose ps</div>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Live Diagnosis</div>
<div class="stage-label">Live build timeline</div>
<div class="checkpoint-timeline">
  <div class="checkpoint-step is-done"><span>01</span><strong>Foundation</strong></div>
  <div class="checkpoint-step is-active"><span>02</span><strong>Dependencies</strong></div>
  <div class="checkpoint-step"><span>03</span><strong>Database Flow</strong></div>
  <div class="checkpoint-step"><span>04</span><strong>App Services</strong></div>
  <div class="checkpoint-step"><span>05</span><strong>Front End</strong></div>
</div>
<p class="checkpoint-note">Bind mounts fail when the host path, container path, or file-vs-directory shape does not match.</p>

# Relative paths start at this compose file

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <div class="code-panel">
    <div><span class="tok-cmd">volumes</span>:</div>
    <div>&nbsp;&nbsp;- ./intro-to-k8s/scripts/</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;init-dbs.sql:/docker-entrypoint-</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;initdb.d/init-dbs.sql</div>
  </div>
  <ul class="text-lg leading-relaxed">
    <li>Host paths are resolved relative to <code>docker-compose.yml</code>.</li>
    <li>The container path must be absolute.</li>
    <li>Docker distinguishes file mounts from directory mounts.</li>
  </ul>
</div>

---
layout: default
class: slide-navy
---

<div class="section-divider">
  <div class="section-number">04</div>
  <h1>Dependency Flow</h1>
  <div class="subtitle">Database jobs must wait for the right readiness signal</div>
</div>

---
layout: default
---

<div class="eyebrow">Dependency Flow</div>
<div class="stage-label">Live build stage 03 · database flow</div>

# Start order is not application readiness

<div class="grid grid-cols-3 gap-5 mt-8 items-center text-center">
  <div class="card"><strong>postgres</strong><br><span style="color:var(--grey-secondary)">healthy</span></div>
  <div class="card-navy"><strong>cleanup-migrations</strong><br><span style="color:var(--text-light-muted)">runs once</span></div>
  <div class="card"><strong>migrate-core-db</strong><br><span style="color:var(--grey-secondary)">completes successfully</span></div>
</div>

<ul class="text-lg leading-relaxed mt-8">
  <li><code>depends_on</code> must describe the real order between jobs and services.</li>
  <li><code>service_healthy</code> only works for services with health checks.</li>
  <li><code>service_completed_successfully</code> waits for a one-off job to finish cleanly.</li>
  <li>The database flow should finish before the application services arrive.</li>
</ul>

---
layout: default
class: slide-lime
---

<div class="content-frame">
  <div class="eyebrow">Live checkpoint</div>
  <div class="stage-label">Live build timeline</div>
  <div class="checkpoint-timeline">
    <div class="checkpoint-step is-done"><span>01</span><strong>Foundation</strong></div>
    <div class="checkpoint-step is-done"><span>02</span><strong>Dependencies</strong></div>
    <div class="checkpoint-step is-active"><span>03</span><strong>Database Flow</strong></div>
    <div class="checkpoint-step"><span>04</span><strong>App Services</strong></div>
    <div class="checkpoint-step"><span>05</span><strong>Front End</strong></div>
  </div>
  <p class="checkpoint-note">Database jobs expose the difference between service health and one-off job completion.</p>

  <h1>Coordinate cleanup and migration jobs</h1>

  <div class="code-panel mt-6">
    <div>postgres: health check</div>
    <div>cleanup-migrations: one-off job</div>
    <div>migrate-core-db: one-off job</div>
  </div>
</div>

---
layout: default
class: slide-navy
---

<div class="section-divider">
  <div class="section-number">05</div>
  <h1>Images &amp; Registries</h1>
  <div class="subtitle">Know when Compose builds and when it pulls</div>
</div>

---
layout: default
---

<div class="eyebrow">Images &amp; Registries</div>
<div class="stage-label">Live build stage 04 · app services</div>

# Build locally or pull from a registry

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="card">
    <h3><code>build:</code></h3>
    <p>Build an image from a local Dockerfile and build context.</p>
    <p>Used by the MyTravels API, messaging service, MCP server, and web UI.</p>
  </div>
  <div class="card-navy">
    <h3><code>image:</code></h3>
    <p>Use an image already available locally or pull it from a registry.</p>
    <p>Used by PostgreSQL, RabbitMQ, and MinIO.</p>
  </div>
</div>

---
layout: default
class: slide-lime
---

<div class="content-frame">
  <div class="eyebrow">Live checkpoint</div>
  <div class="stage-label">Live build timeline</div>
  <div class="checkpoint-timeline">
    <div class="checkpoint-step is-done"><span>01</span><strong>Foundation</strong></div>
    <div class="checkpoint-step is-done"><span>02</span><strong>Dependencies</strong></div>
    <div class="checkpoint-step is-done"><span>03</span><strong>Database Flow</strong></div>
    <div class="checkpoint-step is-active"><span>04</span><strong>App Services</strong></div>
    <div class="checkpoint-step"><span>05</span><strong>Front End</strong></div>
  </div>
  <p class="checkpoint-note">Application services expose the boundary between local builds and registry pulls.</p>

  <h1>Bring in the application services</h1>

  <div class="code-panel mt-6">
    <div>docker compose up --build</div>
    <div>docker compose ps</div>
    <div>docker compose logs -f api</div>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Live Diagnosis</div>
<div class="stage-label">Live build timeline</div>
<div class="checkpoint-timeline">
  <div class="checkpoint-step is-done"><span>01</span><strong>Foundation</strong></div>
  <div class="checkpoint-step is-done"><span>02</span><strong>Dependencies</strong></div>
  <div class="checkpoint-step is-done"><span>03</span><strong>Database Flow</strong></div>
  <div class="checkpoint-step is-active"><span>04</span><strong>App Services</strong></div>
  <div class="checkpoint-step"><span>05</span><strong>Front End</strong></div>
</div>
<p class="checkpoint-note">If Compose reaches for a registry instead of building locally, the image reference is telling you something important.</p>

# Pull access denied is a useful clue

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <div class="code-panel">
    <div>pull access denied for</div>
    <div>mytravels-private/api,</div>
    <div>repository does not exist or</div>
    <div>may require 'docker login'</div>
  </div>
  <ul class="text-lg leading-relaxed">
    <li><code>image:</code> names what Compose should run.</li>
    <li><code>build:</code> tells Compose how to create it locally.</li>
    <li>A registry error often means Compose was never told to build.</li>
  </ul>
</div>

---
layout: default
class: slide-navy
---

<div class="section-divider">
  <div class="section-number">06</div>
  <h1>Networking</h1>
  <div class="subtitle">Service-name DNS inside; published ports outside</div>
</div>

---
layout: default
---

<div class="eyebrow">Networking</div>
<div class="stage-label">Live build stage 05 · front end</div>

# One project network is created for the stack

<div class="grid grid-cols-3 gap-5 mt-10 items-center text-center">
  <div class="card"><strong>web</strong><br><span style="color:var(--grey-secondary)">host:5100</span></div>
  <div class="card-navy"><strong>api</strong><br><span style="color:var(--text-light-muted)">api:5101</span></div>
  <div class="card"><strong>postgres</strong><br><span style="color:var(--grey-secondary)">postgres:5432</span></div>
</div>

<ul class="text-lg leading-relaxed mt-8">
  <li>Services resolve each other by service name on the Compose network.</li>
  <li><code>localhost</code> means the current container, not the host or another service.</li>
  <li><code>ports: host:container</code> publishes a service to the host.</li>
</ul>

---
layout: default
class: slide-lime
---

<div class="content-frame">
  <div class="eyebrow">Live checkpoint</div>
  <div class="stage-label">Live build timeline</div>
  <div class="checkpoint-timeline">
    <div class="checkpoint-step is-done"><span>01</span><strong>Foundation</strong></div>
    <div class="checkpoint-step is-done"><span>02</span><strong>Dependencies</strong></div>
    <div class="checkpoint-step is-done"><span>03</span><strong>Database Flow</strong></div>
    <div class="checkpoint-step is-done"><span>04</span><strong>App Services</strong></div>
    <div class="checkpoint-step is-active"><span>05</span><strong>Front End</strong></div>
  </div>
  <p class="checkpoint-note">The web service separates in-network access from host-browser access.</p>

  <h1>Expose the web UI to the host</h1>

  <div class="code-panel mt-6">
    <div>docker compose exec api sh</div>
    <div>curl http://api:5101</div>
    <div>curl http://localhost:5100</div>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Networking</div>
<div class="stage-label">Live build stage 05 · front end</div>

# DNS does not publish a service to your laptop

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="card">
    <h3>Inside the Compose network</h3>
    <p><code>http://api:5101</code> reaches the API using its service name and container port.</p>
  </div>
  <div class="card-navy">
    <h3>From the host browser</h3>
    <p><code>http://localhost:5100</code> only works when the correct host port is mapped to the web container port.</p>
  </div>
</div>

---
layout: default
class: slide-navy
---

<div class="section-divider">
  <div class="section-number">07</div>
  <h1>Reliability &amp; Quality</h1>
  <div class="subtitle">Finish by keeping image behaviour and environment wiring separate</div>
</div>

---
layout: default
---

<div class="eyebrow">Quality Iteration</div>
<div class="stage-label">Reliability &amp; Quality</div>

# Put each concern in the right place

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="card">
    <h3>Dockerfile</h3>
    <p>How an application image is built and starts everywhere: runtime, dependencies, compiled app, default command.</p>
  </div>
  <div class="card-navy">
    <h3>Compose file</h3>
    <p>How that image participates in this environment: ports, volumes, service dependencies, and environment-specific configuration.</p>
  </div>
</div>

<p class="mt-6 text-lg">Rule of thumb: if changing it should not require rebuilding the image, do not bake it into the Dockerfile.</p>

---
layout: default
---

<div class="eyebrow">Quality Iteration</div>
<div class="stage-label">Reliability &amp; Quality</div>

# Keep environment configuration outside the image

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="code-panel">
    <div><span class="tok-cmd">ENV</span> ASPNETCORE_ENVIRONMENT=</div>
    <div>&nbsp;&nbsp;Development</div>
    <br>
    <div style="color:var(--text-light-muted)">Bakes one environment into every image.</div>
  </div>
  <div class="code-panel">
    <div><span class="tok-cmd">environment</span>:</div>
    <div>&nbsp;&nbsp;ASPNETCORE_ENVIRONMENT:</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;${ASPNETCORE_ENVIRONMENT}</div>
    <br>
    <div style="color:var(--text-light-muted)">Compose supplies the environment at runtime.</div>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Advanced Preview</div>

# Compose is local orchestration, not the whole production story

<ul class="checklist text-lg mt-8">
  <li>Optional observability can still be layered in afterward without changing the whole teaching flow.</li>
  <li>Multiple Compose files can layer environment-specific overrides.</li>
  <li>Kubernetes adds scheduling, scaling, and self-healing for larger deployments.</li>
</ul>

---
layout: default
---

<div class="eyebrow">Wrap-up</div>

# Common pitfalls, recap

<ul class="checklist text-lg mt-8">
  <li>Compose files are easier to teach when you build them in small, runnable layers.</li>
  <li>Resolve bind mounts and build contexts relative to the Compose file.</li>
  <li>Check whether Compose should build an image locally or pull it from a registry.</li>
  <li>Use service DNS only inside the Compose network; publish the right host port for local access.</li>
  <li>Declare every real dependency and wait for the correct readiness condition.</li>
  <li>Keep reusable image behaviour in Dockerfiles and environment-specific wiring in Compose.</li>
</ul>

---
layout: cover
class: slide-navy
---

<div class="eyebrow">Wrap-up</div>

# Questions &amp; next steps

<div class="subtitle">Try the MyTravels stack, then explore the observability add-on and Kubernetes.</div>

<div class="absolute bottom-8 left-8 text-sm" style="color:var(--text-light-muted)">
Docker Compose Forum
</div>
