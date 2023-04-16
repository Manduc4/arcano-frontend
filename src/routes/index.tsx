import { Navigate, useRoutes } from "react-router-dom";
import Register from "../screens/unauthenticated/register";
import { Layout } from "../layouts/dashboard/layout";
import NotFound from "../screens/404";
import Home from "../screens/home";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "cadastros",
          element: <Register />,
        },
      ],
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);
}
