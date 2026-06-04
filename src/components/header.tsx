import { AppBar, Toolbar, Typography, IconButton, Box, Chip } from "@mui/material";
import { ArrowBack, Home, LocationOn } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { t } from "../lib/i18n";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = false }: HeaderProps) {
  const navigate = useNavigate();

  if (showBack) {
    return (
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #4a6da7 0%, #2c4b8a 100%)",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(8px)",
        }}
      >
        <Toolbar sx={{ gap: 1, minHeight: { xs: 56, sm: 64 } }}>
          <IconButton
            edge="start"
            color="inherit"
            onClick={() => navigate(-1)}
            sx={{
              borderRadius: "12px",
              bgcolor: "rgba(255,255,255,0.15)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.25)" },
              transition: "background 0.2s",
              p: "8px",
            }}
          >
            <ArrowBack />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            fontWeight={600}
            sx={{
              fontSize: { xs: "1rem", sm: "1.15rem" },
              letterSpacing: "0.01em",
              flexGrow: 1,
            }}
          >
            {title}
          </Typography>
          <IconButton
            color="inherit"
            onClick={() => navigate("/id")}
            sx={{
              borderRadius: "12px",
              bgcolor: "rgba(255,255,255,0.1)",
              "&:hover": { bgcolor: "rgba(255,255,255,0.2)" },
              p: "8px",
            }}
          >
            <Home fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }

  // Home hero header
  return (
    <Box
      component="header"
      sx={{
        background: "linear-gradient(160deg, #5578b8 0%, #4a6da7 40%, #2c4b8a 100%)",
        boxShadow: "0 4px 24px rgba(44, 75, 138, 0.35)",
        pt: { xs: 3, sm: 4.5 },
        pb: { xs: 2.5, sm: 4 },
        px: { xs: 2.5, sm: 3 },
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* decorative circle */}
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: -60,
          right: -60,
          width: 220,
          height: 220,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.06)",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: -40,
          left: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          bgcolor: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />

      <Typography
        variant="overline"
        noWrap
        sx={{
          color: "rgba(255,255,255,0.65)",
          letterSpacing: "0.1em",
          fontSize: { xs: "0.62rem", sm: "0.7rem" },
          mb: 0.5,
          display: "block",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {t("appSubtitle")}
      </Typography>

      <Typography
        variant="h5"
        component="h1"
        fontWeight={700}
        sx={{
          color: "#fff",
          fontSize: { xs: "1.35rem", sm: "1.6rem" },
          lineHeight: 1.25,
          letterSpacing: "-0.01em",
          mb: 2,
        }}
      >
        {t("appTitle")}
      </Typography>

      <Chip
        icon={<LocationOn sx={{ fontSize: "0.95rem !important", color: "rgba(255,255,255,0.85) !important" }} />}
        label={t("location")}
        size="small"
        sx={{
          bgcolor: "rgba(255,255,255,0.14)",
          color: "rgba(255,255,255,0.9)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "8px",
          fontSize: "0.72rem",
          height: "auto",
          py: 0.5,
          "& .MuiChip-label": { whiteSpace: "normal", lineHeight: 1.4 },
          maxWidth: "100%",
        }}
      />
    </Box>
  );
}
