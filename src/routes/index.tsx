import { Navigate, useRoutes } from "react-router-dom";
import Register from "../screens/unauthenticated/register";
import { Layout } from "../layouts/dashboard/layout";
import NotFound from "../screens/404";
import Home from "../screens/home";
import { Login } from "../screens/unauthenticated/login";
import GuestUser from "../guards/GuestUser";
import UserGuard from "../guards/UserGuard";
import Account from "../screens/profile/view";
import BooksList from "../screens/books";
import CompaniesList from "../screens/companies";
import Settings from "../screens/settings";
import Profile from "../screens/profile";
import UsersList from "../screens/users";
import Recovery from "../screens/unauthenticated/recovery";

export default function Router() {
  return useRoutes([
    {
      path: "/cadastro",
      element: (
        <GuestUser>
          <Register />
        </GuestUser>
      ),
    },
    {
      path: "/login",
      element: (
        <GuestUser>
          <Login />
        </GuestUser>
      ),
    },
    {
      path: "/recuperar-senha",
      element: (
        <GuestUser>
          <Recovery />
        </GuestUser>
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
          path: "/livros",
          element: <BooksList />,
        },
        {
          path: "/usuarios",
          element: <UsersList />,
        },
        {
          path: "/empresas",
          element: <CompaniesList />,
        },
        {
          path: "/minha-conta",
          element: <Profile />,
        },
        {
          path: "/configuracoes",
          element: <Settings />,
        },
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
