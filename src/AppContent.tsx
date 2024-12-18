import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { ROUTES_CONSTANT } from "./constants/routesConstants";
import CartPage from "./pages/CartPage";
import DetailPage from "./pages/DetailPage";
import FilterPage from "./pages/FilterPage";

const AppContent: React.FC = () => {
  const location = useLocation();
  return (
    <motion.div
      key={location.pathname}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Routes location={location}>
        <Route index path={ROUTES_CONSTANT.HOME_PAGE} element={<HomePage />} />
        <Route path={ROUTES_CONSTANT.CART_PAGE} element={<CartPage />} />
        <Route path={ROUTES_CONSTANT.ERROR_PAGE} element={<ErrorPage />} />
        <Route
          path={ROUTES_CONSTANT.DETAIL_PRODUCT_PAGE}
          element={<DetailPage />}
        />
        <Route path={ROUTES_CONSTANT.FILTER_PAGE} element={<FilterPage />} />
      </Routes>
    </motion.div>
  );
};

export default AppContent;
