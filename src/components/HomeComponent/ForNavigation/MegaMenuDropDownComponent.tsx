import { Box, Container, Paper, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { slugify } from "../../../utils/slugify";

interface TProps {
  content: any;
}

const MegaMenuDropDownComponent = ({ content }: TProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const renderComponet = () => {
    return content?.megaMenuTitle?.map((item: any, index: any) => {
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
              component={"div"}
              onClick={() => navigate(`/filter?content=${slugify(item[0])}`)}
            >
              {item[0]}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              {item[1].map((item: any, index: any) => {
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
                      component={"div"}
                      onClick={() =>
                        navigate(`/filter?content=${slugify(item)}`)
                      }
                    >
                      {item}
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
          zIndex: 2,
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
