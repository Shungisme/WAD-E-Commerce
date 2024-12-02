import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router";
import { motion } from "framer-motion"; // Import motion from framer-motion
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

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
        <Route index path="/" element={<HomePage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </motion.div>
  );
};

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "*",
          element: <AppContent />,
        },
      ])}
    />
  );
};

export default App;
