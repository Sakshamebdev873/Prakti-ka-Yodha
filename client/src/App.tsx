import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

// Common + Public Pages
import PrakritiYoddhaHeader from "./pages/Students/components/common/Header";
import Features from "./pages/Students/components/home/Features";
import HomePage from "./pages/Students/HomePage";
import InteractiveImpactPage from "./pages/Students/InteractiveImpactPage";
import SuperInteractiveHowItWorks from "./pages/Students/SuperInteractiveHowItWorks";
import ContactPage from "./pages/Students/ContactPage";
import AuthPage from "./pages/Students/AuthPage";

// Dashboard Pages
import DashboardHeader from "./pages/Students/dashboard/DashboardHeader";
import DashboardPage from "./pages/Students/DashboardPage";
import MissionsPage from "./pages/Students/dashboard/MissionsPage";
import LearnPage from "./pages/Students/dashboard/LearningPage";
import CommunityPage from "./pages/Students/dashboard/CommunityPage";
import ImpactPage from "./pages/Students/dashboard/ImpactPage";

// Impact Section Pages
import WasteSegregationPage from "./pages/Students/dashboard/impact/WasteSegregation";
import Biodegradable from "./pages/Students/dashboard/impact/Biodegradable";
import Recyclable from "./pages/Students/dashboard/impact/Recyclable";
import NonRecyclablePage from "./pages/Students/dashboard/impact/NonRecyclablePage";
import CommunityCleanupPage from "./pages/Students/dashboard/impact/CommunityCleanupPage";
import PlantFirstTreePage from "./pages/Students/dashboard/impact/PlantFirstTreePage";

// Layout for public student pages
function StudentPublicLayout() {
  return (
    <>
      <PrakritiYoddhaHeader />
      <Outlet />
    </>
  );
}

// Layout for dashboard student pages
function StudentDashboardLayout() {
  return (
    <>
      <DashboardHeader />
      <Outlet />
    </>
  );
}

// Layout for impact section inside dashboard
function ImpactLayout() {
  return <Outlet />;
}

function WasteLayout() {
  return <Outlet />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/student/auth" element={<AuthPage />} />
        {/* All public pages (including /) use StudentPublicLayout */}
        <Route element={<StudentPublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/student/feature" element={<Features />} />
          <Route path="/student/impact" element={<InteractiveImpactPage />} />
          <Route path="/student/works" element={<SuperInteractiveHowItWorks />} />
          <Route path="/student/contact" element={<ContactPage />} />
        </Route>

        {/* Dashboard routes under /student/dashboard */}
        <Route path="/student/dashboard" element={<StudentDashboardLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="missions" element={<MissionsPage />} />
          <Route path="learn" element={<LearnPage />} />
          <Route path="community" element={<CommunityPage />} />

          {/* Impact section with nested structure */}
          <Route path="impact" element={<ImpactLayout />}>
            <Route index element={<ImpactPage />} />

            <Route path="waste_segregate" element={<WasteLayout />}>
              <Route index element={<WasteSegregationPage />} />
              <Route path="biodegradable" element={<Biodegradable />} />
              <Route path="recyclable" element={<Recyclable />} />
              <Route path="non_recyclable" element={<NonRecyclablePage />} />
            </Route>

            <Route path="community_cleanup" element={<CommunityCleanupPage />} />
            <Route path="first_saple" element={<PlantFirstTreePage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
