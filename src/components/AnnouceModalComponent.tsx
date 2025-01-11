import {
  Box,
  Modal,
  Stack,
  IconButton,
  Typography,
  Divider,
  Button,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import IconifyIcon from "./iconifyIcon";
import ReactDOM from "react-dom";

interface TProps {
  header: string;
  bodyContent: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  doOk: any;
  doCancel: any;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 40,
  borderRadius: "5px",
  p: 4,
};

const AnnouceModalComponent = (props: TProps) => {
  const { header, bodyContent, doCancel, doOk, open, setOpen } = props;

  const handleOnclose = () => setOpen(false);

  return ReactDOM.createPortal(
    <Modal
      open={open}
      onClose={handleOnclose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{ backdrop: { timeout: 500 } }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <IconButton onClick={handleOnclose}>
              <IconifyIcon fontSize={"1rem"} icon={"twemoji:cross-mark"} />
            </IconButton>
          </Box>
          <Stack direction={"column"} gap={2}>
            <Typography
              sx={{
                textTransform: "uppercase",
              }}
              fontSize={"1.5rem"}
              fontWeight={500}
              letterSpacing={3}
              textAlign={"center"}
            >
              {header}
            </Typography>
            <Divider />
            <Typography>{bodyContent}</Typography>
            <Divider />
            <Stack direction={"row"} justifyContent={"space-between"}>
              <Button onClick={doCancel} variant="contained">
                Thoát
              </Button>
              <Button onClick={doOk} variant="contained">
                Ok
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Fade>
    </Modal>,
    document.body
  );
};

export default AnnouceModalComponent;
