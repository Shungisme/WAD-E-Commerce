import {
  alpha,
  Box,
  LinearProgress,
  linearProgressClasses,
  useTheme,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { lazy, Suspense } from "react";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { AuthLayout } from "../layouts/auth/layout";
import { DashboardLayout } from "../layouts/dashboard/layout";
import { varAlpha } from "../theme/styles/utils";

export const SignInPage = lazy(() => import("../pages/sign-in"));
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
          element: <></>,
          index: true,
        },
        {
          path: "user",
          element: <></>,
        },
        {
          path: "products",
          element: <></>,
        },
        {
          path: "categories",
          element: <></>,
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
