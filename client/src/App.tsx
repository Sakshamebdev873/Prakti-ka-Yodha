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
import DashboardPage from './pages/DashboardPage';
import MissionsPage from './pages/dashboard/MissionsPage';
import LearnPage from './pages/dashboard/LearningPage';
import CommunityPage from './pages/dashboard/CommunityPage';
import ImpactPage from './pages/dashboard/ImpactPage';
// You can add LoginPage and other pages here later
// import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Layout>
    
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/feature' element={<FeaturesShowcase/>}/>
          <Route path='/impact' element={<InteractiveImpactPage/>}></Route>
          <Route path='/works' element={<SuperInteractiveHowItWorks/>} ></Route>
          <Route path='/contact' element={<ContactPage/>} ></Route>
          <Route path='/dashboard' element={<DashboardPage/>} ></Route>
          <Route path='/dashboard/missions' element={<MissionsPage/>} ></Route>
          <Route path='/dashboard/learn' element={<LearnPage/>} ></Route>
          <Route path='/dashboard/community' element={<CommunityPage/>} ></Route>
          <Route path='/dashboard/impact' element={<ImpactPage/>} ></Route>
        </Routes>
      </main>
      {/* You can add a Footer component here if you create one */}
      </Layout>
    </Router>
  );
}

export default App;