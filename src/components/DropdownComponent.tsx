import { Box, Card, useTheme } from "@mui/material";
import {  CSSProperties, ReactNode, useRef, useState } from "react";
import { motion } from "framer-motion";
import useClickOutSide from "../hooks/useClickOutSide";

interface TProps {
  children: ReactNode
  dropdownKey:string
  contentDrop?: JSX.Element,
  style?:CSSProperties ; 
}

const DropdownComponent = ({ children,contentDrop,dropdownKey,...rest }: TProps) => {  
  const theme = useTheme();
  const [clickDropDown, setClickDropDown] = useState<boolean>(false);
  const clickRef = useRef<HTMLDivElement | null>(null);
  useClickOutSide({
    elementRef: clickRef,
    callback: () => setClickDropDown(false),
  });


  return (
    <>
      <Box sx={{ position: "relative" }} ref={clickRef}>
        <Box
          onClick={() => {
            setClickDropDown(!clickDropDown);
          }}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            cursor: "pointer",
          }}
          
        >
          {children}
        </Box>
        <Card
        
          style={{
            visibility: clickDropDown ? "visible" : "hidden",
            opacity: clickDropDown ? 1 : 0,
            transform: clickDropDown ? "scale(1)" : "scale(0.9)",
            transition: "opacity 200ms ease-out, transform 300ms ease-in-out",
            zIndex: clickDropDown ? 2 : -9999,
          }}
          
          sx={{
            position: "absolute",
            right: 0,
            mt: 1,
            padding: "0.8rem 1rem",
            width: "25rem",
            textAlign: "center",
            overflow: "visible",
            "&::before": {
              content: '""',
              position: "absolute",
              top: "-10px",
              right: "20px",
              width: 0,
              height: 0,
              borderLeft: "10px solid transparent",
              borderRight: "10px solid transparent",
              borderBottom: "10px solid",
              color:
                theme.palette.mode === "dark"
                  ? theme.customColors.darkPaperBg
                  : theme.customColors.lightPaperBg,
            },
          }}
        > 
          <motion.div
            key={dropdownKey}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            {contentDrop}
          </motion.div>
        </Card>
      </Box>
    </>
  );
};

export default DropdownComponent;
