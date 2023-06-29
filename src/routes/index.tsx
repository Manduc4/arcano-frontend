import { Navigate, useRoutes } from "react-router-dom";
import Register from "../screens/unauthenticated/register";
import { Layout } from "../layouts/dashboard/layout";
import NotFound from "../screens/404";
import Home from "../screens/home";
import { Login } from "../screens/unauthenticated/login";
import GuestAdmin from "../guards/GuestUser";
import UserGuard from "../guards/UserGuard";
import Account from "../screens/profile/view";

export default function Router() {
  return useRoutes([
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: (
        <GuestAdmin>
          <Login />
        </GuestAdmin>
      ),
    },
    {
      path: "/",
      element: (
        <UserGuard>
          <Layout />
        </UserGuard>
      ),
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: '/minha-conta',
          element: <Account />
        }
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      path: "/404",
      element: <NotFound />,
    },
  ]);
}
