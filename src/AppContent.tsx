import React, { lazy, Suspense, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorPage from "./pages/ErrorPage";
import { ROUTES_CONSTANT } from "./constants/routesConstants";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import FilterPage from "./pages/FilterPage";
import GoogleReturnPage from "./pages/GoogleReturnPage";
import { renderFallback } from "./routes/sections";
import { CheckoutPage } from "./routes/sections";

const HomePage = lazy(() => import("./pages/HomePage"));

const AppContent: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Routes location={location}>
        <Route
          index
          path={ROUTES_CONSTANT.HOME_PAGE}
          element={
            <Suspense fallback={renderFallback}>
              <HomePage />
            </Suspense>
          }
        />
        <Route path={ROUTES_CONSTANT.CART_PAGE} element={<CartPage />} />
        <Route path={ROUTES_CONSTANT.ERROR_PAGE} element={<ErrorPage />} />
        <Route
          path={ROUTES_CONSTANT.DETAIL_PRODUCT_PAGE}
          element={<DetailPage />}
        />
        <Route path={ROUTES_CONSTANT.FILTER_PAGE} element={<FilterPage />} />
        <Route
          path={ROUTES_CONSTANT.GOOGLE_RETURN}
          element={<GoogleReturnPage />}
        />
        <Route path={ROUTES_CONSTANT.CHECKOUT} element={<CheckoutPage />} />
      </Routes>
    </motion.div>
  );
};

export default AppContent;
