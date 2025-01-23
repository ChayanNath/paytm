import { Link } from "react-router-dom";
import { useRouteError } from "react-router-dom";

type RouteError = {
  status?: number;
  statusText?: string;
  message?: string;
};

export default function ErrorPage() {
  const error = useRouteError() as RouteError;
  console.error(error);

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen overflow-hidden bg-white border-zinc-200 text-zinc-850 shadow dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-50">
      <div>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
}
