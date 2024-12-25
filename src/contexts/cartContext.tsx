import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { createContext, ReactNode, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProductInCartById, updateCart } from "../services/cart";
import { totalPrice } from "../utils/totalPrice";

interface TProps {
  children: ReactNode;
}

interface TDefault {
  myCart: UseQueryResult<any, Error> | null;
  changeDataInCart: UseMutationResult<
    any,
    Error,
    {
      userId: string;
      products?: any;
    },
    any
  > | null;
  totalMoney: number;
  setTotalMoney:React.Dispatch<React.SetStateAction<number>>;
  handleChangeQuantity:(productItem: any, status: "inscrese" | "descrease" | "input", input?: number) => Promise<void>;
  handleDelete: (productItem: any) => Promise<void>
}

const defaultValue: TDefault = {
  myCart: null,
  changeDataInCart: null,
  totalMoney: 0,
  setTotalMoney: () => {},
  handleChangeQuantity: async (productItem: any, status: string) => {},
  handleDelete: async  (productItem: any) => {}
};

export const cartContext = createContext(defaultValue);

const CartProvider = ({ children }: TProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [totalMoney, setTotalMoney] = useState<number>(0);

  

  const myCart = useQuery({
    queryKey: ["get-cart", user?._id],
    queryFn: async () => {
      const response = await getProductInCartById(String(user?._id));
      setTotalMoney(totalPrice(response?.cart?.products));
      return response?.cart;
    },
    enabled: !!user?._id,
  });

  const changeDataInCart = useMutation({
    mutationKey: ["change-quantity"],
    mutationFn: async ({
      userId,
      products,
    }: {
      userId: string;
      products?: any;
    }) => {
      const response = await updateCart(userId, products);
      return response;
    },
    onMutate: ({ userId, products }) => {
      queryClient.cancelQueries({ queryKey: ["get-cart", user?._id] });
      const previousData = queryClient.getQueryData(["get-cart", user?._id]);

      queryClient.setQueryData(["get-cart", user?._id], (old: any) => {
        const data = old?.cart;
        const newObject = { ...data };
        newObject.products = [...products];
        setTotalMoney(totalPrice(newObject?.products));
        return newObject;
      });

      return { previousData };
    },
    onError: async (error, { userId, products }, context: any) => {
      await queryClient.setQueryData(
        ["get-cart", user?._id],
        context?.previousData
      );
    },
    onSettled: () => {
      queryClient.refetchQueries({ queryKey: ["get-cart", user?._id] });
    },
  });

  const handleChangeQuantity = async (productItem: any, status: "inscrese" | "descrease" | "input", input?:number) => {
    const cart: any = queryClient.getQueryData(["get-cart", user?._id]);
    const data = cart?.products;

    const index = data?.findIndex(
      (item: any) => item.productId === productItem?.productId
    );

    if (index === -1) return;

    const newProducts = [...data];

    if (status === "inscrese") {
      newProducts[index].quantity++;
    } else if (status === "descrease") {
      if (newProducts[index].quantity <= 1) return;
      newProducts[index].quantity--;
    } else if(status === "input"){
      if(input === undefined || isNaN(input)) return;
      newProducts[index].quantity = input
    }

    await changeDataInCart?.mutate({
      userId: user?._id || "",
      products: newProducts,
    });
  };

  const handleDelete = async (productItem: any) => {
    const cart: any = queryClient.getQueryData(["get-cart", user?._id]);
    const data = cart?.products;

    const index = data?.findIndex(
      (item: any) => item.productId === productItem?.productId
    );

    if (index === -1) return;

    const newProducts = data?.filter(
      (item: any) => item?.productId !== productItem?.productId
    );

    await changeDataInCart?.mutate({
      userId: user?._id || "",
      products: newProducts,
    });
  };

  const value = {
    myCart,
    changeDataInCart,
    isLoading,
    setIsLoading,
    totalMoney,
    handleChangeQuantity,
    handleDelete,
    setTotalMoney
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export default CartProvider;
