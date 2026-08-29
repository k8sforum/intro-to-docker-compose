import cors from 'cors'
import express from 'express'
import client from 'prom-client'

const app = express()
const port = process.env.PORT || 9464
const allowedOrigin = process.env.ALLOWED_ORIGIN || 'http://localhost:8080'

const register = new client.Registry()
client.collectDefaultMetrics({ register, prefix: 'slides_observability_' })

const slideViewTotal = new client.Counter({
  name: 'slide_view_total',
  help: 'Total number of slide enter events received',
  labelNames: ['deck', 'slide_number', 'slide_title'],
  registers: [register],
})

const slideDwellSeconds = new client.Histogram({
  name: 'slide_dwell_seconds',
  help: 'Time spent on a slide before navigating away',
  labelNames: ['deck', 'slide_number', 'slide_title'],
  buckets: [2, 5, 10, 20, 30, 60, 120, 300],
  registers: [register],
})

const currentSlideNumber = new client.Gauge({
  name: 'slide_current_number',
  help: 'Current slide number for an active session',
  labelNames: ['deck', 'session_id'],
  registers: [register],
})

const currentSlideInfo = new client.Gauge({
  name: 'slide_current_info',
  help: 'Current slide indicator with slide labels for an active session',
  labelNames: ['deck', 'session_id', 'slide_number', 'slide_title'],
  registers: [register],
})

const activeSlideBySession = new Map()

app.use(cors({
  origin: allowedOrigin,
  credentials: false,
}))
app.options('*', cors({
  origin: allowedOrigin,
  credentials: false,
}))
app.use(express.json({ limit: '100kb' }))
app.use(express.text({ type: 'text/plain', limit: '100kb' }))

app.get('/health', (_req, res) => {
  res.json({ ok: true })
})

app.get('/metrics', async (_req, res) => {
  res.set('Content-Type', register.contentType)
  res.end(await register.metrics())
})

app.post('/api/slide-event', (req, res) => {
  const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  const {
    deck = 'docker-compose-forum',
    sessionId,
    type,
    slideNumber,
    slideTitle,
    dwellSeconds,
  } = payload ?? {}

  if (!sessionId || !type || !slideNumber || !slideTitle) {
    res.status(400).json({ error: 'sessionId, type, slideNumber, and slideTitle are required' })
    return
  }

  const normalizedLabels = {
    deck: String(deck),
    session_id: String(sessionId),
    slide_number: String(slideNumber),
    slide_title: String(slideTitle),
  }

  if (type === 'enter') {
    const previous = activeSlideBySession.get(normalizedLabels.session_id)
    if (previous) {
      currentSlideInfo.remove(
        previous.deck,
        normalizedLabels.session_id,
        previous.slide_number,
        previous.slide_title,
      )
    }

    slideViewTotal.inc({
      deck: normalizedLabels.deck,
      slide_number: normalizedLabels.slide_number,
      slide_title: normalizedLabels.slide_title,
    })

    currentSlideNumber.set(
      {
        deck: normalizedLabels.deck,
        session_id: normalizedLabels.session_id,
      },
      Number(slideNumber),
    )

    currentSlideInfo.set(normalizedLabels, 1)
    activeSlideBySession.set(normalizedLabels.session_id, normalizedLabels)
    res.status(202).json({ accepted: true })
    return
  }

  if (type === 'leave') {
    if (typeof dwellSeconds === 'number' && Number.isFinite(dwellSeconds)) {
      slideDwellSeconds.observe(
        {
          deck: normalizedLabels.deck,
          slide_number: normalizedLabels.slide_number,
          slide_title: normalizedLabels.slide_title,
        },
        dwellSeconds,
      )
    }

    currentSlideNumber.set(
      {
        deck: normalizedLabels.deck,
        session_id: normalizedLabels.session_id,
      },
      0,
    )

    currentSlideInfo.remove(
      normalizedLabels.deck,
      normalizedLabels.session_id,
      normalizedLabels.slide_number,
      normalizedLabels.slide_title,
    )

    activeSlideBySession.delete(normalizedLabels.session_id)
    res.status(202).json({ accepted: true })
    return
  }

  res.status(400).json({ error: 'Unsupported event type' })
})

app.listen(port, () => {
  console.log(`slides observability collector listening on ${port}`)
})
