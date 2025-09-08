import React from "react";
import { useLocation } from "react-router-dom"; // if using react-router
import Header from "../src/components/common/Header";
import Footer from "./components/common/Footer"; // assume you have a Footer component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Routes where header/footer should NOT appear
  const authRoutes = ["/auth"];

  const hideHeaderFooter = authRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeaderFooter && <Header />}
      <main >{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
