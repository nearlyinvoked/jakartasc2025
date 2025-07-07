import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  Typography,
  Box,
  Paper,
} from "@mui/material";
import {
  Atm,
  LocalHospital,
  LocalPharmacy,
  Restaurant,
  LocalGasStation,
  LocationOn,
} from "@mui/icons-material";
import Header from "../components/header";
import { t, type Locale } from "../lib/i18n";
import facilitiesData from "../data/facilities.json";

export default function HomePage() {
  const { locale = "en" } = useParams<{ locale: Locale }>();
  const navigate = useNavigate();

  const categories = [
    { id: "atm", icon: <Atm fontSize="large" />, name: t("atm", locale) },
    {
      id: "hospital",
      icon: <LocalHospital fontSize="large" />,
      name: t("hospital", locale),
    },
    {
      id: "pharmacy",
      icon: <LocalPharmacy fontSize="large" />,
      name: t("pharmacy", locale),
    },
    {
      id: "restaurant",
      icon: <Restaurant fontSize="large" />,
      name: t("restaurant", locale),
    },
    {
      id: "gasStation",
      icon: <LocalGasStation fontSize="large" />,
      name: t("gasStation", locale),
    },
  ];

  const navigateToCategory = (categoryId: string) => {
    if (facilitiesData[categoryId as keyof typeof facilitiesData]) {
      navigate(`/${locale}/${categoryId}`);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        {/* Location Info */}
        <Paper
          elevation={1}
          sx={{ p: 2, mb: 3, bgcolor: "primary.main", color: "white" }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <LocationOn sx={{ mt: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {t("appSubtitle", locale)}
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, lineHeight: 1.4 }}
              >
                {t("location", locale)}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
          {t("categories", locale)}
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid size={{ xs: 6, sm: 4 }} key={category.id}>
              <Card
                elevation={2}
                sx={{
                  height: 120,
                  opacity: facilitiesData[
                    category.id as keyof typeof facilitiesData
                  ]
                    ? 1
                    : 0.5,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    elevation: 4,
                    transform: "translateY(-2px)",
                  },
                }}
              >
                <CardActionArea
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    p: 2,
                    gap: 1,
                  }}
                  onClick={() => navigateToCategory(category.id)}
                  disabled={
                    !facilitiesData[category.id as keyof typeof facilitiesData]
                  }
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "primary.main",
                      minHeight: 48,
                    }}
                  >
                    {category.icon}
                  </Box>
                  <Typography
                    variant="subtitle2"
                    align="center"
                    sx={{
                      fontWeight: 500,
                      lineHeight: 1.2,
                      minHeight: 32,
                      display: "flex",
                      alignItems: "center",
                      textAlign: "center",
                    }}
                  >
                    {category.name}
                  </Typography>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
