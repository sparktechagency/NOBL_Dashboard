import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({ children }) => {
  const token = localStorage.getItem("token");
  const location = useLocation();
  if (token) {
    return children;
  } else {
    return (
      <Navigate to={"auth"} replace state={{ pathname: location?.pathname }} />
    );
  }
};

export default PrivateRoutes;
