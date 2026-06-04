import { useNavigate } from "react-router-dom";
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
  CurrencyExchange,
  Build,
  Storefront,
  Hotel,
} from "@mui/icons-material";
import Header from "../components/header";
import { t } from "../lib/i18n";
import facilitiesData from "../data/index";

export default function HomePage() {
  const navigate = useNavigate();

  const categories = [
    { id: "atm", icon: <Atm fontSize="large" />, name: t("atm") },
    { id: "hospital", icon: <LocalHospital fontSize="large" />, name: t("hospital") },
    { id: "pharmacy", icon: <LocalPharmacy fontSize="large" />, name: t("pharmacy") },
    { id: "restaurant", icon: <Restaurant fontSize="large" />, name: t("restaurant") },
    { id: "gasStation", icon: <LocalGasStation fontSize="large" />, name: t("gasStation") },
    { id: "moneyChanger", icon: <CurrencyExchange fontSize="large" />, name: t("moneyChanger") },
    { id: "autoRepair", icon: <Build fontSize="large" />, name: t("autoRepair") },
    { id: "shoppingCenter", icon: <Storefront fontSize="large" />, name: t("shoppingCenter") },
    { id: "hotel", icon: <Hotel fontSize="large" />, name: t("hotel") },
  ];

  const navigateToCategory = (categoryId: string) => {
    if (facilitiesData[categoryId as keyof typeof facilitiesData]) {
      navigate(`/id/${categoryId}`);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Paper
          elevation={1}
          sx={{ p: 2, mb: 3, bgcolor: "primary.main", color: "white" }}
        >
          <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
            <LocationOn sx={{ mt: 0.5, flexShrink: 0 }} />
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 0.5 }}>
                {t("appSubtitle")}
              </Typography>
              <Typography
                variant="body2"
                sx={{ opacity: 0.9, lineHeight: 1.4 }}
              >
                {t("location")}
              </Typography>
            </Box>
          </Box>
        </Paper>

        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
          {t("categories")}
        </Typography>
        <Grid container spacing={2}>
          {categories.map((category) => (
            <Grid size={{ xs: 6, sm: 4 }} key={category.id}>
              <Card
                elevation={2}
                sx={{
                  height: 120,
                  opacity: facilitiesData[category.id as keyof typeof facilitiesData] ? 1 : 0.5,
                  transition: "all 0.2s ease-in-out",
                  "&:hover": { elevation: 4, transform: "translateY(-2px)" },
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
                  disabled={!facilitiesData[category.id as keyof typeof facilitiesData]}
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
