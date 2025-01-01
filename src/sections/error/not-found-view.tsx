import { Box, Button, Container, Typography } from "@mui/material";
import { SimpleLayout } from "../../layouts/simple/layout";
import { RouterLink } from "../../routes/components/router-link";

export const NotFoundView = () => {
  return (
    <SimpleLayout content={{ compact: true }}>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 1 auto",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }}>
          Sorry, page not found!
        </Typography>

        <Typography sx={{ color: "text.secondary" }}>
          Sorry, we couldn’t find the page you’re looking for. Perhaps you’ve
          mistyped the URL? Be sure to check your spelling.
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration-404.svg"
          sx={{
            width: 320,
            height: "auto",
            my: { xs: 5, sm: 10 },
          }}
        />

        <Button
          component={RouterLink}
          href="/admin"
          size="large"
          variant="contained"
          color="inherit"
          // sx={{
          //   bgcolor: "info.main",
          // }}
        >
          Go to home
        </Button>
      </Container>
    </SimpleLayout>
  );
};
