import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Chip,
} from "@mui/material";
import { LocationOn, AccessTime, Directions, Phone, Map } from "@mui/icons-material";
import Header from "../components/header";
import { t } from "../lib/i18n";
import type { Locale } from "../lib/i18n";
import facilitiesData from "../data/index";

export default function ProviderPage() {
  const {
    category = "",
    provider = "",
  } = useParams<{
    locale: Locale;
    category: string;
    provider: string;
  }>();

  const categoryData = facilitiesData[category as keyof typeof facilitiesData];
  if (!categoryData) {
    return (
      <>
        <Header showBack title="Tidak Ditemukan" />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography>Kategori tidak ditemukan</Typography>
        </Container>
      </>
    );
  }

  const providerData = categoryData.providers[
    provider as keyof typeof categoryData.providers
  ] as any;
  if (!providerData) {
    return (
      <>
        <Header showBack title="Tidak Ditemukan" />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography>Penyedia tidak ditemukan</Typography>
        </Container>
      </>
    );
  }

  const getLocalizedText = (textObj: any, fallback: string = "") => {
    if (!textObj) return fallback;
    if (typeof textObj === "string") return textObj;
    if (typeof textObj !== "object") return fallback;
    return textObj["id"] || textObj["en"] || Object.values(textObj)[0] || fallback;
  };

  return (
    <>
      <Header showBack title={getLocalizedText(providerData.name, "Provider")} />
      <Container maxWidth="sm" sx={{ pt: 2.5, pb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", letterSpacing: "0.1em", fontSize: "0.7rem", mb: 1.5, display: "block" }}
        >
          {t("locations")} · {providerData.locations.length} titik
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {providerData.locations.map((location: any) => (
            <Box
              key={location.id}
              sx={{
                borderRadius: "16px",
                border: "1.5px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                overflow: "hidden",
              }}
            >
              {/* Map embed with placeholder background */}
              <Box
                sx={{
                  width: "100%",
                  height: 180,
                  position: "relative",
                  bgcolor: "#e8eef5",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {/* Visible behind the iframe while it loads */}
                <Box sx={{
                  position: "absolute", inset: 0,
                  display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center", gap: 0.5,
                  pointerEvents: "none",
                }}>
                  <Map sx={{ fontSize: "2rem", color: "primary.light", opacity: 0.5 }} />
                  <Typography variant="caption" color="text.disabled">Memuat peta…</Typography>
                </Box>
                <iframe
                  width="100%"
                  height="100%"
                  style={{ border: 0, display: "block", position: "relative", zIndex: 1 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                  title={`Peta ${getLocalizedText(location.name, "Lokasi")}`}
                />
              </Box>

              {/* Content */}
              <Box sx={{ p: 2 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  sx={{ mb: 0.5, lineHeight: 1.35, fontSize: { xs: "0.95rem", sm: "1rem" } }}
                >
                  {getLocalizedText(location.name, "Lokasi")}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 1.5, lineHeight: 1.6, fontSize: "0.8rem" }}
                >
                  {getLocalizedText(location.address, "Alamat tidak tersedia")}
                </Typography>

                {/* Chips row — wraps on narrow screens */}
                <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: location.phone ? 1 : 1.5 }}>
                  {location.distance && (
                    <Chip
                      icon={<LocationOn sx={{ fontSize: "0.8rem !important" }} />}
                      label={location.distance}
                      size="small"
                      sx={{ bgcolor: "rgba(74,109,167,0.08)", color: "primary.dark", fontWeight: 600, fontSize: "0.7rem", height: 26 }}
                    />
                  )}
                  {location.estimatedTime && (
                    <Chip
                      icon={<AccessTime sx={{ fontSize: "0.8rem !important" }} />}
                      label={location.estimatedTime}
                      size="small"
                      sx={{ bgcolor: "rgba(74,109,167,0.08)", color: "primary.dark", fontWeight: 600, fontSize: "0.7rem", height: 26 }}
                    />
                  )}
                  {location.hours && (
                    <Chip
                      label={location.hours}
                      size="small"
                      sx={{
                        bgcolor: "rgba(0,0,0,0.04)",
                        color: "text.secondary",
                        fontSize: "0.68rem",
                        height: "auto",
                        py: 0.25,
                        "& .MuiChip-label": { whiteSpace: "normal", lineHeight: 1.4 },
                      }}
                    />
                  )}
                </Box>

                {/* Phone */}
                {location.phone && (
                  <Box
                    component="a"
                    href={`tel:${location.phone}`}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 0.75,
                      mb: 1.5,
                      textDecoration: "none",
                      color: "primary.main",
                      minHeight: 36,
                    }}
                  >
                    <Phone sx={{ fontSize: "1rem" }} />
                    <Typography variant="body2" fontWeight={500} sx={{ fontSize: "0.85rem" }}>
                      {location.phone}
                    </Typography>
                  </Box>
                )}

                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<Directions />}
                  href={location.mapUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  disabled={!location.mapUrl}
                  sx={{ borderRadius: "10px", fontWeight: 600, py: 1.25, fontSize: "0.9rem" }}
                >
                  {t("directions")}
                </Button>
              </Box>
            </Box>
          ))}
        </Box>
      </Container>
    </>
  );
}
