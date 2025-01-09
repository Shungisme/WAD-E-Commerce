import { Helmet } from "react-helmet";
import { NotFoundView } from "../sections/error/not-found-view";

const Page = () => {
  return (
    <>
      <Helmet>
        <title>Not Found</title>
        <meta
          name="description"
          content="The page you are looking for is not found"
        />
      </Helmet>

      <NotFoundView />
    </>
  );
};

export default Page;
