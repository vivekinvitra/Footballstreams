
import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import MatchDetail from './pages/MatchDetail';
import CountryLeagues from './pages/CountryLeagues';
import LeagueDetail from './pages/LeagueDetail';
import Live from './pages/Live';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] w-full">
        <Header />
        
        <main className="flex-grow flex flex-col w-full">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/match/:id" element={<MatchDetail />} />
            <Route path="/country/:countryName" element={<CountryLeagues />} />
            <Route path="/league/:countryName/:leagueName" element={<LeagueDetail />} />
            <Route path="/live" element={<Live />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
