export type Locale = "id";

export const locales: Locale[] = ["id"];

export const defaultLocale: Locale = "id";

export const getLocaleFromPath = (_path: string): Locale => "id";

export const translations = {
  id: {
    appTitle: "Pertemuan Regional Jakarta",
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
    hospital: "Rumah Sakit & Klinik",
    pharmacy: "Apotek / Farmasi",
    restaurant: "Restoran",
    gasStation: "SPBU & SPKLU",
    moneyChanger: "Money Changer",
    autoRepair: "Bengkel / Auto Repair",
    shoppingCenter: "Pusat Perbelanjaan",
    hotel: "Hotel",
  },
};

export const t = (key: string, _locale: Locale = "id"): string => {
  return (
    translations.id[key as keyof (typeof translations)["id"]] || key
  );
};
