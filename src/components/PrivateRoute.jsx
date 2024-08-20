// /frontend/src/components/PrivateRoute.jsx

// import { Navigate, Outlet } from "react-router-dom";
// import authService from "../services/authService";

// const PrivateRoute = () => {
//   const user = authService.getCurrentUser();

//   return user ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRoute;

// /frontend/src/components/PrivateRoute.jsx

import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
