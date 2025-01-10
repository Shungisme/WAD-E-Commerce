import { useContext } from "react";
import { CheckoutContext } from "../contexts/checkout-context";

export const useCheckout = () => {
  return useContext(CheckoutContext);
};
