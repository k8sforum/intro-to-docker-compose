---
theme: default
title: Docker Compose Forum
css: unocss
layout: cover
class: slide-navy
---

<div class="eyebrow">Internal training &middot; dummy content</div>

# Docker Compose Forum

<div class="subtitle">Build it, break it, fix it</div>

<div class="absolute bottom-8 left-8 text-sm" style="color:var(--text-light-muted)">
Presented by Liam Carver &middot; entelect.co.za
</div>

---
layout: default
---

<div class="eyebrow">Agenda</div>

# What we'll cover today

<div class="grid grid-cols-2 gap-x-12 gap-y-6 mt-8">
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">01</span>&nbsp;&nbsp;Why Compose</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">02</span>&nbsp;&nbsp;Core Concepts</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">03</span>&nbsp;&nbsp;Working with Images</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">04</span>&nbsp;&nbsp;Networking</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">05</span>&nbsp;&nbsp;Data &amp; Storage</div>
  <div class="border-b pb-2" style="border-color:var(--grey-divider)"><span style="color:var(--lime)">06</span>&nbsp;&nbsp;Wrap-up</div>
</div>

---
layout: default
class: slide-navy
---

<div class="eyebrow">01</div>

<div class="section-number">01</div>

# Why Compose?

<div class="subtitle">Dummy section divider — motivation &amp; context</div>

---
layout: default
---

<div class="eyebrow">Why Compose</div>

# The problem: "one container was never the plan"

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <ul class="text-lg leading-relaxed">
    <li>Placeholder bullet one about manual <code>docker run</code> pain</li>
    <li>Placeholder bullet two about coordinating dependent services</li>
    <li>Placeholder bullet three about repeatability across machines</li>
  </ul>
  <div class="card-navy">
    <p style="color:var(--text-light-muted)">Dummy illustration placeholder — replace with a simple diagram or icon.</p>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Core Concepts</div>

# Bind mounts vs. named volumes

<div class="grid grid-cols-2 gap-8 mt-8">
  <div class="card">
    <h3>Bind mount</h3>
    <p>Placeholder description of mapping a host path directly in.</p>
    <p>Placeholder: great for local dev.</p>
  </div>
  <div class="card-navy">
    <h3>Named volume</h3>
    <p>Placeholder description of Docker-managed persistent storage.</p>
    <p>Placeholder: preferred for app data.</p>
  </div>
</div>

---
layout: default
---

<div class="eyebrow">Core Concepts</div>

# Compose CLI essentials

<table class="ref-table mt-8">
  <thead>
    <tr><th>Command</th><th>What it does</th></tr>
  </thead>
  <tbody>
    <tr><td>docker compose up</td><td>Placeholder — start the stack</td></tr>
    <tr><td>docker compose ps</td><td>Placeholder — list running services</td></tr>
    <tr><td>docker compose logs</td><td>Placeholder — view service output</td></tr>
    <tr><td>docker compose down</td><td>Placeholder — stop and remove</td></tr>
  </tbody>
</table>

---
layout: default
---

<div class="eyebrow">Working with Images</div>

# Compose file anatomy

<div class="grid grid-cols-2 gap-8 mt-8 items-center">
  <ul class="text-lg leading-relaxed">
    <li>Placeholder: <code>services</code> block</li>
    <li>Placeholder: <code>build</code> vs <code>image</code></li>
    <li>Placeholder: <code>environment</code> and <code>.env</code></li>
  </ul>
  <div class="code-panel">
    <div><span class="tok-cmd">services</span>:</div>
    <div>&nbsp;&nbsp;api:</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-cmd">build</span>: ./api</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="tok-secondary">environment</span>:</div>
    <div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;DB_HOST: postgres</div>
  </div>
</div>

---
layout: default
class: slide-lime
---

<div class="eyebrow">Hands-on</div>

# Bring the stack up

<div class="code-panel mt-6">
  <div>docker compose up --build</div>
  <div>docker compose ps</div>
</div>

---
layout: default
---

<div class="eyebrow">Wrap-up</div>

# Common pitfalls, recap (dummy)

<ul class="checklist text-lg mt-8">
  <li>Placeholder pitfall one</li>
  <li>Placeholder pitfall two</li>
  <li>Placeholder pitfall three</li>
  <li>Placeholder pitfall four</li>
</ul>

---
layout: cover
class: slide-navy
---

<div class="eyebrow">Wrap-up</div>

# Questions &amp; next steps

<div class="subtitle">Placeholder closing slide</div>

<div class="absolute bottom-8 left-8 text-sm" style="color:var(--text-light-muted)">
Presented by Liam Carver &middot; entelect.co.za
</div>
