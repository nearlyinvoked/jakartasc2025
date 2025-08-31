const fs = require("fs");
const https = require("https");

// You'll need to get a Google Maps Geocoding API key from:
// https://developers.google.com/maps/documentation/geocoding/get-api-key
const GOOGLE_API_KEY = "YOUR_API_KEY_HERE";

async function geocodeAddress(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${GOOGLE_API_KEY}`;

    https
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            if (result.status === "OK" && result.results.length > 0) {
              const location = result.results[0].geometry.location;
              resolve({ lat: location.lat, lng: location.lng });
            } else {
              console.log(
                `Geocoding failed for: ${address} - ${result.status}`
              );
              resolve(null);
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", reject);
  });
}

async function updateCoordinates() {
  const filePath = "src/data/atm.json";
  const atmData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const [providerKey, provider] of Object.entries(atmData.providers)) {
    for (const location of provider.locations) {
      if (!location.coordinates.lat) {
        console.log(`Geocoding: ${location.name.en}`);
        const coords = await geocodeAddress(location.address.en);
        if (coords) {
          location.coordinates = coords;
          console.log(`✓ ${location.name.en}: ${coords.lat}, ${coords.lng}`);
        }
        // Add delay to respect API rate limits
        await new Promise((resolve) => setTimeout(resolve, 200));
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(atmData, null, 2));
  console.log("✓ Coordinates updated in atm.json");
}

if (GOOGLE_API_KEY === "YOUR_API_KEY_HERE") {
  console.log("Please set your Google Maps API key in this script");
  console.log(
    "Get one from: https://developers.google.com/maps/documentation/geocoding/get-api-key"
  );
} else {
  updateCoordinates().catch(console.error);
}
