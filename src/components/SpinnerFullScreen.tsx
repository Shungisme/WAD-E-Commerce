import ReactDOM from "react-dom";
import { CircularProgress, Box } from "@mui/material";

const SpinnerFullScreen = () => {
  return ReactDOM.createPortal(
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1300,
      }}
    >
      <CircularProgress size={60} thickness={5} color="primary" />
    </Box>,
    document.body
  );
};

export default SpinnerFullScreen;
