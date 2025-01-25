import React from "react";
import { useCookies } from "react-cookie";
import { Navigate } from "react-router-dom";

export interface RestrictedPageProps {
  children: React.ReactNode;
}

const RestrictedPage: React.FC<RestrictedPageProps> = ({ children }) => {
  const [cookies] = useCookies();

  if (!cookies.token) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default RestrictedPage;
