# BarScout PH MVP

This repository contains a lightweight MVP implementation for the BarScout PH concept (aka TagayTrail PH).

## What’s Included
- Express API with sample bars, reviews, and live reports.
- Minimal web UI to browse bars, compare 2–3 venues, and see live reports.

## Getting Started
```bash
npm install
npm start
```

Visit `http://localhost:3000` to view the MVP.

## API Endpoints
- `GET /api/bars` (optional query params: `priceRange`, `vibe`)
- `GET /api/bars/:id`
- `GET /api/bars/:id/reviews`
- `GET /api/bars/:id/reports`
- `GET /api/compare?ids=bar_001,bar_002`
