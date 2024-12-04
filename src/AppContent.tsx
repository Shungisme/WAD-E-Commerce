// AppContent.tsx
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { ROUTES_CONSTANT } from "./constants/routesConstants";

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
        <Route path={ROUTES_CONSTANT.ERROR_PAGE} element={<ErrorPage />} />
      </Routes>
    </motion.div>
  );
};

export default AppContent;
