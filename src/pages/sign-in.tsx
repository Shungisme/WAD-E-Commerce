import { Helmet } from "react-helmet";
import { SignInView } from "../sections/auth/sign-in-view";

const Page = () => {
  return (
    <>
      <Helmet>
        <title>Sign In</title>
        <meta name="description" content="Sign In" />
      </Helmet>
      <SignInView />
    </>
  );
};

export default Page;
