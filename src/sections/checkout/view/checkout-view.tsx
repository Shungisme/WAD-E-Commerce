import { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Grid,
  Alert,
  CircularProgress,
  Paper,
  Stack,
  IconButton,
  Badge,
  Container,
} from "@mui/material";
import { Refresh as RefreshIcon } from "@mui/icons-material";
import { formatCurrency, formatPercent } from "../../../utils/format-number";
import { RouterLink } from "../../../routes/components/router-link";
import { useCheckout } from "../../../hooks/use-checkout";

export type ProductItemInOrderProps = {
  productId: string;
  quantity: number;
  discount: number;
};

export type ProductItemProps = {
  productId: string;
  quantity: number;
  discount: number;
  price: number;
  thumbnail: string;
  title: string;
};

export type OrderItemProps = {
  _id: string;
  userId: string;
  products: ProductItemInOrderProps[];
  totalAmount: number;
  totalQuantity: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};

export type UserPaymentInfoProps = {
  id: string;
  balance: number;
};

export type CheckoutInfoProps = {
  order: OrderItemProps;
  products: ProductItemProps[];
  userPaymentInformation: UserPaymentInfoProps;
};

export const CheckoutView = () => {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const { createOrder, getOTP, checkoutOrder } = useCheckout();
  const [message, setMessage] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return (
      <Box sx={{ textAlign: "center", mb: 3 }}>
        <Typography
          component="span"
          sx={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: minutes < 1 ? "error.main" : "primary.main",
            animation:
              minutes < 1 && remainingSeconds < 10
                ? "blink 1s linear infinite"
                : "none",
          }}
        >
          {minutes}:{remainingSeconds.toString().padStart(2, "0")}
        </Typography>
        <style>
          {`
            @keyframes blink {
              50% { opacity: 0.5; }
            }
          `}
        </style>
      </Box>
    );
  };

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  useEffect(() => {
    if (resendTimer <= 0) {
      setResendDisabled(false);
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  const handleGetOtp = async () => {
    setIsLoading(true);
    try {
      await getOTP?.mutateAsync();
      setMessage("OTP sent successfully");
      setResendDisabled(true);
      setResendTimer(30);
    } catch (err) {
      setError("Failed to get OTP. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!otp) {
      setError("Please enter OTP");
      return;
    }

    setIsLoading(true);
    try {
      await checkoutOrder?.mutateAsync({
        orderId: createOrder?.data?.order?._id,
        otp,
      });
      setError("");
      setPaymentSuccess(true);
    } catch (err) {
      setError("Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (paymentSuccess) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 1 auto",
          marginTop: "20px",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }} color="success">
          You have successfully completed the payment!
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration-payment-success.svg"
          sx={{
            width: 320,
            height: "auto",
            mb: "20px",
          }}
        />

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
          color="primary"
        >
          Go to home
        </Button>
      </Container>
    );
  }

  if (timeLeft <= 0) {
    return (
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          flex: "1 1 auto",
          marginTop: "20px",
        }}
      >
        <Typography variant="h3" sx={{ mb: 2 }} color="error">
          Your session has expired!
        </Typography>

        <Box
          component="img"
          src="/assets/illustrations/illustration-expired.svg"
          sx={{
            width: 320,
            height: "auto",
            mb: "20px",
          }}
        />

        <Button
          component={RouterLink}
          href="/"
          size="large"
          variant="contained"
          color="primary"
        >
          Go to home
        </Button>
      </Container>
    );
  }

  const productItems = (
    <Box
      sx={{
        flexGrow: 1,
        overflow: "auto",
        p: 2,
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#f1f1f1",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "#888",
          borderRadius: "4px",
        },
      }}
    >
      {createOrder?.data?.products.map((product: any) => (
        <Card
          key={product.productId}
          sx={{
            mb: 2,
            transition: "transform 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          }}
        >
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={4}>
                <Badge
                  badgeContent={
                    product.discount ? formatPercent(product.discount) : 0
                  }
                  color="primary"
                  showZero={false}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  sx={{
                    "& .MuiBadge-badge": {
                      left: 23,
                      top: 15,
                    },
                  }}
                >
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    style={{
                      width: "100%",
                      height: "auto",
                      borderRadius: "8px",
                    }}
                  />
                </Badge>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="h6" fontWeight="bold">
                  {product.title}
                </Typography>
                <Typography color="text.secondary">
                  Quantity: {product.quantity}
                </Typography>
                <Typography color="primary" fontWeight="bold">
                  {formatCurrency(product.price)}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );

  const totalInfo = (
    <Box sx={{ p: 2, borderTop: 1, borderColor: "divider" }}>
      <Stack spacing={1}>
        <Typography variant="subtitle1">
          Total Quantity:{" "}
          <Typography component="span" fontWeight="bold">
            {createOrder?.data?.order.totalQuantity} items
          </Typography>
        </Typography>
        <Typography variant="h6" color="primary">
          Total Amount:{" "}
          <Typography component="span" fontWeight="bold">
            {formatCurrency(createOrder?.data?.order.totalAmount)}
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );

  const renderOtp = (
    <Box sx={{ mt: 3 }}>
      <TextField
        label="Enter OTP"
        variant="outlined"
        fullWidth
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleGetOtp}
              disabled={resendDisabled || isLoading}
              color="primary"
            >
              <RefreshIcon />
            </IconButton>
          ),
        }}
      />
      {resendDisabled && (
        <Typography variant="caption" color="text.secondary">
          Resend available in {resendTimer}s
        </Typography>
      )}
    </Box>
  );

  return (
    <>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        {formatTime(timeLeft)}
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper
              elevation={3}
              sx={{
                height: "600px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ p: 2, borderBottom: 1, borderColor: "divider" }}>
                <Typography variant="h6" fontWeight="bold">
                  Order Details
                </Typography>
              </Box>

              {productItems}
              {totalInfo}
            </Paper>
          </Grid>

          <Grid item xs={12} md={5}>
            <Paper
              elevation={3}
              sx={{
                height: "600px",
                p: 3,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Verification
              </Typography>

              {renderOtp}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              {!error && message && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  {message}
                </Alert>
              )}

              <Box sx={{ mt: "auto" }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  disabled={isLoading || !otp}
                  sx={{
                    height: "50px",
                    textTransform: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Complete Checkout"
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
