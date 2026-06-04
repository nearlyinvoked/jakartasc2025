import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import { ArrowBack, Home } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { t } from "../lib/i18n";

interface HeaderProps {
  title?: string;
  showBack?: boolean;
}

export default function Header({ title, showBack = false }: HeaderProps) {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/id");
  };

  return (
    <AppBar position="sticky">
      <Toolbar>
        {showBack ? (
          <IconButton
            edge="start"
            color="inherit"
            onClick={goBack}
            sx={{ mr: 2 }}
          >
            <ArrowBack />
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            onClick={goHome}
            sx={{ mr: 2 }}
          >
            <Home />
          </IconButton>
        )}
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            {title || t("appTitle")}
          </Typography>
          {!title && (
            <Typography
              variant="caption"
              component="div"
              sx={{ opacity: 0.8, fontSize: "0.75rem" }}
            >
              {t("appSubtitle")}
            </Typography>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
