import { Box, Container, Paper, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { ParentCategory } from "../../../constants/categoryContants";
import { useNavigate } from "react-router-dom";

interface TProps {
  content: ParentCategory[];
}

const MegaMenuDropDownComponent = ({ content }: TProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const renderComponet = () => {
    return content.map((item,index) => {
      return (
        <>
          <Box key={index}>
            <Typography
              sx={{
                cursor: "pointer",
              }}
              mb={2}
              fontWeight={"bold"}
              letterSpacing={"1px"}
            >
              {item.parent}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {item.child.map((item,index) => {
                return (
                  <>
                    <Typography
                      key={index}
                      sx={{
                        transition: "all ease-in-out 0.1s",
                        fontSize: "0.85rem",
                        cursor: "pointer",
                        "&:hover": {
                          color: theme.palette.primary.main,
                          fontWeight: 500,
                        },
                      }}
                    >
                      {item.name}
                    </Typography>
                  </>
                );
              })}
            </Box>
          </Box>
        </>
      );
    });
  };

  return (
    <>
      <motion.div
        initial={{
          opacity: 0,
          y: -7,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -7,
        }}
        style={{
          position: "absolute",
          left: 0,
          width: "98.9vw",
          transform: "translateY(100%)",
          zIndex:2
        }}
      >
        <Paper
          sx={{
            mt: 1,
            padding: 2,
          }}
        >
          <Container maxWidth={"lg"}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "start",
              }}
            >
              {renderComponet()}
            </Box>
          </Container>
        </Paper>
      </motion.div>
    </>
  );
};

export default MegaMenuDropDownComponent;
