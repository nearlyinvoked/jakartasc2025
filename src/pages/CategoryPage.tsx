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

  const providers = Object.entries(categoryData.providers);

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
          {providers.map(([providerId, provider], index) => (
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
          ))}
        </List>
      </Container>
    </>
  );
}
