import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { Divider, IconButton } from "@mui/material";
import IconifyIcon from "./iconifyIcon";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "5px",
  boxShadow: 24,
  p: 4,
};

interface TProps {
  children: React.ReactNode;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalComponent = ({ children, open, setOpen }: TProps) => {
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Box display={"flex"} justifyContent={"right"}>
                <IconButton onClick={() => setOpen(false)}>
                    <IconifyIcon icon={"streamline:delete-1-solid"} color="red"/>
                </IconButton>
            </Box>
            {children}
        </Box>
      </Modal>
    </div>
  );
};

export default ModalComponent;
