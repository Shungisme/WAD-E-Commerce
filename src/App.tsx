import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SwitchTransition, CSSTransition } from "react-transition-group";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";

const queryClient = new QueryClient();

const AppContent: React.FC = () => {
  const location = useLocation();

  return (
    <SwitchTransition>
      <CSSTransition
        key={location.pathname}
        timeout={300}
        classNames="page"
        unmountOnExit
      >
        <div className="page">
          <Routes location={location}>
            <Route index path="/" element={<HomePage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </div>
      </CSSTransition>
    </SwitchTransition>
  );
};

const App = () => {
  return (
    <RouterProvider
      router={createBrowserRouter([
        {
          path: "*",
          element: (
            <QueryClientProvider client={queryClient}>
              <AppContent />
              <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
          ),
        },
      ])}
    />
  );
};

export default App;
