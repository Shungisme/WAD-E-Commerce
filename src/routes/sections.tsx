import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AuthLayout } from "../layouts/auth/layout";
import { DashboardLayout } from "../layouts/dashboard/layout";
import { varAlpha } from "../theme/styles/utils";

export const HomePage = lazy(() => import("../pages/home-admin"));
export const AccountsPage = lazy(() => import("../pages/account"));
export const CategoriesPage = lazy(() => import("../pages/product-category"));
export const SignInPage = lazy(() => import("../pages/sign-in"));
export const ProductsPage = lazy(() => import("../pages/products-admin"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

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
  return useRoutes([
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
          element: <HomePage />,
          index: true,
        },
        {
          path: "accounts",
          element: <AccountsPage />,
        },
        {
          path: "products",
          element: <ProductsPage />,
        },
        {
          path: "categories",
          element: <CategoriesPage />,
        },
      ],
    },
    {
      path: "sign-in",
      element: (
        <AuthLayout>
          <SignInPage />
        </AuthLayout>
      ),
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
};