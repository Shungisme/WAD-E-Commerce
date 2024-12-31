import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { createContext, ReactNode, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { getProductInCartById, updateCart } from "../services/cart";
import { totalPrice } from "../utils/totalPrice";
import {
  clearCartInLocalStorage,
  getCartInLocalStorage,
  setCartInLocalStorage,
} from "../utils/localStorage";

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
  setTotalMoney: React.Dispatch<React.SetStateAction<number>>;
  handleChangeQuantity: (
    productItem: any,
    status: "inscrese" | "descrease" | "input",
    input?: number
  ) => Promise<void>;
  handleDelete: (productItem: any) => Promise<void>;
  addCart: UseMutationResult<
    any,
    Error,
    {
      userId: string;
      products?: any;
    },
    any
  > | null;
}

const defaultValue: TDefault = {
  myCart: null,
  changeDataInCart: null,
  addCart: null,
  totalMoney: 0,
  setTotalMoney: () => {},
  handleChangeQuantity: async (productItem: any, status: string) => {},
  handleDelete: async (productItem: any) => {},
};

export const cartContext = createContext(defaultValue);

const CartProvider = ({ children }: TProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();
  const [totalMoney, setTotalMoney] = useState<number>(0);
  const renderRef = useRef<boolean>(false);

  const myCart = useQuery({
    queryKey: ["get-cart", user?._id],
    queryFn: async () => {
      if (!user?._id) {
        const response = getCartInLocalStorage();
        setTotalMoney(totalPrice(response));
        return {
          products: response,
        };
      } else {
        const response = await getProductInCartById(String(user?._id));
        const productsOfResponse = response?.cart?.products;
        const data = getCartInLocalStorage();

        if (!data || data?.length <= 0) {
          setTotalMoney(totalPrice(productsOfResponse));
          return response?.cart;
        }
        renderRef.current = true;

        if (!productsOfResponse || productsOfResponse?.length <= 0) {
          setTotalMoney(totalPrice(data));
          clearCartInLocalStorage();
          return {
            products: data,
          };
        }

        for (let i = 0; i < data.length; i++) {
          const index = productsOfResponse.findIndex(
            (item: any) => item.productId === data[i].productId
          );

          if (index === -1) {
            productsOfResponse.push(data[i]);
          } else if (productsOfResponse[index].quantity < data[i].quantity) {
            productsOfResponse[index].quantity = data[i].quantity;
          }
        }
        setTotalMoney(totalPrice(productsOfResponse));
        clearCartInLocalStorage();
        return {
          products: productsOfResponse,
        };
      }
    },
  });

  useEffect(() => {
    if (user?._id && myCart.isSuccess && renderRef.current === true) {
      addCart.mutate({
        userId: user._id,
        products: myCart.data?.products,
      });
      renderRef.current = false;
    }
  }, [user?._id, renderRef.current]);

  const addCart = useMutation({
    mutationKey: ["add-cart", user?._id],
    mutationFn: async ({
      userId,
      products,
    }: {
      userId: string;
      products?: any;
    }) => {
      if (user?._id) {
        const response = await updateCart(userId, products);
        return response;
      } else {
        return {
          products,
        };
      }
    },
    onMutate: ({ products }) => {
      queryClient.cancelQueries({ queryKey: ["add-cart", user?._id] });
      const previousData = queryClient.getQueryData(["get-cart", user?._id]);
      queryClient.setQueryData(["get-cart", user?._id], (old: any) => {
        let data;
        if (user?._id) {
          data = old?.cart;
          const newObject = { ...data };
          newObject.products = [...products];

          return newObject;
        } else {
          data = [...products];
          setCartInLocalStorage(data);
        }
      });

      return { previousData };
    },
    onError: (error, { userId, products }, context: any) => {
      queryClient.setQueryData(["get-cart"], context?.previousData);
    },
    onSettled: async () => {
      queryClient.refetchQueries({
        queryKey: ["get-cart", user?._id],
      });
    },
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
      if (user?._id) {
        const response = await updateCart(userId, products);
        return response;
      } else {
        return {
          products,
        };
      }
    },
    onMutate: ({ userId, products }) => {
      queryClient.cancelQueries({ queryKey: ["get-cart", user?._id] });
      const previousData = queryClient.getQueryData(["get-cart", user?._id]);

      queryClient.setQueryData(["get-cart", user?._id], (old: any) => {
        let data;
        if (user?._id) {
          data = old?.cart;
          const newObject = { ...data };
          newObject.products = [...products];
          setTotalMoney(totalPrice(newObject?.products));
          return newObject;
        } else {
          data = [...products];
          setCartInLocalStorage(data);
          return;
        }
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

  const handleChangeQuantity = async (
    productItem: any,
    status: "inscrese" | "descrease" | "input",
    input?: number
  ) => {
    const cart: any = queryClient.getQueryData(["get-cart", user?._id]);
    const data = cart?.products;
 

    const index = data?.findIndex(
      (item: any) => item.productId === productItem?.productId
    );

    if (index === -1) return;

    const newProducts = [...data];

    if (status === "inscrese") {
      if (newProducts[index].remainingQuantity > newProducts[index].quantity) {
        newProducts[index].quantity++;
      }
    } else if (status === "descrease") {
      if (newProducts[index].quantity <= 1) return;
      newProducts[index].quantity--;
    } else if (status === "input") {
      if (input === undefined || isNaN(input)) return;
      newProducts[index].quantity = input;
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
    setTotalMoney,
    addCart,
  };

  return <cartContext.Provider value={value}>{children}</cartContext.Provider>;
};

export default CartProvider;
