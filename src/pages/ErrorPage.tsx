import { Helmet } from "react-helmet";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <>
      <Helmet>
        <title>Lỗi</title>
        <meta name="description" content="Trang này là nơi hiển thị lỗi" />
        <meta
          property="og:image"
          content="https://example.com/path-to-your-image.jpg"
        />
      </Helmet>

      <div
        className="
        w-screen
        h-screen
        flex
        flex-col
        justify-center
        items-center
        flex-col,
        text-xl
    "
      >
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </>
  );
}
