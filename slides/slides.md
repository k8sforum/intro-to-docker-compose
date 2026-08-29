---
theme: default
title: Kubernetes Forum
css: unocss
layout: cover
class: slide-navy
---

<div class="eyebrow">Internal training · 20 August 2026</div>

# Kubernetes Forum

<div class="subtitle">Docker Compose</div>

<div class="absolute bottom-8 left-8 text-sm" style="color:var(--text-light-muted)">
Presented by Liam Carver, Tshepo Ntlhokoa &amp; Vincent Chegwidden
</div>

<div class="absolute bottom-8 right-8 text-sm" style="color:var(--text-light-muted)">
entelect.co.za
</div>

---
layout: default
---

<div class="eyebrow">Agenda</div>

# What we'll cover today

<div class="grid grid-cols-2 gap-x-12 gap-y-6 mt-8">
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">01</span>&nbsp;&nbsp;Why Compose?</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">02</span>&nbsp;&nbsp;Core Concepts</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">03</span>&nbsp;&nbsp;Images &amp; Registries</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">04</span>&nbsp;&nbsp;Networking</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">05</span>&nbsp;&nbsp;Data &amp; Storage</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">06</span>&nbsp;&nbsp;Dependencies &amp; Quality</div>
</div>

---
layout: default
class: slide-navy
---

<div class="eyebrow">01</div>
<div class="section-number">01</div>

# Why Compose?

<div class="subtitle">One application, many cooperating containers</div>

---
layout: default
---

<div class="eyebrow">Why Compose</div>

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

<div class="eyebrow">02</div>
<div class="section-number">02</div>

# Core Concepts

<div class="subtitle">Services, networks, volumes, and everyday commands</div>

---
layout: default
---

<div class="eyebrow">Core Concepts</div>

# A Compose file describes a running environment

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="card">
    <h3>Services</h3>
    <p>Named container definitions such as <code>api</code>, <code>postgres</code>, and <code>rabbitmq</code>.</p>
  </div>
  <div class="card-navy">
    <h3>Shared infrastructure</h3>
    <p>Compose creates a project network and manages named volumes for the stack.</p>
  </div>
</div>

<p class="mt-6 text-lg">The MyTravels file defines the full application stack, excluding observability for this session.</p>

---
layout: default
---

<div class="eyebrow">Core Concepts</div>

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
class: slide-lime
---

<div class="eyebrow">Live checkpoint</div>

# Start the MyTravels stack

<div class="code-panel mt-6">
  <div>docker compose up --build</div>
  <div>docker compose ps</div>
  <div>docker compose logs -f api</div>
</div>

---
layout: default
class: slide-navy
---

<div class="eyebrow">03</div>
<div class="section-number">03</div>

# Images &amp; Registries

<div class="subtitle">Know when Compose builds and when it pulls</div>

---
layout: default
---

<div class="eyebrow">Images &amp; Registries</div>

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
---

<div class="eyebrow">Live Diagnosis</div>

# Pull access denied is a useful clue

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <div class="code-panel">
    <div>pull access denied for</div>
    <div>mytravels-private/api,</div>
    <div>repository does not exist or</div>
    <div>may require 'docker login'</div>
  </div>
  <ul class="text-lg leading-relaxed">
    <li>Seed a service with an inaccessible image repository.</li>
    <li>Read the image name Compose attempted to pull.</li>
    <li>Fix the image reference, or add the intended local <code>build:</code> definition.</li>
  </ul>
</div>

---
layout: default
class: slide-navy
---

<div class="eyebrow">04</div>
<div class="section-number">04</div>

# Networking

<div class="subtitle">Service-name DNS inside; published ports outside</div>

---
layout: default
---

<div class="eyebrow">Networking</div>

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

<div class="eyebrow">Live checkpoint</div>

# Diagnose network access in three steps

<div class="code-panel mt-6">
  <div>docker compose exec api sh</div>
  <div>curl http://api:5101</div>
  <div>curl http://localhost:5100</div>
</div>

<p class="mt-6 text-lg">First use service DNS inside the network. Then remove <code>web</code>'s port mapping, restore it with the wrong host port, and finally correct it.</p>

---
layout: default
---

<div class="eyebrow">Networking</div>

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

<div class="eyebrow">05</div>
<div class="section-number">05</div>

# Data &amp; Storage

<div class="subtitle">Keep state outside the container filesystem</div>

---
layout: default
---

<div class="eyebrow">Data &amp; Storage</div>

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
---

<div class="eyebrow">Live Diagnosis</div>

# Relative paths start at this compose file

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <div class="code-panel">
    <div><span class="tok-cmd">volumes</span>:</div>
    <div>&nbsp;&nbsp;- ../intro-to-k8s/scripts/</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;init-dbs.sql:/docker-entrypoint-</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;initdb.d/init-dbs.sql</div>
  </div>
  <ul class="text-lg leading-relaxed">
    <li>Break a bind-mount or build-context path.</li>
    <li>Read the missing path reported by Compose.</li>
    <li>Fix it relative to <code>docker-compose.yml</code>, not the folder the file was copied from.</li>
  </ul>
</div>

---
layout: default
class: slide-navy
---

<div class="eyebrow">06</div>
<div class="section-number">06</div>

# Dependencies &amp; Quality

<div class="subtitle">Make the stack reliable and keep responsibilities clear</div>

---
layout: default
---

<div class="eyebrow">Dependencies</div>

# Start order is not application readiness

<div class="grid grid-cols-3 gap-5 mt-8 items-center text-center">
  <div class="card"><strong>postgres</strong><br><span style="color:var(--grey-secondary)">healthy</span></div>
  <div class="card-navy"><strong>migrate-core-db</strong><br><span style="color:var(--text-light-muted)">completed successfully</span></div>
  <div class="card"><strong>api</strong><br><span style="color:var(--grey-secondary)">starts</span></div>
</div>

<ul class="text-lg leading-relaxed mt-8">
  <li><code>depends_on</code> expresses the real order between services.</li>
  <li><code>service_healthy</code> waits for a health check; <code>service_completed_successfully</code> waits for a one-off job.</li>
  <li>Use the condition that matches the dependency's lifecycle.</li>
</ul>

---
layout: default
class: slide-lime
---

<div class="eyebrow">Live checkpoint</div>

# Fix an incomplete dependency chain

<div class="code-panel mt-6">
  <div>api:</div>
  <div>&nbsp;&nbsp;depends_on:</div>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;migrate-core-db:</div>
  <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;condition: service_completed_successfully</div>
</div>

<p class="mt-6 text-lg">Remove this dependency, observe the API fail before its schema exists, then restore it and verify with <code>docker compose logs -f api</code>.</p>

---
layout: default
---

<div class="eyebrow">Quality Iteration</div>

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
  <li>Profiles let one file support optional services, such as observability.</li>
  <li>Multiple Compose files can layer environment-specific overrides.</li>
  <li>Kubernetes adds scheduling, scaling, and self-healing for larger deployments.</li>
</ul>

---
layout: default
---

<div class="eyebrow">Wrap-up</div>

# Common pitfalls, recap

<ul class="checklist text-lg mt-8">
  <li>Check whether Compose should build an image locally or pull it from a registry.</li>
  <li>Use service DNS only inside the Compose network; publish the right host port for local access.</li>
  <li>Resolve bind mounts and build contexts relative to the Compose file.</li>
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
