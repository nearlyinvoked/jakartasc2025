import { useNavigate } from "react-router-dom";
import {
  Container,
  Grid,
  Card,
  CardActionArea,
  Typography,
  Box,
} from "@mui/material";
import {
  Atm,
  LocalHospital,
  LocalPharmacy,
  Restaurant,
  LocalGasStation,
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
    { id: "atm", icon: <Atm />, name: t("atm") },
    { id: "hospital", icon: <LocalHospital />, name: t("hospital") },
    { id: "pharmacy", icon: <LocalPharmacy />, name: t("pharmacy") },
    { id: "restaurant", icon: <Restaurant />, name: t("restaurant") },
    { id: "gasStation", icon: <LocalGasStation />, name: t("gasStation") },
    { id: "moneyChanger", icon: <CurrencyExchange />, name: t("moneyChanger") },
    { id: "autoRepair", icon: <Build />, name: t("autoRepair") },
    { id: "shoppingCenter", icon: <Storefront />, name: t("shoppingCenter") },
    { id: "hotel", icon: <Hotel />, name: t("hotel") },
  ];

  const navigateToCategory = (categoryId: string) => {
    if (facilitiesData[categoryId as keyof typeof facilitiesData]) {
      navigate(`/id/${categoryId}`);
    }
  };

  return (
    <>
      <Header />
      <Container maxWidth="sm" sx={{ pt: 3, pb: 5 }}>
        <Typography
          variant="overline"
          sx={{
            color: "text.secondary",
            letterSpacing: "0.1em",
            fontSize: "0.7rem",
            mb: 1.5,
            display: "block",
          }}
        >
          {t("categories")}
        </Typography>

        <Grid container spacing={1.5}>
          {categories.map((category) => {
            const available = !!facilitiesData[category.id as keyof typeof facilitiesData];
            return (
              <Grid size={{ xs: 4, sm: 3 }} key={category.id}>
                <Card
                  elevation={0}
                  sx={{
                    borderRadius: "16px",
                    border: "1.5px solid",
                    borderColor: "divider",
                    opacity: available ? 1 : 0.4,
                    transition: "all 0.18s ease",
                    WebkitTapHighlightColor: "transparent",
                    "&:active": available ? { transform: "scale(0.96)" } : {},
                  }}
                >
                  <CardActionArea
                    sx={{
                      height: { xs: 96, sm: 112 },
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                      gap: 0.75,
                      borderRadius: "16px",
                      p: 1,
                    }}
                    onClick={() => navigateToCategory(category.id)}
                    disabled={!available}
                  >
                    <Box
                      sx={{
                        width: { xs: 40, sm: 44 },
                        height: { xs: 40, sm: 44 },
                        borderRadius: "12px",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        flexShrink: 0,
                      }}
                    >
                      {category.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      align="center"
                      sx={{
                        fontWeight: 600,
                        lineHeight: 1.2,
                        color: "text.primary",
                        fontSize: { xs: "0.65rem", sm: "0.7rem" },
                        px: 0.5,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {category.name}
                    </Typography>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </>
  );
}
