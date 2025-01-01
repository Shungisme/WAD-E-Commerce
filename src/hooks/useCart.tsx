import { useContext } from "react";
import  { cartContext } from "../contexts/cartContext";

export const useCart = () => useContext(cartContext)