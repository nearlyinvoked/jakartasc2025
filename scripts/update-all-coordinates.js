import fs from "fs";

// Known coordinates for BSD area locations
const knownCoordinates = {
  "ICE BSD": { lat: -6.3017, lng: 106.6519 },
  "BSD Grand Boulevard": { lat: -6.3017, lng: 106.6519 },
  "BSD Raya Utama": { lat: -6.3045, lng: 106.6501 },
  "Pagedangan Raya": { lat: -6.2899, lng: 106.6234 },
  Pagedangan: { lat: -6.2899, lng: 106.6234 },
  "BSD Green Office Park": { lat: -6.3089, lng: 106.6428 },
  "Unilever BSD": { lat: -6.3089, lng: 106.6428 },
  "Prasetiya Mulya BSD": { lat: -6.3084, lng: 106.6523 },
  "BSD City": { lat: -6.3084, lng: 106.6523 },
  "ON Space BSD": { lat: -6.302, lng: 106.653 },
  "Kimia Farma": { lat: -6.3025, lng: 106.6515 },
  Guardian: { lat: -6.303, lng: 106.652 },
  Watsons: { lat: -6.3035, lng: 106.6525 },
  Apotek: { lat: -6.302, lng: 106.651 },
  Pharmacy: { lat: -6.302, lng: 106.651 },
  "91 District": { lat: -6.3045, lng: 106.6501 },
  Ruko: { lat: -6.304, lng: 106.6505 },
  Mall: { lat: -6.305, lng: 106.653 },
  Plaza: { lat: -6.3055, lng: 106.6535 },
};

function findBestCoordinates(address, locationName) {
  const searchText = (address + " " + locationName).toLowerCase();

  for (const [keyword, coords] of Object.entries(knownCoordinates)) {
    if (searchText.includes(keyword.toLowerCase())) {
      return coords;
    }
  }

  // Default to central BSD if no match found
  return { lat: -6.3017, lng: 106.6519 };
}

function updateCoordinatesForFile(filePath, fileType) {
  const data = JSON.parse(fs.readFileSync(filePath, "utf8"));
  let updatedCount = 0;

  for (const [providerKey, provider] of Object.entries(data.providers)) {
    for (const location of provider.locations) {
      if (!location.coordinates.lat && !location.coordinates.lng) {
        const coords = findBestCoordinates(
          location.address.en,
          location.name.en
        );
        location.coordinates = coords;
        console.log(`✓ ${location.name.en}: ${coords.lat}, ${coords.lng}`);
        updatedCount++;
      }
    }
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(
    `✓ All ${fileType} coordinates updated! (${updatedCount} locations)`
  );
}

function updateAllCoordinates() {
  const facilityFiles = [
    { path: "src/data/atm.json", type: "ATM" },
    { path: "src/data/pharmacy.json", type: "Pharmacy" },
    { path: "src/data/hospital.json", type: "Hospital" },
    { path: "src/data/gasStation.json", type: "Gas Station" },
    { path: "src/data/restaurant.json", type: "Restaurant" }
  ];

  facilityFiles.forEach(({ path, type }) => {
    try {
      console.log(`\n=== Updating ${type} Coordinates ===`);
      updateCoordinatesForFile(path, type);
    } catch (error) {
      console.log(`⚠️  Could not update ${type}: ${error.message}`);
    }
  });
  
  console.log("\n🎉 All coordinates have been updated!");
}updateAllCoordinates();
