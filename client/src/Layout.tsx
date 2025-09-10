import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

// --- Import all necessary components ---
import Header from './components/common/Header'; // Your main marketing header
import Footer from './components/common/Footer'; // Your main marketing footer
import DashboardHeader from './components/dashboard/DashboardHeader'; // The new dashboard header
import DashboardFooter from './components/dashboard/DashboardFooter'; // The new dashboard footer

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  // --- Logic for controlling layout visibility ---

  // 1. Routes that have NO header or footer (e.g., login/signup)
  const noLayoutRoutes = ['/auth'];
  const showNoLayout = noLayoutRoutes.some((route) => location.pathname.startsWith(route));

  // 2. Routes that have the special DASHBOARD layout
  const dashboardRoutes = ['/dashboard'];
  const showDashboardLayout = dashboardRoutes.some((route) => location.pathname.startsWith(route));

  if (showNoLayout) {
    return <main>{children}</main>;
  }

  if (showDashboardLayout) {
    return (
      <div className="bg-gray-50/70 min-h-screen">
        <DashboardHeader />
        <main>{children}</main>
        <DashboardFooter />
      </div>
    );
  }

  // 3. Default layout for all other public pages
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;