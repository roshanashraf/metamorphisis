# Better airport pickups — content & story (working draft)

**Purpose:** Edit the case study here before changing `AirportCaseStudy.astro` or assets.  
**Audience:** Someone hiring or leading design who wants to see how you think.  
**Format:** Portfolio case study at `/projects/airport-pickups/`.  
**Status:** Shipped at MakeMyTrip. We do not yet have numbers that prove fewer cancellations.

**Source:** Copy in `AirportCaseStudy.astro`; catalog in `airport-pickups.mdx`.

---

## The story in one breath

You book a cab for the airport. You pick a **time**. Your **flight** lands when it lands.

If the flight is late or early, the cab time does not move. People cancel. They wait. Sometimes the driver cancels.

MakeMyTrip **already knew flight times**. I helped tie the cab to **when you land**, not when you tapped book. On the app it is called **Flight Tracked Cab**.

**Opening line:** The cab had a time. The flight did not.

---

## Story order (what the reader learns)

1. **Hook** — Cab time and flight time are not the same thing.
2. **Before** — Old path: no flight on review, fixed cab time.
3. **Numbers** — Most trips happen. When they fail, the traveller usually cancels—not the company saying no.
4. **Problem** — Flight moves. Cab time stays. Four cases where timing breaks.
5. **Turn** — We already track flights. The cab can wait on the flight.
7. **Touchpoint** — Landing vs review for flight number; parallel pros/cons; review shipped.
8. **Book** — Special option on the list. Flight on the review screen.
9. **Post booking** — On time, delayed, on the trip—the flight stays visible.
10. **Add a flight** — Type it, pick it, or search for it.
11. **Name** — We picked Flight Tracked Cab.
12. **Web** — Same flight ask before pay.
13. **End** — The booking follows the flight.

---

## Be careful with numbers

| What we say | Notes |
|-------------|--------|
| 80% served | Check exact meaning and date range before publishing. |
| 20% not served | Same. |
| 85% of those: traveller cancelled | Same. Points to timing, not only “no cab.” |
| 15%: operator said no | Smaller slice. |
| Fewer cancellations after ship | **Not proven yet.** Say what we hoped, not what we measured. |

---

## Site sections (headlines for scanning)

| Order | `id` | Headline |
|------:|------|----------|
| 1 | `pickups` | Better airport pickups |
| 2 | `flow` | How booking worked before |
| 3 | `numbers` | Most trips work. When they don’t, people often cancel themselves. |
| 4 | `open` | The flight can move. The cab time could not. (+ Four times that goes wrong) |
| 5 | `move` | We already track the flight. |
| 6 | `touchpoint` | Where to ask for the flight |
| 7 | `on-booking` | Highlight Flight Tracked Cab on the listing |
| 8 | `flight-info` | Flight info collection |
| 9 | `post-booking` | Post booking experience |
| 10 | `web` | Same ask on web before you pay |
| 11 | `close` | The booking follows the flight |

**Note:** Section `flow` sits right after the hook. It should describe the **old** path only. New behavior lives in `on-booking`, `flight-info`, and `post-booking`.

---

## Copy for the site

### Catalog (`airport-pickups.mdx`)

```yaml
title: Better airport pickups
summary: The cab had a time. The flight did not.
year: 2026
role: Product design
tags:
  - Airport
  - Booking
  - Trust
featured: true
order: 2
status: published
seo:
  title: Better airport pickups — roshanashraf
  description: Airport cabs that follow your landing time—not the time you booked.
```

### Hero — `pickups`

- **H1:** Better airport pickups
- **Lede:** The cab had a time. The flight did not.
- **Meta:** Airport cabs · MakeMyTrip · Product design · 2026
- **Hero image:** List row **Flight Tracked Cab** or review with flight attached—not generic search.
- **Caption:** Flight Tracked Cab on the list. When your flight is on the booking, pickup follows landing.

**Scroll line:** The cab had a time. The flight did not.

---

### Old path — `flow`

**H2:** Old Experience

| # | Caption |
|---|---------|
| 1 | Airport transfers—search with no flight on the form. |
| 2 | Pick the airport—favorites and search. |
| 3 | Terminal search results. |
| 4 | Pick drop-off—with terminal fixed as from. |
| 5 | Drop-off results. |
| 6 | Route set—trip start is already on the search. |
| 7 | Pickup time—you choose when the cab should arrive. |
| 8 | Search—time locked in before results. |
| 9 | Loading cabs. |
| 10 | Cab list—flat view. |
| 11 | Cab list—by category. |
| 12 | Review and pay—still no flight on the booking. |

Assets: `src/assets/projects/airport-pickups/flow-01` … `flow-12`.

---

### At a glance *(optional)*

- **Who:** People booking a cab from the airport when landing time might change.
- **My work:** `[TBD — list, review, trip screens, naming; with eng/ops]`
- **Scope:** App booking + web review. Not live curb maps.
- **Shipped:** Flight Tracked Cab. Cancellation impact not measured yet.

---

### Numbers — `numbers`

**Scroll line:** Most airport cabs happen. Of the rest, travellers cancel more than the operator says no.

**On page:**

**All airport cab bookings**

| Value | Label |
|------:|-------|
| 80% | Trip happened |
| 20% | Trip did not happen |

**Of the 20% that did not happen**

| Value | Label |
|------:|-------|
| 85% | Traveller cancelled |
| 15% | Operator said no |

**Extra line (optional):** That split said the pain was often **timing**, not only “no driver.”

---

### Problem — `open` (includes former `situations`)

**H2:** The flight can move. The cab time could not.

**Body:**

You book a cab for a set time. The flight lands on its own schedule.

When those two don’t match, people cancel, wait, or the driver cancels.

**H3:** Four times that goes wrong

**Scroll line:** Flight moves; cab time stayed—four splits and what people do.

| # | What happens | What people do |
|---|--------------|----------------|
| 01 | Flight late before takeoff | Cancel or change the booking |
| 02 | Land early | Wait or cancel |
| 03 | Late in the air | Driver may cancel |
| 04 | Booked for “now” | Keep waiting |

---

### Turn — `move`

**UI:** Mint callout (`--color-airport-mint`) — serif headline + italic subline on one rounded banner; body copy below.

**H2:** We already track the flight.

**Italic line:** So the cab can wait on landing.

**Body:**

The cab no longer only listens to the time you picked at checkout. It listens to the flight.

**Scroll line:** We already had flight data—I linked the cab to landing time.

**If you add detail later:**

- Other ideas: `[TBD — manual reschedule only, text driver, vague “flexible” cab]`
- Why this: Flight data was already there. Clear on list and review. Trip screen shows delays.
- Cost: Need a flight on the booking. `[TBD — edge cases, ops rules]`

---

### Touchpoint — `touchpoint`

**Working draft (full diagram + Mermaid):** `airport-pickups-flight-touchpoint.content.md`

**H2:** Where to ask for the flight

**Body:** Search has to work for airport pickup and airport drop. Only pickup needs a flight. A field on landing would burden every drop and fight the pickup-time control. We asked on review, once they chose a cab that waits on landing.

**Scroll line:** Landing would burden every trip—review fits pickup-only.

**Figure:** `FlightTouchpointFlow.astro` — one chart: baseline spine, drop vs pickup, landing (A) vs review (B), review shipped.

---

### Book — `on-booking`

**H2:** Highlight Flight Tracked Cab as a USP on the listing page

**Body:**

On airport pickup, the list leads with Flight Tracked Cab—cab ready whenever you land—not a label hidden on one vehicle. Tap info for a short sheet: add your flight on review, and we track it so pickup follows landing.

**Scroll line:** USP on the list—not one row. Info sets up review.

| # | Caption |
|---|---------|
| 1 | Listing—Flight Tracked Cab as the USP above the cabs. |
| 2 | Info—add flight on review; we track and meet you when you land. |

Assets: `booking-listing-flight-tracked-usp.png`, `booking-flight-tracked-bottomsheet.jpg`.

---

### Flight info — `flight-info`

**H2:** Flight info collection

**Body:**

On review, connect your flight: enter a number or PNR, or follow **Find your flight** when you do not have it handy. When you already have a MakeMyTrip flight the same day to this airport, we surface it with **Add flight**—no typing.

**Scroll line:** Type, find, or add the flight we already know.

**Figure:** `FlightInfoCollectionFlow.astro` — primary row (type → sync → flight card), fork quote *Who would even remember flight number??*, alternate row (departure airport → choose → adding).

| Path | Step | Caption |
|------|------|---------|
| Primary | 1–5 | Empty → type → adding → synced → flight on booking |
| Alternate | 1–3 | Departure airport → choose flight → adding |
| Prefill | 1 | Confirm your flight—then Add flight |

Assets: `review-01` … `review-09`.

---

### Post booking — `post-booking`

**H2:** Post booking experience

**Body:**

After you pay, timing follows the flight—not the time you picked at checkout. On time, pickup holds. Delayed, landing moves with it. The trip keeps showing the flight was tracked.

**Scroll line:** After pay, pickup follows the flight—not the clock.

| Mark | Caption |
|------|---------|
| 9 | On time—the pickup holds. |
| 9.1 | Delayed—landing moves with the flight. |
| 9.2 | After the ride—it still says the flight was tracked. |

---

### Web — `web`

**H2:** Same ask on web before you pay

**Body:**

On a wide screen you can type the flight or confirm one we already found.

**Scroll line:** Web review—same flight ask before pay.

**Figure:** `web-review-flight-tracked.jpg` — desktop review with Flight tracked cabs and enter flight number.

**Caption:** Web review—same flight ask before you pay.

---

### End — `close`

**H2:** The booking follows the flight.

**Body (optional):** `[TBD — what to measure next, or one honest limit.]`

**Scroll line:** The booking follows the flight.

**For you (shorten for site if needed):**

- **Shipped:** Flight cab on list, flight on review, trip states, web review.
- **Not proven:** Fewer cancels in the 20% / 85% buckets; driver behavior; tricky flight cases.
- **Lesson:** `[TBD — when two times exist, show both in the trip—not only checkout.]`

---

## All scroll lines (first person)

| `id` | Line |
|------|------|
| `pickups` | The cab had a time. The flight did not. |
| `flow` | Before, review never moved cab time with the flight. |
| `numbers` | Most cabs happen. When they don’t, travellers cancel more than ops says no. |
| `open` | Flight moves; cab time stayed—four splits and what people do. |
| `move` | We already tracked flights—I tied the cab to landing. |
| `touchpoint` | Landing would burden every trip—review fits pickup-only. |
| `on-booking` | USP on the list—not one row. Info sets up review. |
| `flight-info` | Type, find, or add the flight we already know. |
| `post-booking` | After pay, pickup follows the flight—not the clock. |
| `web` | Same flight ask on web before pay. |
| `close` | The booking follows the flight. |

---

## Before you ship to Astro

- [ ] Can a new reader get “two times, tie to flight” from hero + old path + numbers?
- [ ] Numbers match real definitions.
- [ ] No claim that cancellations dropped without data.
- [ ] Old `flow` copy is not mixed with new `on-booking` copy.
- [ ] Headlines alone tell the story.
- [ ] “My contribution” filled in.

---

## Changelog

| Date | Note |
|------|------|
| 2026-11-02 | First draft from `AirportCaseStudy.astro`. |
| 2026-11-03 | Story rewritten: plain words, short lines, clear order. |
| 2026-11-03 | Moved `flow` (old path) to sit right after the hook. |
