import {
  alpha,
  Box,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import type { Theme } from "@mui/material/styles";
import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import { AuthLayout } from "../layouts/auth/layout";

export const SignInPage = lazy(() => import("../pages/sign-in"));
export const Page404 = lazy(() => import("../pages/page-not-found"));

const renderFallback = ({ theme }: { theme: Theme }) => (
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
        bgcolor: alpha(theme.palette.text.primary, 0.16),
        [`& .${linearProgressClasses.bar}`]: {
          bgcolor: theme.palette.text.primary,
        },
      }}
    />
  </Box>
);

export const Router = () => {
  return useRoutes([
    {
      element: <></>,
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
