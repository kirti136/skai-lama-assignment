import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PrivateRoute = ({ children }) => {
  const token = Cookies.get("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decoded.exp && decoded.exp < currentTime) {
      Cookies.remove("token"); 
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    console.err(err);
    Cookies.remove("token");
    return <Navigate to="/" replace />;
  }
};

export default PrivateRoute;
