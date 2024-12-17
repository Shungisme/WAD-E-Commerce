import { CircularProgress, Box } from "@mui/material";

const SpinnerInComponent = () => {
  return (
    <Box>
      (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1300,
        }}
      >
        <CircularProgress size={60} thickness={5} color="primary" />
      </Box>
      )
    </Box>
  );
};

export default SpinnerInComponent;
