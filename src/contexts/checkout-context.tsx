import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { ReactNode, createContext } from "react";
import { useAuth } from "../hooks/useAuth";
import { getOtpApi, postCheckoutApi, postOrderApi } from "../services/order";
import { clearCartInLocalStorage } from "../utils/localStorage";

interface Props {
  children: ReactNode;
}

interface CheckoutProps {
  orderId: string;
  otp: string;
  address: string;
  phoneNumber: string;
}

interface CheckoutContextType {
  createOrder: UseQueryResult<any, Error> | null;
  getOTP: UseMutationResult<any, Error, void, unknown> | null;
  checkoutOrder: UseMutationResult<any, Error, CheckoutProps, unknown> | null;
}

const initialize: CheckoutContextType = {
  createOrder: null,
  getOTP: null,
  checkoutOrder: null,
};

export const CheckoutContext = createContext<CheckoutContextType>(initialize);

export default function CheckoutProvider({ children }: Props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const createOrder = useQuery({
    queryKey: ["create-order", user?._id],
    queryFn: async () => {
      try {
        const response = await postOrderApi();
        clearCartInLocalStorage();
        queryClient.invalidateQueries({ queryKey: ["get-cart", user?._id] });
        return response;
      } catch (error) {
        console.log("error at createOrder in checkout context");
        throw error;
      }
    },
  });

  const getOTP = useMutation({
    mutationKey: ["get-otp", user?._id],
    mutationFn: async () => {
      try {
        const response = await getOtpApi();
        return response;
      } catch (error) {
        console.log("error at getOTP in checkout context");
        throw error;
      }
    },
  });

  const checkoutOrder = useMutation({
    mutationKey: ["checkout-order", user?._id],
    mutationFn: async (checkout: CheckoutProps) => {
      try {
        const response = await postCheckoutApi(checkout);
        return response;
      } catch (error) {
        console.log("error at checkoutOrder in checkout context");
        throw error;
      }
    },
  });

  return (
    <CheckoutContext.Provider value={{ createOrder, getOTP, checkoutOrder }}>
      {children}
    </CheckoutContext.Provider>
  );
}
