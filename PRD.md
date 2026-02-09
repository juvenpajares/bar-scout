# BarScout PH (working name)

## Name Options
- **BarScout PH** (straightforward, local)
- **NightScout PH** (broader nightlife scope)
- **TagayTrail PH** (local flavor, playful)
- **PulsePH** (focuses on live reporting)

**Recommendation:** **TagayTrail PH** — uniquely Filipino, memorable, and aligned with real-time “Tagay” Pulse reports.

---

# Product Requirements Document (PRD)

## 1) Overview
**Product:** TagayTrail PH (a.k.a. BarScout PH)

**Vision:** Make nightlife safer, more transparent, and easier to navigate through location-based discovery, transparent reviews, and real-time community reports.

**Core Value Proposition:** A location-based bar finder that combines standard reviews with real-time, community-driven reporting (Waze-style) to keep users safe and informed.

## 2) Goals & Success Metrics
**Goals**
1. Help users quickly discover bars that match their preferences (price, vibe, hours).
2. Improve decision confidence with clear comparisons and transparent reviews.
3. Increase safety and situational awareness via real-time reports.

**Success Metrics (First 6–12 months)**
- **Discovery conversion:** % of users who view a bar detail after searching.
- **Comparison usage:** % of active users who use Versus Mode at least once.
- **Live report participation:** % of monthly active users posting at least 1 report.
- **Trust signal:** Ratio of “helpful” votes to total reports.
- **Retention:** D30 retention of users who post a report vs. those who don’t.

## 3) Target Users & Personas
1. **Nightlife Explorers (21–35):** Looking for new spots, value transparency and vibe.
2. **Safety-conscious Groups:** Want to avoid rowdy or unsafe venues.
3. **Budget-conscious Drinkers:** Compare drink prices & entry fees.
4. **Tourists / Newcomers:** Need quick, reliable local insights.

## 4) User Journey (Find → Compare → Check Live Report → Visit)
**Step-by-step flow:**
1. **Open app** → Location permission prompt; user selects “Use current location” or “Pin location.”
2. **Discover bars on map** → Map shows nearby bars with pins and quick rating badges.
3. **Filter list** → User applies filters (Price, Vibe, Opening Hours).
4. **View bar cards** → Tap on bar cards to see preview info (price, rating, vibe tags).
5. **Enter Versus Mode** → Select 2–3 bars and compare side-by-side (average beer price, entry fee, rating).
6. **Check Live Reports (“Tagay” Pulse)** → View live status pins (e.g., Long Queue, Packed/No Seats).
7. **Decide & Navigate** → Tap “Go” for routing and optional safety tips.
8. **On-site reporting** → While at the bar, user can drop a real-time report (valid 2–4 hours).

## 5) Key Features & Requirements

### A) Geolocation & Discovery
- **Map-based interface** with bar pins near current or pinned location.
- **Advanced filtering**
  - Price Range (₱ budget to premium)
  - Vibe: Chill, Party, Live Music
  - Opening Hours: Open now, closes soon, late-night

### B) Comparison Engine (Versus Mode)
- Users can compare **2–3 bars**.
- **Comparison attributes:**
  - Average beer price
  - Entry fees
  - Rating
  - Vibe tags
- **Side-by-side layout** with clear “best value” highlight.

### C) Enhanced Review System
- **Transparency-first:** Never hide negative reviews.
- **Sentiment Highlight:**
  - If reviews show consistent negative themes (e.g., “Rude Bouncers,” “Overpriced,” “Unsafe”), show a **User Caution** badge.
  - Badge links to the most relevant reviews.

### D) Waze-Style Live Reporting (“Tagay” Pulse)
- Users physically present can post status pins.
- Reports are **valid 2–4 hours** and expire automatically.
- **Report Types:**
  - Long Queue
  - Packed/No Seats
  - Live Band Starting
  - AC Broken
  - Rowdy Crowd
  - Check-point Nearby
- **Gamification:**
  - Users earn reputation points for reports marked helpful.
  - Anti-spam: report rate limits and location verification.

## 6) Non-Functional Requirements
- **Performance:** Map load under 2s in metro areas.
- **Privacy:** Location only used with explicit user consent; precise location stored short-term for reports.
- **Security:** Reports are moderated for abuse; account verification via phone or OAuth.
- **Availability:** 99.5% monthly uptime.

## 7) Risks & Mitigations
- **Risk:** Fake reports → **Mitigation:** location verification + reputation scoring.
- **Risk:** Toxic reviews → **Mitigation:** moderation tools, community reporting.
- **Risk:** Data freshness → **Mitigation:** auto-expire stale reports, prioritize recent activity.

---

# Technical Architecture

## 1) High-Level Architecture
- **Mobile App (iOS/Android)**
  - Map & discovery UI
  - Filters + Versus Mode
  - Live report creation + display
- **Backend API**
  - Authentication & profiles
  - Bar search & filtering
  - Reviews + sentiment analysis
  - Live reports + expiration
- **Database (NoSQL)**
  - Bars, Reviews, LiveReports, Users, Reputation
- **Real-Time Layer**
  - WebSockets or Firebase/Socket.IO for live report updates
- **3rd-Party Integrations**
  - Maps SDK (Google Maps, Mapbox)
  - Push notifications (Firebase/APNs)

## 2) Suggested Stack
- **Frontend:** React Native / Flutter
- **Backend:** Node.js + Express or NestJS
- **Database:** MongoDB Atlas or Firebase Firestore
- **Real-time:** Firebase or Socket.IO
- **Analytics:** Amplitude / Mixpanel

## 3) Database Schema (NoSQL JSON)

### Bars Collection
```json
{
  "_id": "bar_123",
  "name": "The Buzzer Bar",
  "location": {
    "type": "Point",
    "coordinates": [121.0245, 14.5547]
  },
  "address": "Poblacion, Makati",
  "priceRange": "₱₱",
  "vibeTags": ["Party", "Live Music"],
  "openingHours": {
    "mon": "18:00-02:00",
    "tue": "18:00-02:00"
  },
  "avgBeerPrice": 120,
  "entryFee": 200,
  "ratingAvg": 4.1,
  "reviewCount": 214,
  "cautionBadge": {
    "enabled": true,
    "tags": ["Rude Bouncers", "Overpriced"]
  },
  "createdAt": "2025-01-01T10:00:00Z"
}
```

### Reviews Collection
```json
{
  "_id": "review_456",
  "barId": "bar_123",
  "userId": "user_789",
  "rating": 2,
  "comment": "Bouncer was rude and beer was overpriced.",
  "sentiment": {
    "score": -0.8,
    "labels": ["Rude Bouncers", "Overpriced"]
  },
  "createdAt": "2025-02-14T21:10:00Z",
  "helpfulVotes": 12
}
```

### LiveReports Collection
```json
{
  "_id": "report_987",
  "barId": "bar_123",
  "userId": "user_789",
  "type": "Long Queue",
  "description": "Line is around the block.",
  "location": {
    "type": "Point",
    "coordinates": [121.0245, 14.5547]
  },
  "createdAt": "2025-02-14T22:00:00Z",
  "expiresAt": "2025-02-15T02:00:00Z",
  "helpfulVotes": 5,
  "verified": true
}
```

---

# Key UI Components

## Core Screens
1. **Onboarding & Location Permission**
2. **Home Map View (Discovery)**
3. **Filter Drawer / Modal**
4. **Bar Details Page**
5. **Versus Mode (Comparison Screen)**
6. **Live Reports Feed (“Tagay” Pulse)**
7. **Add Report Modal**
8. **User Profile & Reputation**

## Supporting Components
- **Bar Card** (preview info + caution badge)
- **Caution Badge Tooltip**
- **Report Pin** (map overlay)
- **Report Type Selector**
- **Rating & Review Composer**
- **Navigation CTA (“Go to Bar”)**

---

# Next Steps (Execution Plan)
1. Validate with target users via quick prototype interviews.
2. Build MVP: Map view + filters + basic bar details + live reports.
3. Add Versus Mode and sentiment-based caution badge.
4. Launch pilot in Metro Manila; expand after feedback.
