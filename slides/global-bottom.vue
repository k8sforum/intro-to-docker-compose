<script setup lang="ts">
import { onBeforeUnmount, onMounted, watch } from 'vue'
import { useNav } from '@slidev/client'

type SlideSnapshot = {
  number: number
  title: string
}

const TELEMETRY_URL = 'http://localhost:9464/api/slide-event'
const SESSION_STORAGE_KEY = 'docker-compose-forum-session-id'
const nav = useNav()

let activeSlide: SlideSnapshot | null = null
let activeSlideStartedAt = 0

function ensureSessionId() {
  const existing = window.sessionStorage.getItem(SESSION_STORAGE_KEY)
  if (existing)
    return existing

  const generated = `session-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  window.sessionStorage.setItem(SESSION_STORAGE_KEY, generated)
  return generated
}

function currentSlideSnapshot(): SlideSnapshot | null {
  const route = nav.currentSlideRoute.value
  const slideMeta = route?.meta?.slide

  if (!slideMeta?.no)
    return null

  return {
    number: Number(slideMeta.no),
    title: String(slideMeta.title || `Slide ${slideMeta.no}`),
  }
}

function postTelemetry(payload: Record<string, unknown>) {
  const body = JSON.stringify({
    deck: 'docker-compose-forum',
    sessionId: ensureSessionId(),
    ...payload,
  })

  void fetch(TELEMETRY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain' },
    body,
    credentials: 'omit',
    keepalive: true,
  }).catch(() => {})
}

function enterSlide(slide: SlideSnapshot) {
  activeSlide = slide
  activeSlideStartedAt = Date.now()

  postTelemetry({
    type: 'enter',
    slideNumber: slide.number,
    slideTitle: slide.title,
    enteredAt: new Date(activeSlideStartedAt).toISOString(),
  })
}

function leaveSlide(reason: 'change' | 'pagehide' | 'beforeunload') {
  if (!activeSlide || !activeSlideStartedAt)
    return

  const endedAt = Date.now()
  const dwellSeconds = Math.max((endedAt - activeSlideStartedAt) / 1000, 0)

  postTelemetry({
    type: 'leave',
    slideNumber: activeSlide.number,
    slideTitle: activeSlide.title,
    enteredAt: new Date(activeSlideStartedAt).toISOString(),
    endedAt: new Date(endedAt).toISOString(),
    dwellSeconds: Number(dwellSeconds.toFixed(3)),
    reason,
  })

  activeSlide = null
  activeSlideStartedAt = 0
}

function syncToCurrentSlide() {
  const nextSlide = currentSlideSnapshot()
  if (!nextSlide)
    return

  if (!activeSlide) {
    enterSlide(nextSlide)
    return
  }

  if (activeSlide.number === nextSlide.number)
    return

  leaveSlide('change')
  enterSlide(nextSlide)
}

function handlePageHide() {
  leaveSlide('pagehide')
}

function handleBeforeUnload() {
  leaveSlide('beforeunload')
}

onMounted(() => {
  ensureSessionId()
  syncToCurrentSlide()

  window.addEventListener('pagehide', handlePageHide)
  window.addEventListener('beforeunload', handleBeforeUnload)
})

watch(
  () => nav.currentSlideNo.value,
  () => {
    syncToCurrentSlide()
  },
)

onBeforeUnmount(() => {
  window.removeEventListener('pagehide', handlePageHide)
  window.removeEventListener('beforeunload', handleBeforeUnload)
  leaveSlide('beforeunload')
})
</script>

<template>
  <div style="display: none" aria-hidden="true" />
</template>
