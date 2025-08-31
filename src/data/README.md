# Facilities Data Structure

This directory contains separate JSON files for each facility type, making it easier to manage and update individual categories.

## Files:

- `atm.json` - ATM locations and providers (BCA, Mandiri, BNI)
- `hospital.json` - Hospital locations and providers (Siloam, Omni)
- `pharmacy.json` - Pharmacy locations and providers (Guardian, Kimia Farma)
- `gasStation.json` - Gas station locations and providers (Pertamina, Shell)
- `restaurant.json` - Restaurant locations and providers (McDonald's, KFC)
- `index.ts` - Combines all data sources into a single export

## How to add new facilities:

1. **Add new locations**: Edit the appropriate JSON file and add new entries to the `locations` array
2. **Add new providers**: Add new provider objects to the `providers` section
3. **Add new categories**: Create a new JSON file following the same structure and update `index.ts`

## Structure of each file:

```json
{
  "name": {
    "en": "English Name",
    "id": "Indonesian Name"
  },
  "icon": "icon_name",
  "providers": {
    "provider_id": {
      "name": {
        "en": "English Name",
        "id": "Indonesian Name"
      },
      "logo": "/images/logo.png",
      "locations": [
        {
          "id": "unique_location_id",
          "name": {
            "en": "English Location Name",
            "id": "Indonesian Location Name"
          },
          "address": {
            "en": "English Address",
            "id": "Indonesian Address"
          },
          "coordinates": {
            "lat": -6.3018,
            "lng": 106.6519
          },
          "distance": "1.2 km",
          "estimatedTime": "4 min",
          "mapUrl": "https://maps.google.com/?q=lat,lng"
        }
      ]
    }
  }
}
```

## Usage in React:

Import the combined data:

```typescript
import facilitiesData from "../data/index";
```

Access specific categories:

```typescript
const atmData = facilitiesData.atm;
const hospitalData = facilitiesData.hospital;
```
