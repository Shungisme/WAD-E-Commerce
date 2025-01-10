import { createContext, ReactNode, useState } from "react";
import SnackBarComponent from "../components/SnackBarComponent";

interface SnackbarContextType {
  showSnackbar: (
    content: string,
    severity: "success" | "error" | "info" | "warning"
  ) => void;
}

export const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

interface TProps {
  children: ReactNode;
}

export const SnackbarProvider = ({ children }: TProps) => {
  const [snackbar, setSnackbar] = useState({
    open: false,
    content: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const showSnackbar = (
    content: string,
    severity: "success" | "error" | "info" | "warning"
  ) => {
    setSnackbar({ open: true, content, severity });
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <SnackBarComponent
        open={snackbar.open}
        setOpen={(open: boolean) => setSnackbar((prev) => ({ ...prev, open }))}
        content={snackbar.content}
        severity={snackbar.severity}
      />
    </SnackbarContext.Provider>
  );
};
