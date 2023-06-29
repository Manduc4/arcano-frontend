import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { axiosInstance } from "../services/instance";
import { useSelector } from "../services/store";
// routes

// ----------------------------------------------------------------------

type GuestUserProps = {
  children: ReactNode;
};

export default function GuestUser({ children }: GuestUserProps) {
  const Auth = useSelector((state: any) => state.Auth);
  const { signed, token } = Auth;

  if (signed) {
    axiosInstance.defaults.headers.common = {
      Authorization: `Bearer ${token.value}`,
    };

    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
