import { Helmet } from "react-helmet";
import { CheckoutView } from "../sections/checkout/view/checkout-view";
import CheckoutProvider from "../contexts/checkout-context";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Checkout</title>
        <meta name="description" content="Checkout" />
      </Helmet>

      <CheckoutProvider>
        <CheckoutView />
      </CheckoutProvider>
    </>
  );
}
