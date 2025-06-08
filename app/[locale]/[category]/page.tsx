"use client"

import {
  Container,
  Typography,
  List,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
} from "@mui/material"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import { t, type Locale } from "@/lib/i18n"
import facilitiesData from "@/data/facilities.json"

export default function CategoryPage({
  params,
}: {
  params: { locale: Locale; category: string }
}) {
  const { locale, category } = params
  const router = useRouter()

  // Get category data
  const categoryData = facilitiesData[category as keyof typeof facilitiesData]

  if (!categoryData) {
    return (
      <>
        <Header showBack title={t("categories", locale)} />
        <Container maxWidth="sm" sx={{ py: 3 }}>
          <Typography>Category not found</Typography>
        </Container>
      </>
    )
  }

  const providers = Object.entries(categoryData.providers)

  const handleProviderClick = (providerId: string) => {
    router.push(`/${locale}/${category}/${providerId}`)
  }

  return (
    <>
      <Header showBack title={categoryData.name[locale as keyof typeof categoryData.name] || t("providers", locale)} />
      <Container maxWidth="sm" sx={{ py: 3 }}>
        <Typography variant="h5" component="h1" gutterBottom>
          {t("providers", locale)}
        </Typography>

        <List sx={{ bgcolor: "background.paper" }}>
          {providers.map(([providerId, provider], index) => (
            <div key={providerId}>
              <ListItemButton onClick={() => handleProviderClick(providerId)} alignItems="center">
                <ListItemAvatar>
                  <Avatar
                    alt={provider.name[locale as keyof typeof provider.name]}
                    src={provider.logo || "/placeholder.svg?height=40&width=40&query=logo"}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={provider.name[locale as keyof typeof provider.name]}
                  secondary={`${provider.locations.length} ${t("locations", locale) || "locations"}`}
                />
              </ListItemButton>
              {index < providers.length - 1 && <Divider variant="inset" component="li" />}
            </div>
          ))}
        </List>
      </Container>
    </>
  )
}
