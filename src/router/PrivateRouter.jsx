// // src/router/PrivateRouter.jsx
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const PrivateRouter = () => {
//   const { currentUser } = useAuth();
//   return currentUser ? <Outlet /> : <Navigate to="/login" />;
// };

// export default PrivateRouter;

import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRouter = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" replace />;
};

export default PrivateRouter;