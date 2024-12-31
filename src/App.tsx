import "./App.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ThemeProviderWrapper } from "./contexts/themeContext";
import AppContent from "./AppContent";
import NavigationComponent from "./components/HomeComponent/NavigationComponent";
import FooterComponent from "./components/HomeComponent/FooterComponent";
import InstanceAxiosProvider from "./utils/instanceAxios";
import CartProvider from "./contexts/cartContext";
import AuthProvider from "./contexts/authContext";
const App = () => {
  return (
    <ThemeProviderWrapper>
      <RouterProvider
        router={createBrowserRouter([
          {
            path: "*",
            element: (
              <>
                <AuthProvider>
                  <InstanceAxiosProvider>
                    <CartProvider>
                      <NavigationComponent />
                      <AppContent />
                      <FooterComponent />
                    </CartProvider>
                  </InstanceAxiosProvider>
                </AuthProvider>
              </>
            ),
          },
        ])}
      />
    </ThemeProviderWrapper>
  );
};

export default App;
