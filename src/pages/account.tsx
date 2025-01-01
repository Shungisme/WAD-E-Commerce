import { AccountView } from "../sections/account/view/account-view";
import AccountManagerProvider from "../contexts/account-context-admin";

export default function Page() {
  return (
    <AccountManagerProvider>
      <AccountView />
    </AccountManagerProvider>
  );
}
