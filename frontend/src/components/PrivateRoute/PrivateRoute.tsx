import React from "react";
import { Navigate } from "react-router-dom";
import { UserRole } from "../../axios/UserAPI"; // Importing UserRole enum
import { useUserContext } from "../../context/UserContext"; // Importing custom hook for accessing user context

interface IPrivateRoute {
  children: React.ReactNode; // Children elements to be rendered within the private route
  isAdminPage?: boolean; // Optional boolean flag to check if the route is for admin only
}

const PrivateRoute: React.FC<IPrivateRoute> = ({ children, isAdminPage }) => {
  const accessToken = localStorage.getItem("accessToken"); // Retrieve access token from local storage
  const { user } = useUserContext(); // Access user context using custom hook

  // If there's no access token, redirect user to the login page
  if (!accessToken) {
    return <Navigate to="/login" replace={true} />;
  }

  // If the route is for admin only and the user role is not admin, redirect to the home page
  if (isAdminPage && user?.role !== UserRole.ADMIN) {
    return <Navigate to="/" replace={true} />;
  }

  // Render children elements if access is allowed
  return children;
};

export default PrivateRoute;
