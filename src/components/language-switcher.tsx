import type React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Menu, MenuItem, Box } from "@mui/material";
import { Language } from "@mui/icons-material";
import { type Locale, locales } from "../lib/i18n";

export default function LanguageSwitcher() {
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const changeLanguage = (locale: Locale) => {
    // Get current path segments
    const segments = location.pathname.split("/");

    // Find if there's already a locale in the path
    const localeIndex = segments.findIndex((segment) =>
      locales.includes(segment as Locale)
    );

    // Replace or add the locale
    if (localeIndex !== -1) {
      segments[localeIndex] = locale;
    } else if (segments[1] === "") {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }

    // Navigate to the new path
    navigate(segments.join("/"));
    handleClose();
  };

  // Get current locale from path
  const getCurrentLocale = (): Locale => {
    const segments = location.pathname.split("/");
    const localeSegment = segments.find((segment) =>
      locales.includes(segment as Locale)
    );
    return (localeSegment as Locale) || "en";
  };

  const currentLocale = getCurrentLocale();

  // Language display names and flags
  const languageNames: Record<Locale, { name: string; flag: string }> = {
    en: { name: "English", flag: "🇬🇧" },
    id: { name: "Bahasa Indonesia", flag: "🇮🇩" },
    ja: { name: "日本語", flag: "🇯🇵" },
    ms: { name: "Bahasa Malaysia", flag: "🇲🇾" },
    my: { name: "မြန်မာဘာသာ", flag: "🇲🇲" },
    nl: { name: "Nederlands", flag: "🇳🇱" },
    fil: { name: "Filipino", flag: "🇵🇭" },
    "zh-tw": { name: "繁體中文", flag: "🇹🇼" },
    th: { name: "ไทย", flag: "🇹🇭" },
    us: { name: "English (US)", flag: "🇺🇸" },
    "pt-br": { name: "Português (Brasil)", flag: "🇧🇷" },
    "es-co": { name: "Español (Colombia)", flag: "🇨🇴" },
    hi: { name: "हिन्दी", flag: "🇮🇳" },
    it: { name: "Italiano", flag: "🇮🇹" },
    si: { name: "සිංහල", flag: "🇱🇰" },
  };

  return (
    <>
      <Button
        color="inherit"
        onClick={handleClick}
        startIcon={<Language sx={{ display: { xs: "none", sm: "inline" } }} />}
        sx={{
          minWidth: "auto",
          p: { xs: 0.5, sm: 1 },
          textTransform: "none",
          fontSize: { xs: "0.8rem", sm: "0.875rem" },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          <span style={{ fontSize: "1.1em" }}>
            {languageNames[currentLocale]?.flag}
          </span>
          <Box sx={{ display: { xs: "none", sm: "inline" } }}>
            {languageNames[currentLocale]?.name.split(" ")[0] || "English"}
          </Box>
        </Box>
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            sx: {
              maxHeight: { xs: 360, sm: 400 },
              width: { xs: "260px", sm: "280px" },
            },
          },
        }}
      >
        {locales.map((locale) => (
          <MenuItem
            key={locale}
            onClick={() => changeLanguage(locale)}
            selected={currentLocale === locale}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              py: { xs: 1.2, sm: 1.5 },
              px: { xs: 1.5, sm: 2 },
              fontSize: { xs: "0.85rem", sm: "0.9rem" },
            }}
          >
            <span style={{ fontSize: "1.2em", minWidth: "24px" }}>
              {languageNames[locale]?.flag}
            </span>
            <span style={{ flex: 1 }}>{languageNames[locale]?.name}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
