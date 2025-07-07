import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { defaultLocale } from "./lib/i18n";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ProviderPage from "./pages/ProviderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Root redirect to default locale */}
        <Route
          path="/"
          element={<Navigate to={`/${defaultLocale}`} replace />}
        />

        {/* Locale-based routes */}
        <Route path="/:locale" element={<HomePage />} />
        <Route path="/:locale/:category" element={<CategoryPage />} />
        <Route path="/:locale/:category/:provider" element={<ProviderPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
