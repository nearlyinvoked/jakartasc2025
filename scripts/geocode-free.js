import fs from "fs";
import https from "https";

async function geocodeWithNominatim(address) {
  return new Promise((resolve, reject) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}&limit=1`;

    const options = {
      headers: {
        "User-Agent": "Jakarta-Event-App/1.0",
      },
    };

    https
      .get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const result = JSON.parse(data);
            if (result.length > 0) {
              const location = result[0];
              resolve({
                lat: parseFloat(location.lat),
                lng: parseFloat(location.lon),
              });
            } else {
              console.log(`No results found for: ${address}`);
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

async function updateCoordinatesWithNominatim() {
  const filePath = "src/data/atm.json";
  const atmData = JSON.parse(fs.readFileSync(filePath, "utf8"));

  for (const [providerKey, provider] of Object.entries(atmData.providers)) {
    for (const location of provider.locations) {
      // Skip if coordinates already exist
      if (!location.coordinates.lat) {
        console.log(`Geocoding: ${location.name.en}`);
        const coords = await geocodeWithNominatim(location.address.en);
        if (coords) {
          location.coordinates = coords;
          console.log(`✓ ${location.name.en}: ${coords.lat}, ${coords.lng}`);
        }
        // Add delay to be respectful to the free service
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(atmData, null, 2));
  console.log("✓ Coordinates updated in atm.json");
}

updateCoordinatesWithNominatim().catch(console.error);
