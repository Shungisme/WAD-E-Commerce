import { Alert, Snackbar, SnackbarCloseReason, useTheme } from "@mui/material";
import ReactDOM from "react-dom";

interface TProps {
  severity: "error" | "info" | "success" | "warning";
  content: string;
  open: boolean;
  setOpen: (open:boolean) => void
}

const SnackBarComponent = ({ open, setOpen, content, severity }: TProps) => {
  const theme = useTheme();

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return ReactDOM.createPortal(
    <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity}
        variant="filled"
        sx={{
          width: "100%",
          color: "white",
        }}
      >
        {content}
      </Alert>
    </Snackbar>,
    document.body
  );
};

export default SnackBarComponent;
