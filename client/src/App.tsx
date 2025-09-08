import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import HomePage from './pages/HomePage';
import Footer from './components/common/Footer';
import AuthPage from './pages/AuthPage';
import FeaturesShowcase from './pages/FeatureShowcase';
import InteractiveImpactPage from './pages/InteractiveImpactPage';
// You can add LoginPage and other pages here later
// import LoginPage from './pages/LoginPage';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path='/feature' element={<FeaturesShowcase/>}/>
          <Route path='/impact' element={<InteractiveImpactPage/>}></Route>
        </Routes>
      </main>
      <Footer />
      {/* You can add a Footer component here if you create one */}
    </Router>
  );
}

export default App;