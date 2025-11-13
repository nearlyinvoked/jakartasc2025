export type Locale = "en" | "id";

export const locales: Locale[] = ["en", "id"];

export const defaultLocale: Locale = "en";

export const getLocaleFromPath = (path: string): Locale => {
  const segments = path.split("/");
  const localeSegment = segments.find((segment) =>
    locales.includes(segment as Locale)
  );
  return (localeSegment as Locale) || defaultLocale;
};

export const translations = {
  en: {
    appTitle: "Public Facilities Around ICE BSD",
    appSubtitle: "ICE BSD International Convention Exhibition",
    location:
      "ICE BSD, Jl. BSD Grand Boulevard No.1, Pagedangan, Tangerang, Banten 15339",
    home: "Home",
    back: "Back",
    categories: "Categories",
    providers: "Providers",
    details: "Details",
    distance: "Distance",
    estimatedTime: "Estimated Time",
    directions: "Get Directions",
    locations: "Locations",
    atm: "ATM",
    hospital: "Hospital",
    pharmacy: "Pharmacy",
    restaurant: "Restaurant",
    gasStation: "Gas Station",
    moneyChanger: "Money Changer",
    autoRepair: "Auto Repair",
  },
  id: {
    appTitle: "Fasilitas Umum Sekitar ICE BSD",
    appSubtitle: "ICE BSD International Convention Exhibition",
    location:
      "ICE BSD, Jl. BSD Grand Boulevard No.1, Pagedangan, Tangerang, Banten 15339",
    home: "Beranda",
    back: "Kembali",
    categories: "Kategori",
    providers: "Penyedia",
    details: "Detail",
    distance: "Jarak",
    estimatedTime: "Waktu Perkiraan",
    directions: "Petunjuk Arah",
    locations: "Lokasi",
    atm: "ATM",
    hospital: "Rumah Sakit",
    pharmacy: "Apotek",
    restaurant: "Restoran",
    gasStation: "SPBU",
    moneyChanger: "Money Changer",
    autoRepair: "Bengkel Mobil",
  },
};

export const t = (key: string, locale: Locale = defaultLocale): string => {
  return (
    translations[locale][key as keyof (typeof translations)[typeof locale]] ||
    key
  );
};
