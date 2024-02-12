import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Navigation from "../components/Navigation";
import { useEffect, useState } from "react";

const Layout = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    localStorage.getItem("isAuthorized")
      ? setIsAuthorized(true)
      : setIsAuthorized(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage.getItem("isAuthorized")]);

  useEffect(() => {
    if (!isAuthorized) {
      if (pathname !== "/" || pathname !== "/register") {
        navigate("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, pathname]);

  return (
    <div>
      <Navigation />
      <Outlet />
    </div>
  );
};

export default Layout;
