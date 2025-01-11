import { Helmet } from "react-helmet";
import { CheckoutView } from "../sections/checkout/view/checkout-view";
import CheckoutProvider from "../contexts/checkout-context";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
        <meta name="description" content="Checkout" />
      </Helmet>

      <CheckoutProvider>
        <CheckoutView />
      </CheckoutProvider>
    </>
  );
}
