import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Chip,
} from "@mui/material";
import { ChevronRight, Place } from "@mui/icons-material";
import Header from "../components/header";
import { t, type Locale } from "../lib/i18n";
import facilitiesData from "../data/index";

type ProviderType = {
  name: any;
  logo?: string;
  locations: Array<{
    id: string;
    name: any;
    address: any;
    coordinates: { lat: number; lng: number };
    distance: string;
    estimatedTime: string;
    mapUrl: string;
  }>;
  minDistance: number;
};

export default function CategoryPage() {
  const { locale = "id", category = "" } = useParams<{
    locale: Locale;
    category: string;
  }>();
  const navigate = useNavigate();

  const categoryData = facilitiesData[category as keyof typeof facilitiesData];

  if (!categoryData) {
    return (
      <>
        <Header showBack title={t("categories")} />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography>Kategori tidak ditemukan</Typography>
        </Container>
      </>
    );
  }

  const parseDistance = (d: string) => {
    if (!d) return Number.POSITIVE_INFINITY;
    const kmMatch = d.match(/([\d.,]+)\s*km/i);
    if (kmMatch) return parseFloat(kmMatch[1].replace(",", "."));
    const mMatch = d.match(/([\d.]+)\s*m/i);
    if (mMatch) return parseFloat(mMatch[1]) / 1000;
    return Number.POSITIVE_INFINITY;
  };

  const getLocalizedText = (textObj: any, fallback: string = "") => {
    if (!textObj) return fallback;
    if (typeof textObj === "string") return textObj;
    if (typeof textObj !== "object") return fallback;
    return textObj["id"] || textObj["en"] || Object.values(textObj)[0] || fallback;
  };

  const providers: [string, ProviderType][] = Object.entries(categoryData.providers)
    .reduce((acc: [string, ProviderType][], [providerId, provider]) => {
      if (typeof provider !== "object" || provider === null) return acc;
      const p = provider as ProviderType;
      const sortedLocations = Array.isArray(p.locations)
        ? [...p.locations].sort((a, b) => parseDistance(a.distance) - parseDistance(b.distance))
        : p.locations;
      const minDistance =
        Array.isArray(sortedLocations) && sortedLocations.length > 0
          ? parseDistance(sortedLocations[0].distance)
          : Number.POSITIVE_INFINITY;
      acc.push([providerId, { ...p, locations: sortedLocations, minDistance }]);
      return acc;
    }, [])
    .sort((a, b) => a[1].minDistance - b[1].minDistance);

  return (
    <>
      <Header showBack title={getLocalizedText(categoryData.name, t("providers"))} />
      <Container maxWidth="sm" sx={{ pt: 2.5, pb: 4 }}>
        <Typography
          variant="overline"
          sx={{ color: "text.secondary", letterSpacing: "0.1em", fontSize: "0.7rem", mb: 1.5, display: "block" }}
        >
          {t("providers")} · {providers.length} tersedia
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {providers.map(([providerId, provider]) => {
            const closestDist = provider.locations[0]?.distance;
            const name = getLocalizedText(provider.name, "Provider");
            return (
              <Box
                key={providerId}
                onClick={() => navigate(`/${locale}/${category}/${providerId}`)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  p: 1.5,
                  minHeight: 64,
                  borderRadius: "14px",
                  border: "1.5px solid",
                  borderColor: "divider",
                  bgcolor: "background.paper",
                  cursor: "pointer",
                  WebkitTapHighlightColor: "transparent",
                  transition: "all 0.15s ease",
                  "&:active": {
                    bgcolor: "rgba(74,109,167,0.05)",
                    transform: "scale(0.99)",
                  },
                }}
              >
                <Avatar
                  alt={name}
                  src={provider.logo}
                  sx={{
                    width: 44,
                    height: 44,
                    bgcolor: "primary.main",
                    fontSize: "1rem",
                    fontWeight: 700,
                    flexShrink: 0,
                  }}
                >
                  {name.charAt(0).toUpperCase()}
                </Avatar>

                {/* Name + sub — takes all remaining space, clips via overflow */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: "text.primary",
                      lineHeight: 1.3,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {name}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 0.25 }}>
                    <Place sx={{ fontSize: "0.75rem", color: "text.disabled" }} />
                    <Typography variant="caption" color="text.secondary" sx={{ fontSize: "0.7rem" }}>
                      {provider.locations.length} {t("locations")}
                    </Typography>
                  </Box>
                </Box>

                {/* Distance badge — fixed width so it never squeezes the name */}
                {closestDist && (
                  <Chip
                    label={closestDist}
                    size="small"
                    sx={{
                      bgcolor: "rgba(74,109,167,0.08)",
                      color: "primary.dark",
                      fontWeight: 600,
                      fontSize: "0.68rem",
                      height: 22,
                      flexShrink: 0,
                      maxWidth: 70,
                      "& .MuiChip-label": { px: 0.75 },
                    }}
                  />
                )}

                <ChevronRight sx={{ color: "text.disabled", flexShrink: 0, fontSize: "1.2rem" }} />
              </Box>
            );
          })}
        </Box>
      </Container>
    </>
  );
}
