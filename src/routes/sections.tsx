import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import { lazy, Suspense } from "react";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { AuthLayout } from "../layouts/auth/layout";
import { DashboardLayout } from "../layouts/dashboard/layout";
import { varAlpha } from "../theme/styles/utils";
import { ROUTES_ADMIN_CONSTANT } from "../constants/routesConstants";
import AuthProviderAdmin from "../contexts/auth-context-admin";
import InstanceAxiosProvider from "../utils/instanceAxios";
import AuthProvider from "../contexts/authContext";
import CartProvider from "../contexts/cartContext";
import NavigationComponent from "../components/HomeComponent/NavigationComponent";
import FooterComponent from "../components/HomeComponent/FooterComponent";
import AppContent from "../AppContent";
import AuthenticatedAxiosProvider from "../utils/authenticated-axios-provider";

export const HomePageAdmin = lazy(() => import("../pages/home-admin"));
export const AccountsPageAdmin = lazy(() => import("../pages/account"));
export const CategoriesPageAdmin = lazy(
  () => import("../pages/product-category")
);
export const SignInPageAdmin = lazy(() => import("../pages/sign-in"));
export const ProductsPageAdmin = lazy(() => import("../pages/products-admin"));
export const Page404 = lazy(() => import("../pages/page-not-found"));
export const CheckoutPage = lazy(() => import("../pages/checkout"));

const renderFallback = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flex="1 1 auto"
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) => varAlpha(theme.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: {
          bgcolor: "text.primary",
        },
      }}
    />
  </Box>
);

export const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/admin",
      element: (
        <AuthenticatedAxiosProvider>
          <AuthProviderAdmin>
            <Outlet />
          </AuthProviderAdmin>
        </AuthenticatedAxiosProvider>
      ),
      children: [
        {
          element: (
            <DashboardLayout>
              <Suspense fallback={renderFallback}>
                <Outlet />
              </Suspense>
            </DashboardLayout>
          ),
          children: [
            {
              element: <HomePageAdmin />,
              index: true,
            },
            {
              path: ROUTES_ADMIN_CONSTANT.ACCOUNTS,
              element: <AccountsPageAdmin />,
            },
            {
              path: ROUTES_ADMIN_CONSTANT.PRODUCTS,
              element: <ProductsPageAdmin />,
            },
            {
              path: ROUTES_ADMIN_CONSTANT.CATEGORIES,
              element: <CategoriesPageAdmin />,
            },
          ],
        },
        {
          path: ROUTES_ADMIN_CONSTANT.SIGN_IN,
          element: (
            <AuthLayout>
              <SignInPageAdmin />
            </AuthLayout>
          ),
        },
      ],
    },
    {
      path: "*",
      element: (
        <>
          <InstanceAxiosProvider>
            <AuthProvider>
              <CartProvider>
                <NavigationComponent />
                <AppContent />
                <FooterComponent />
              </CartProvider>
            </AuthProvider>
          </InstanceAxiosProvider>
        </>
      ),
    },
  ]);

  return <RouterProvider router={router}></RouterProvider>;
};
