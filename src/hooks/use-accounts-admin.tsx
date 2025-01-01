import { useContext } from "react";
import { AccountContext } from "../contexts/account-context-admin";

export default function useAccountsAdmin() {
  return useContext(AccountContext);
}
