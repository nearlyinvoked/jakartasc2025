# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server (Vite HMR)
npm run build      # Type-check + production build
npm run lint       # ESLint
npm run preview    # Preview production build locally
```

There is no test suite.

## Architecture

This is a PWA (Progressive Web App) built with React 19 + TypeScript + Vite, deployed to Vercel. It serves as a public facilities guide for attendees of the Jakarta SC 2025 event at ICE BSD.

**Routing** — `/:locale/:category/:provider` with `react-router-dom`. The root `/` redirects to `/en`. All routes are SPA routes (Vercel rewrites everything to `index.html`).

**Localization** — Indonesian-only (`"id"`). `src/lib/i18n.ts` has a single `translations.id` object. The `t(key)` helper is used throughout pages. The locale segment in the URL is always `id`.

**Data** — Static JSON files in `src/data/` (one per facility category), generated from `source/Lokasi_Lokasi_Departemen_Informasi_2026_Update_10_Mei_2026.xlsx`. Categories: `atm`, `hospital`, `pharmacy`, `gasStation`, `restaurant`, `moneyChanger`, `autoRepair`, `shoppingCenter`, `hotel`. All combined in `src/data/index.ts`. Each JSON uses **plain Indonesian strings** (not locale objects) for `name` and `address`. The `getLocalizedText()` helper in CategoryPage/ProviderPage handles both plain strings and legacy locale objects. Each JSON follows this structure:

```json
{
  "name": { "en": "...", "id": "..." },
  "providers": {
    "provider_id": {
      "name": { "en": "...", "id": "..." },
      "logo": "/images/logo.png",
      "locations": [{
        "id": "unique_id",
        "name": { "en": "...", "id": "..." },
        "address": { "en": "...", "id": "..." },
        "coordinates": { "lat": -6.3, "lng": 106.6 },
        "distance": "1.2 km",
        "estimatedTime": "4 min",
        "mapUrl": "https://maps.google.com/?q=lat,lng"
      }]
    }
  }
}
```

**Pages** — Three pages matching the route segments:
- `HomePage` — category grid
- `CategoryPage` — provider list, sorted by closest location distance
- `ProviderPage` — location cards with embedded Google Maps iframe + directions button

**Localized text in data** — Provider/location `name` and `address` fields are objects keyed by locale (e.g. `{ "en": "...", "id": "..." }`). The `getLocalizedText()` helper (defined inline in both `CategoryPage` and `ProviderPage`) resolves with fallback: locale → `en` → `id` → first value.

**UI** — MUI v7 (Material UI) for components, Tailwind CSS also present but MUI is the primary UI layer. Theme in `src/lib/theme.ts`.

**Browser compatibility** — `@vitejs/plugin-legacy` targets iOS 10+, Android 5+, Chrome 49+. Legacy polyfill bundles are generated automatically on build. Feature detection utilities in `src/utils/featureDetection.ts`.

**PWA** — Service worker at `public/sw.js`, manifest at `public/manifest.json`.

## Updating facility data

The source data lives in `source/Lokasi_Lokasi_Departemen_Informasi_2026_Update_10_Mei_2026.xlsx`. Each sheet maps to a JSON file. Only rows where "Survei Fisik" is `ok` are included; rows marked `close` or with keterangan "Tidak ada lagi" are excluded. Coordinates default to ICE BSD (`-6.2974, 106.6514`) since the Excel lacks lat/lng — use `scripts/geocode-free.js` to geocode after updating.

## Adding a new facility category

1. Create `src/data/<categoryName>.json` using plain Indonesian strings for `name`/`address`.
2. Import and add it to `facilitiesData` in `src/data/index.ts`.
3. Add a translation key in `src/lib/i18n.ts` under `translations.id`.
4. Add a category entry with a MUI icon in `HomePage.tsx`.
