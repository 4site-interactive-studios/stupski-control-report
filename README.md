# CONTROL Book Launch Analytics Dashboard
### Stupski Foundation — March 2026

**Prepared by:** Stef Jones, 4Site Interactive Studios
**Dashboard file:** `stupski-control-report.jsx`
**Report period:** March 1–31, 2026
**Last updated:** April 1, 2026

---

## What This Report Is

This is an interactive analytics dashboard tracking the performance of the Stupski Foundation's marketing campaign for *CONTROL: Why Big Giving Falls Short* by Glen Galaich. It visualizes real data from three platforms to tell the full story of the book's launch — from the pre-launch countdown through publication week and the post-launch steady state.

---

## Data Sources

| Platform | What It Provides | Date Range |
|---|---|---|
| **Google Analytics 4** | Sessions, pageviews, events (clicks, scrolls, form submissions, video starts), landing pages, traffic acquisition channels, source/medium breakdowns | Mar 1–31, 2026 |
| **Microsoft Clarity** | Total sessions, unique users, scroll depth, active time, click/tap heatmaps, referrer analysis, smart events, behavioral insights (rage clicks, dead clicks, quick back clicks), Core Web Vitals, browser/device breakdown | Mar 1–31, 2026 |
| **Google Search Console** | Organic search clicks, impressions, CTR, average position, top queries, top pages, device breakdown, country breakdown | Mar 1–31, 2026 |

---

## Dashboard Tabs

### 1. Overview
Site-wide KPIs with a phase selector (Pre-Launch, Launch Week, Post-Launch, Full Month). Includes a daily session trend chart with launch phase markers and a phase-over-phase comparison table.

### 2. CONTROL Page
Deep dive on `/control/` — the book's primary landing page. Shows source/medium breakdown, engagement by channel, and the daily session/click/scroll trend. Flags the LinkedIn `li_ed` parameter attribution issue.

### 3. Channels
GA4 traffic acquisition by channel grouping with engagement rates and average session time. Clarity referrer breakdown showing LinkedIn as the #1 external driver.

### 4. Search (GSC)
Google Search Console performance — daily clicks/impressions chart, top search queries, top organic pages. Highlights emerging book-related search queries and the Break Fake Rules impression anomaly.

### 5. Clicks & UX
Clarity click and tap heatmap data decoded from CSS selectors into meaningful page elements. Core Web Vitals and behavioral insight signals. This tab contains the lightbox friction analysis.

### 6. Tour & Podcast
Performance data for the Book Tour Events page (`/control/book-tour-events/`) and the Break Fake Rules podcast page (`/break-fake-rules/`), with a cross-platform comparison table.

---

## Campaign Phases

The report is structured around the promo plugin timeline coordinated with Claire Callahan:

| Phase | Dates | Banner Config | Lightbox Status |
|---|---|---|---|
| **Pre-Launch** | Mar 1–16 | Countdown banner on `/control/` and homepage | Active (video lightbox on `/control/`) |
| **Launch Week** | Mar 17–22 | "Order Today" purchase CTA banner on all interior pages; homepage gets lightbox with Order CTA instead of banner | Disabled on `/control/` to reduce friction |
| **Post-Launch** | Mar 23+ | "Order Today" banner site-wide (including homepage) | Re-enabled on `/control/` |

---

## Key Findings

### Traffic
- **24,470 total GA4 sessions** across stupski.org in March 2026
- **18,722 sessions (76.1%) landed on `/control/`** — the book page dominated the entire site
- **Launch day (March 17) delivered a 7.5x spike** — from 330 to 2,665 /control/ sessions
- **March 18 was the highest single day** at 3,097 /control/ sessions
- Traffic came in distinct waves tied to LinkedIn campaign pushes, with sharp drop-offs between pushes

### Channels & Attribution
- **Direct traffic: 17,432 sessions (71.2%)** — but this is misleading
- LinkedIn's `li_ed` tracking parameters cause GA4 to classify LinkedIn-driven traffic as "Direct"
- **True LinkedIn-driven traffic is estimated at ~92% of /control/ landings** (14,835 Direct + 2,081 LinkedIn referral + 381 lnkd.in)
- **Organic Search visitors engage 19x longer** (46.3s) than Direct visitors (2.4s)
- Substack and the Who Gives? newsletter combined for 178 /control/ landing sessions

### Lightbox & CTA Performance
- The **lightbox close button was the #1 clicked element** on the CONTROL page — 1,203 close clicks (32.4% of all interactions)
- Only **44 visitors clicked the lightbox CTA button** vs. 1,203 who dismissed it (3.7% lightbox conversion rate)
- **Disabling the lightbox during launch week correlated with a 452% increase in scroll events**
- 90% of CONTROL page traffic is mobile — UX decisions should be mobile-first

### Organic Search
- **2,048 total GSC clicks** / 516K impressions
- "stupski foundation" is the top query (627 clicks, 64.4% CTR)
- Book-related queries ("control why big giving falls short," "glen galaich book," etc.) generated **98 combined clicks and 469 impressions** — an emerging signal that should grow with tour and media coverage

### Performance
- Clarity performance score: **60.9** (needs improvement)
- LCP: 3.9s (poor), INP: 384ms (poor), CLS: 0.40s (poor)
- 683 dead clicks (2.92% of sessions), 663 quick back clicks (2.83%)

---

## How to Update This Report

This dashboard is built as a React component (`.jsx`) with all data hardcoded from the March 2026 exports. To update for a new reporting period:

### GA4 Exports Needed
1. **Traffic Acquisition** — Reports → Acquisition → Traffic acquisition → Export CSV
2. **Pages and Screens** — Reports → Engagement → Pages and screens → Add secondary dimension "Session source / medium" → Export CSV
3. **Events** — Reports → Engagement → Events → Export CSV
4. **Landing Pages** — Reports → Engagement → Landing page → Add secondary dimension "Session source / medium" → Export CSV
5. **Free Form Explore** — Create a Free Form exploration with dimensions: Date, Page path + query string, Event name, Session source / medium. Metrics: Event count, Sessions, Total users. Filter to pages containing "/control/". Export CSV.

### Google Search Console Export
1. Go to GSC → Performance → Search results
2. Set the date range
3. Export the following tabs as CSV: Queries, Pages, Countries, Devices, Chart (daily data)

### Microsoft Clarity Exports
1. **Dashboard** — Export the main dashboard CSV from the Stupski Foundation project
2. **Recordings** — Export a sample of session recordings
3. **Click Heatmap (PC)** — Filter to `/control/` page, export the PC click report
4. **Tap Heatmap (Mobile)** — Filter to `/control/` page, export the mobile tap report

### Updating the Dashboard Code
Replace the data constants at the top of the `.jsx` file (`DAILY` array and the data objects in each tab's render function) with the new values from your exports. The chart components and layout will adapt automatically.


### Source Data Files (for reference)

| File | Source | Description |
|---|---|---|
| `Clarity_The_Stupski_Foundation__Dashboard_*.csv` | Microsoft Clarity | Site-wide metrics, top pages, referrers, smart events, performance |
| `Clarity_The_Stupski_Foundation__150_Recordings_*.csv` | Microsoft Clarity | Sample session recordings with entry URLs, devices, durations |
| `Clarity_The_Stupski_Foundation__Click_PC_*.csv` | Microsoft Clarity | Desktop click heatmap data for `/control/` |
| `Clarity_The_Stupski_Foundation__Tap_Mobile_*.csv` | Microsoft Clarity | Mobile tap heatmap data for `/control/` |
| `Traffic_acquisition_*.csv` | GA4 | Channel grouping with sessions, engagement rates |
| `Pages_and_screens_*.csv` | GA4 | Page-level views by source/medium |
| `Events_Event_name.csv` | GA4 | Event-level data by landing page |
| `Landing_page_Landing_page.csv` | GA4 | Landing page sessions by source/medium |
| `download__1_.csv` | GA4 (Explore) | Daily event-level data for `/control/` |
| `Chart.csv` | GSC | Daily clicks, impressions, CTR, position |
| `Queries.csv` | GSC | Top search queries |
| `Pages.csv` | GSC | Top pages by organic performance |
| `Countries.csv` | GSC | Clicks/impressions by country |
| `Devices.csv` | GSC | Desktop vs. mobile vs. tablet |

---

## Recommendations for Next Reporting Period

1. **Implement UTM parameters on all LinkedIn posts** to properly attribute LinkedIn traffic in GA4 instead of it showing as Direct
2. **Evaluate the lightbox strategy** — data strongly suggests it creates friction rather than conversions, especially on mobile
3. **Monitor book-related search queries** — these should grow as tour events and media coverage accumulate
4. **Address Core Web Vitals** — all three metrics (LCP, INP, CLS) are in the "poor" range, which may impact both organic rankings and user experience
5. **Track the podcast-to-book pipeline** more explicitly — consider UTM-tagged links within Break Fake Rules episode descriptions

---

*Report produced by Stef Jones, Director of Digital Strategy, 4Site Interactive Studios.*
