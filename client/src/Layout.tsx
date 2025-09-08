import React from "react";
import { useLocation } from "react-router-dom"; // if using react-router
import PrakritiYoddhaHeader from "./PrakritiYoddhaHeader";
import Footer from "./Footer"; // assume you have a Footer component

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // Routes where header/footer should NOT appear
  const authRoutes = ["/login", "/signup", "/auth"];

  const hideHeaderFooter = authRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <>
      {!hideHeaderFooter && <PrakritiYoddhaHeader />}
      <main className="pt-16">{children}</main>
      {!hideHeaderFooter && <Footer />}
    </>
  );
};

export default Layout;
