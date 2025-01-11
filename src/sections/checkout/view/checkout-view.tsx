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
  Snackbar,
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
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
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
      setMessage("OTP đã được gửi. Vui lòng kiểm tra email.");
      setResendDisabled(true);
      setResendTimer(30);
    } catch (err) {
      setError("Lấy OTP thất bại. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!otp) {
      setError("Vui lòng nhập OTP.");
      return;
    }
    if (!address) {
      setError("Vui lòng nhập địa chỉ.");
      return;
    }
    if (!phoneNumber) {
      setError("Vui lòng nhập số điện thoại.");
      return;
    }
    if (
      !RegExp(
        /^(?:\+84|0)(?:3[2-9]|5[6|8|9]|7[0|6-9]|8[1-5]|9[0-9])[0-9]{7}$/
      ).test(phoneNumber)
    ) {
      setError("Vui lòng nhập số điện thoại hợp lệ.");
      return;
    }

    setIsLoading(true);
    try {
      await checkoutOrder?.mutateAsync({
        orderId: createOrder?.data?.order?._id,
        otp,
        address,
        phoneNumber,
      });
      setError("");
      setPaymentSuccess(true);
    } catch (err) {
      setError("Thanh toán thất bại. Vui lòng thử lại.");
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
          Bạn đã thanh toán thành công!!!
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
          Về trang chủ
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
          Phiên thanh toán đã hết hạn!!!
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
          Về trang chủ
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
                  Số lượng: {product.quantity}
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
          Tổng số lượng: &nbsp;
          <Typography component="span" fontWeight="bold">
            {createOrder?.data?.order.totalQuantity} sản phẩm
          </Typography>
        </Typography>
        <Typography variant="h6" color="primary">
          Tổng giá trị: &nbsp;
          <Typography component="span" fontWeight="bold">
            {formatCurrency(createOrder?.data?.order.totalAmount)}
          </Typography>
        </Typography>
      </Stack>
    </Box>
  );

  const renderOtp = (
    <Box sx={{ mt: 1, mb: 2 }}>
      <TextField
        label="Nhập OTP"
        variant="outlined"
        fullWidth
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
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
          Gửi lại sau {resendTimer}s
        </Typography>
      )}
    </Box>
  );

  const renderInputAddress = (
    <Box sx={{ mt: 1 }}>
      <TextField
        label="Nhập địa chỉ"
        variant="outlined"
        fullWidth
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );

  const renderPhoneNumber = (
    <Box sx={{ mt: 1 }}>
      <TextField
        label="Nhập số điện thoại"
        variant="outlined"
        fullWidth
        value={phoneNumber}
        type="number"
        onChange={(e) => setPhoneNumber(e.target.value)}
        sx={{ mb: 2 }}
      />
    </Box>
  );

  const accountBalance = (
    <Box sx={{ textAlign: "center" }}>
      <Typography
        fontWeight="bold"
        color="primary"
        fontSize="1.5rem"
        sx={{ mb: 3 }}
      >
        Số dư: &nbsp;
        {formatCurrency(createOrder?.data?.userPaymentInformation?.balance, {
          notation: "compact",
        }).replace(/[A-Z]/g, (match) => match.toLowerCase())}
      </Typography>
    </Box>
  );

  return (
    <>
      <Box sx={{ maxWidth: 1200, mx: "auto", p: 2 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            alignItems: "center",
          }}
        >
          {formatTime(timeLeft)}
          {accountBalance}
        </Box>

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
                  Chi tiết đơn hàng
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
                Xác minh
              </Typography>

              {renderOtp}

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Địa chỉ
              </Typography>
              {renderInputAddress}

              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Số điện thoại
              </Typography>
              {renderPhoneNumber}

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}

              <Box sx={{ mt: "auto" }}>
                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  onClick={handleCheckout}
                  disabled={isLoading || !otp || !address || !phoneNumber}
                  sx={{
                    height: "50px",
                    textTransform: "none",
                    fontSize: "1.1rem",
                  }}
                >
                  {isLoading ? (
                    <CircularProgress size={24} />
                  ) : (
                    "Hoàn tất thanh toán"
                  )}
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>

      <Snackbar
        open={!!message}
        autoHideDuration={3000}
        onClose={() => setMessage("")}
      >
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      </Snackbar>
    </>
  );
};
