// Type guard for provider tuple
function isProviderTuple(item: unknown): item is [string, ProviderType] {
  return (
    Array.isArray(item) &&
    typeof item[0] === "string" &&
    typeof item[1] === "object" &&
    item[1] !== null
  );
}
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material";
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
  minDistance?: number;
};

export default function CategoryPage() {
  const { locale = "en", category = "" } = useParams<{
    locale: Locale;
    category: string;
  }>();
  const navigate = useNavigate();

  // Get category data
  const categoryData = facilitiesData[category as keyof typeof facilitiesData];

  if (!categoryData) {
    return (
      <>
        <Header showBack title={t("categories", locale)} />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography>Category not found</Typography>
        </Container>
      </>
    );
  }

  // Helper to parse distance string
  const parseDistance = (d: string) => {
    if (!d) return Number.POSITIVE_INFINITY;
    const kmMatch = d.match(/([\d.]+)\s*km/i);
    if (kmMatch) return parseFloat(kmMatch[1]);
    const mMatch = d.match(/([\d.]+)\s*m/i);
    if (mMatch) return parseFloat(mMatch[1]) / 1000;
    const minMatch = d.match(/([\d.]+)\s*min/i);
    if (minMatch) return parseFloat(minMatch[1]) + 1000;
    return Number.POSITIVE_INFINITY;
  };

  // Sort locations for each provider by distance, then sort providers by their closest location
  const unsortedProviders = Object.entries(categoryData.providers).map(
    ([providerId, provider]) => {
      if (typeof provider !== "object" || provider === null) return undefined;
      const p = provider as ProviderType;
      const sortedLocations = Array.isArray(p.locations)
        ? [...p.locations].sort(
            (a, b) => parseDistance(a.distance) - parseDistance(b.distance)
          )
        : p.locations;
      // Find the minimum distance for this provider
      const minDistance =
        Array.isArray(sortedLocations) && sortedLocations.length > 0
          ? parseDistance(sortedLocations[0].distance)
          : Number.POSITIVE_INFINITY;
      return [providerId, { ...p, locations: sortedLocations, minDistance }];
    }
  );

  const providers = unsortedProviders
    .filter(isProviderTuple)
    .sort((a, b) => a[1].minDistance - b[1].minDistance) as [
    string,
    ProviderType
  ][];

  // Helper function to get localized text with fallback
  const getLocalizedText = (textObj: any, fallback: string = "") => {
    if (!textObj || typeof textObj !== "object") return fallback;
    return (
      textObj[locale] ||
      textObj["en"] ||
      textObj["id"] ||
      Object.values(textObj)[0] ||
      fallback
    );
  };

  const handleProviderClick = (providerId: string) => {
    navigate(`/${locale}/${category}/${providerId}`);
  };

  return (
    <>
      <Header
        showBack
        title={getLocalizedText(categoryData.name, t("providers", locale))}
      />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t("providers", locale)}
        </Typography>

        <List sx={{ bgcolor: "background.paper" }}>
          {(providers as [string, ProviderType][]).map(
            ([providerId, provider], index) => (
              <div key={providerId}>
                <ListItemButton
                  onClick={() => handleProviderClick(providerId)}
                  alignItems="center"
                >
                  <ListItemAvatar>
                    <Avatar
                      alt={getLocalizedText(provider.name, "Provider")}
                      src={
                        provider.logo ||
                        "/placeholder.svg?height=40&width=40&query=logo"
                      }
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary={getLocalizedText(provider.name, "Provider")}
                    secondary={`${provider.locations.length} ${
                      t("locations", locale) || "locations"
                    }`}
                  />
                </ListItemButton>
                {index < providers.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </div>
            )
          )}
        </List>
      </Container>
    </>
  );
}
