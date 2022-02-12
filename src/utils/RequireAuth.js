import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const RequireAuth = ({ children, redirectTo }) => {
  const user = useSelector((state) => state.users.user);

  if (user === "loadingUser") return <h4>Loading..</h4>;

  return user !== "loadingUser" && user ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
};

export default RequireAuth;
