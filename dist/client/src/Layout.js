import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
import { useLocation } from "react-router-dom"; // if using react-router
import Header from "../src/components/common/Header";
import Footer from "./components/common/Footer"; // assume you have a Footer component
const Layout = ({ children }) => {
    const location = useLocation();
    // Routes where header/footer should NOT appear
    const authRoutes = ["/auth"];
    const hideHeaderFooter = authRoutes.some((route) => location.pathname.startsWith(route));
    return (_jsxs(_Fragment, { children: [!hideHeaderFooter && _jsx(Header, {}), _jsx("main", { children: children }), !hideHeaderFooter && _jsx(Footer, {})] }));
};
export default Layout;
//# sourceMappingURL=Layout.js.map