import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "../Store";

//do not let user to access to the page without login admin
export default function AdminRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.isAdmin ? children : <Navigate to="/signin" />;
}

