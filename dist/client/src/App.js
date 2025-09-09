import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import Footer from './components/common/Footer';
import AuthPage from './pages/AuthPage';
import FeaturesShowcase from './pages/FeatureShowcase';
import InteractiveImpactPage from './pages/InteractiveImpactPage';
import SuperInteractiveHowItWorks from './pages/SuperInteractiveHowItWorks';
import ContactPage from './pages/ContactPage';
import Layout from './Layout';
// You can add LoginPage and other pages here later
// import LoginPage from './pages/LoginPage';
function App() {
    return (_jsx(Router, { children: _jsx(Layout, { children: _jsx("main", { children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(HomePage, {}) }), _jsx(Route, { path: "/auth", element: _jsx(AuthPage, {}) }), _jsx(Route, { path: '/feature', element: _jsx(FeaturesShowcase, {}) }), _jsx(Route, { path: '/impact', element: _jsx(InteractiveImpactPage, {}) }), _jsx(Route, { path: '/works', element: _jsx(SuperInteractiveHowItWorks, {}) }), _jsx(Route, { path: '/contact', element: _jsx(ContactPage, {}) })] }) }) }) }));
}
export default App;
//# sourceMappingURL=App.js.map