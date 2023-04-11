import { Navigate, useRoutes } from "react-router-dom";
import Register from "../screens/unauthenticated/register";
import { Layout } from "../layouts/dashboard/layout";

const Router = () => {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "cadastro",
          element: <Register />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);
};

export default Router;
