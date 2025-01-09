import { AccountView } from "../sections/account/view/account-view";
import AccountManagerProvider from "../contexts/account-context-admin";
import { Helmet } from "react-helmet";

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Manage Account</title>
        <meta
          name="description"
          content="Manage account from admin dashboard"
        />
      </Helmet>

      <AccountManagerProvider>
        <AccountView />
      </AccountManagerProvider>
    </>
  );
}
