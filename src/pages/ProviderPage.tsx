import { useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  List,
  Box,
  Button,
} from "@mui/material";
import { LocationOn, AccessTime, Directions } from "@mui/icons-material";
import Header from "../components/header";
import { t, type Locale } from "../lib/i18n";
import facilitiesData from "../data/index";

export default function ProviderPage() {
  const {
    locale = "en",
    category = "",
    provider = "",
  } = useParams<{
    locale: Locale;
    category: string;
    provider: string;
  }>();

  // Get provider data
  const categoryData = facilitiesData[category as keyof typeof facilitiesData];
  if (!categoryData) {
    return (
      <>
        <Header showBack title="Not Found" />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography>Category not found</Typography>
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
        <Header showBack title="Not Found" />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography>Provider not found</Typography>
        </Container>
      </>
    );
  }

  return (
    <>
      <Header
        showBack
        title={providerData.name[locale as keyof typeof providerData.name]}
      />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t("locations", locale) || "Locations"}
        </Typography>

        <List sx={{ bgcolor: "background.paper" }}>
          {providerData.locations.map((location: any) => (
            <Card key={location.id} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" component="h2">
                  {location.name[locale as keyof typeof location.name]}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mb: 2 }}
                >
                  {location.address[locale as keyof typeof location.address]}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <LocationOn fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {t("distance", locale)}: {location.distance}
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <AccessTime fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {t("estimatedTime", locale)}: {location.estimatedTime}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    width: "100%",
                    height: "200px",
                    mb: 2,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://maps.google.com/maps?q=${location.coordinates.lat},${location.coordinates.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    title={`Map of ${
                      location.name[locale as keyof typeof location.name]
                    }`}
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  startIcon={<Directions />}
                  href={location.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("directions", locale)}
                </Button>
              </CardContent>
            </Card>
          ))}
        </List>
      </Container>
    </>
  );
}
