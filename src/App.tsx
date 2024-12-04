import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProviderWrapper } from "./contexts/themeContext";
import AppContent from "./AppContent";


const App = () => {
  return (
    <ThemeProviderWrapper>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "*",
            element: <AppContent />,
          },
        ])}
      />
    </ThemeProviderWrapper>
  );
};

export default App;
