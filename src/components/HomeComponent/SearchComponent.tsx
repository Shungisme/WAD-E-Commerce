import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import IconifyIcon from "../iconifyIcon";
import TextBlockComponent from "../TextBlockComponent";
import { motion, AnimatePresence } from "framer-motion";

const SearchComponent = () => {
  const [isClicked, setIsClicked] = useState<boolean>(false);

  const containerVariants = {
    initial: {
      flexDirection: "column" as const,
      gap: 0,
    },
    clicked: {
      flexDirection: "row" as const,
      gap: 10,
    },
  };

  const textVariants = {
    initial: {
      opacity: 1,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <motion.div
      initial="initial"
      animate={isClicked ? "clicked" : "initial"}
      variants={containerVariants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      <IconifyIcon
        icon={"material-symbols-light:search"}
        fontSize={"1.5rem"}
        onClick={() => setIsClicked(!isClicked)}
      />

      <AnimatePresence>
        {!isClicked && (
          <motion.div
            initial="initial"
            exit="exit"
            variants={textVariants}
            transition={{ duration: 0.2 }}
          >
            <Typography fontSize={"0.8rem"}>Tìm kiếm</Typography>
          </motion.div>
        )}
      </AnimatePresence>

      {isClicked && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <TextBlockComponent label={"Tìm kiếm"} />
        </motion.div>
      )}
    </motion.div>
  );
};

export default SearchComponent;
