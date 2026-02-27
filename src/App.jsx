import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import LiveActivity from './components/LiveActivity';
import SocialProof from './components/SocialProof';
import BackToTop from './components/BackToTop';
import DemoBadge from './components/DemoBadge';
import Admin from './pages/Admin';

const LandingPage = () => (
  <>
    <Navbar />
    <main>
      <Hero />
      <Features />
      <Pricing />
    </main>
    <Footer />
    <LiveActivity />
    <SocialProof />
    <BackToTop />
    <DemoBadge />
  </>
);

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-950 selection:bg-neon-blue/20 selection:text-neon-blue">
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
