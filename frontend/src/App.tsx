import Signup from "@/pages/Signup";
import Signin from "@/pages/Signin";
import Root from "@/pages/Root";
import ErrorPage from "@/pages/ErrorPage";
import Dashboard from "@/pages/Dashboard";
import SendMoney from "@/pages/SendMoney";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/send",
        element: <SendMoney />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
}

export default App;
