import { useContext } from "react";
import { AuthContextAdmin } from "../contexts/auth-context-admin";

export default function useAuthAdmin() {
  return useContext(AuthContextAdmin);
}
