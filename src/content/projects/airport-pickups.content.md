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
4. **Problem** — Flight moves. Cab time stays. Bad outcomes follow.
5. **Four cases** — Delay before takeoff, land early, delay in the air, “pick me up now.”
6. **Turn** — We already track flights. The cab can wait on the flight.
7. **Touchpoint** — Landing vs review for flight number; parallel pros/cons; review shipped.
8. **Book** — Special option on the list. Flight on the review screen.
9. **After book** — On time, delayed, after the ride—the flight stays visible.
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
| 4 | `open` | The flight can move. The cab time could not. |
| 5 | `situations` | Four times that goes wrong |
| 6 | `move` | We already track the flight. |
| 7 | `touchpoint` | Where to ask for the flight |
| 8 | `on-booking` | A cab that waits on your flight |
| 9 | `after` | The flight stays on the trip |
| 10 | `review` | Three ways to add your flight |
| 11 | `name` | Three names. One on the booking. |
| 12 | `web` | Same ask on web before you pay |
| 13 | `close` | The booking follows the flight |

**Note:** Section `flow` sits right after the hook. It should describe the **old** path only. New behavior lives in `on-booking` and `after`.

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

| Mark | Caption |
|------|---------|
| 1 | Start—search for airport cab. |
| 2 | Pick a place. |
| 2.1 | Shorter place list. |
| 2.2 | Pick a place. |
| 3 | Loading cabs. |
| 4 | Cab list. |
| 5 | Review—before we ask for a flight. |

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

### Problem — `open`

**H2:** The flight can move. The cab time could not.

**Body:**

You book a cab for a set time. The flight lands on its own schedule.

When those two don’t match, people cancel, wait, or the driver cancels.

**Scroll line:** Two times: flight moves, cab time stayed at booking.

---

### Four cases — `situations`

**Scroll line:** Four ways the times split—and what people do.

| # | What happens | What people do |
|---|--------------|----------------|
| 01 | Flight late before takeoff | Cancel or change the booking |
| 02 | Land early | Wait or cancel |
| 03 | Late in the air | Driver may cancel |
| 04 | Booked for “now” | Keep waiting |

---

### Turn — `move`

**Small label:** The change

**H2:** We already track the flight.

**Big line:** So the cab can wait on landing.

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

**H2:** A cab that waits on your flight

**Body:**

On the cab list, one choice is tied to your flight.

On review, if MakeMyTrip already knows your flight, it shows up. If not, we ask for the number.

**Scroll line:** One list choice waits on the flight. Review shows it or asks for it.

| Mark | Caption | Notice |
|------|---------|--------|
| 6 | The list. One cab tied to the flight. | Flight Tracked Cab (or same label) |
| 7 | Review asks for the flight. | When we don’t know it yet |
| 8 | Flight is on the booking. | Before you pay |

---

### After you book — `after`

**H2:** The flight stays on the trip

**Body:**

If the flight is on time, pickup time holds.

If the flight is late, landing time moves with it.

After the ride, the trip still shows the flight was tracked.

**Scroll line:** On time, pickup holds. Delay moves landing with the flight.

| Mark | Caption |
|------|---------|
| 9 | On time—the pickup holds. |
| 9.1 | Delayed—landing moves with the flight. |
| 9.2 | After the ride—it still says the flight was tracked. |

---

### Add a flight — `review`

**H2:** Three ways to add your flight

**Body:**

Type the number. Add it without typing. Or search when you don’t have it handy.

**Scroll line:** Type it, add it, or find it.

| Mark | Caption |
|------|---------|
| 10 | Type the flight number. |
| 11 | Add without typing. |
| 12 | Find it when you don’t have the number. |

**Optional:** People show up with different info—review had to be easy, not only the list label.

---

### Name — `name`

**H2:** Three names. One on the booking.

**Body:**

All three say: cab ready when you land. We put **Flight Tracked Cab** on the booking.

| Name | Line | Used? |
|------|------|-------|
| Flight Sync | Sync pickup with landing. | No |
| Flight Connect | Cab ready when you land. | No |
| **Flight Tracked Cab** | Cab ready when you land. | **Yes** |

**Scroll line:** We called it Flight Tracked Cab on the booking.

---

### Web — `web`

**H2:** Same ask on web before you pay

**Body:**

On a wide screen you can type the flight or confirm one we already found.

**Scroll line:** Web review—same flight ask before pay.

**Figure:** Wide review (mark **13**).

---

### End — `close`

**H2:** The booking follows the flight.

**Body (optional):** `[TBD — what to measure next, or one honest limit.]`

**Scroll line:** The booking follows the flight.

**For you (shorten for site if needed):**

- **Shipped:** Flight cab on list, flight on review, trip states, name, web review.
- **Not proven:** Fewer cancels in the 20% / 85% buckets; driver behavior; tricky flight cases.
- **Lesson:** `[TBD — when two times exist, show both in the trip—not only checkout.]`

---

## All scroll lines (first person)

| `id` | Line |
|------|------|
| `pickups` | The cab had a time. The flight did not. |
| `flow` | Before, review never moved cab time with the flight. |
| `numbers` | Most cabs happen. When they don’t, travellers cancel more than ops says no. |
| `open` | Flight moves; cab time stayed at booking. |
| `situations` | Four splits—and what people do. |
| `move` | We already tracked flights—I tied the cab to landing. |
| `touchpoint` | Landing would burden every trip—review fits pickup-only. |
| `on-booking` | One list choice waits on the flight; review shows or asks. |
| `after` | On time, pickup holds; delay moves landing. |
| `review` | Type, add, or find the flight. |
| `name` | We named it Flight Tracked Cab. |
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
