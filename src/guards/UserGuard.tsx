import { useState, ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { Login } from "../screens/unauthenticated/login";
import { axiosInstance } from "../services/instance";
import { useSelector } from "../services/store";

type GuardProps = {
  children: ReactNode;
};

export default function UserGuard({ children }: GuardProps) {
  const Auth = useSelector((state: any) => state.Auth);
  const { signed, token } = Auth;

  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(
    null
  );

  if (!signed) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Login />;
  }

  axiosInstance.defaults.headers.common = {
    Authorization: `Bearer ${token.value}`,
  };

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
