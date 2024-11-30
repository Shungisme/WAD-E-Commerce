import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError() as { statusText?: string; message?: string };

  return (
    <div 
    className="
        w-screen
        h-screen
        flex
        flex-col
        justify-center
        items-center
        flex-col,
        fixed
    ">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
    </div>
  );
}