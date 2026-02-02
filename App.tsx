
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MatchDetail from './pages/MatchDetail';
import CountryLeagues from './pages/CountryLeagues';
import LeagueDetail from './pages/LeagueDetail';
import Live from './pages/Live';
import FooterDetails from './pages/FooterDetails';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-slate-950 w-full transition-colors duration-300">
        <Header />
        
        <main className="flex-grow flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/country/:countryName" element={<CountryLeagues />} />
            <Route path="/league/:countryName/:leagueName" element={<LeagueDetail />} />
            <Route path="/live" element={<Live />} />
            <Route path="/privacy-policy" element={<FooterDetails />} />
            <Route path="/terms-of-use" element={<FooterDetails />} />
            <Route path="/contact-us" element={<FooterDetails />} />
            <Route path="/faq" element={<FooterDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ThemeProvider>
  );
};

export default App;
