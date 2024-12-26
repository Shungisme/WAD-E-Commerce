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
import { useScrollToTop } from "./hooks/use-scroll-to-top";
import { Router } from "./routes/sections";
const App = () => {
  // return (
  //   <ThemeProviderWrapper>
  //     <RouterProvider
  //       router={createBrowserRouter([
  //         {
  //           path: "*",
  //           element: (
  //             <>
  //               <InstanceAxiosProvider>
  //                 <AuthProvider>
  //                   <CartProvider>
  //                     <NavigationComponent />
  //                       <AppContent />
  //                     <FooterComponent />
  //                   </CartProvider>
  //                 </AuthProvider>
  //               </InstanceAxiosProvider>
  //             </>
  //           ),
  //         },
  //       ])}
  //     />
  //   </ThemeProviderWrapper>
  // );
  useScrollToTop();

  return (
    <ThemeProviderWrapper>
      <Router />
    </ThemeProviderWrapper>
  );
};

export default App;
