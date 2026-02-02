
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { Match } from '../types';
import MatchCard from '../components/MatchCard';
import OffersSidebar from '../components/OffersSidebar';
import { useSSRData } from '../src/contexts/SSRDataContext';

const LeagueDetail: React.FC = () => {
  const ssr = useSSRData();
  const { countryName, leagueName } = useParams<{ countryName: string; leagueName: string }>();
  const [matches, setMatches] = useState<Match[]>(ssr?.page === 'league' && ssr.country === countryName && ssr.leagueName === leagueName ? (ssr.matches || []) : []);
  const [loading, setLoading] = useState<boolean>(ssr && ssr.page === 'league' ? false : true);

  useEffect(() => {
    if (ssr && ssr.page === 'league' && ssr.country === countryName && ssr.leagueName === leagueName) return;
    const fetchData = async () => {
      setLoading(true);
      if (countryName && leagueName) {
        const data = await matchService.getMatchesByLeague(countryName, leagueName);
        setMatches(data as Match[]);
      }
      setLoading(false);
    };
    fetchData();
  }, [countryName, leagueName, ssr]);

  return (
    <div className="w-full bg-gray-100 dark:bg-slate-950 flex-1 transition-colors duration-300">
      <div className="bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
            <span>»</span>
            <Link to={`/country/${countryName}`} className="hover:text-green-500 transition-colors">{countryName}</Link>
            <span>»</span>
            <span className="text-white">{leagueName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-8 transition-colors duration-300">
            <div className="flex items-center space-x-3 mb-10">
              {matches.length > 0 && <img src={matches[0].countryFlag} alt="" className="w-6 h-6 object-contain" />}
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{leagueName} Fixtures</h1>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-50 dark:bg-slate-800/50 rounded-xl animate-pulse"></div>)}
              </div>
            ) : matches.length > 0 ? (
              <div>
                <div className="grid grid-cols-[80px_1fr_60px_60px_60px_80px] gap-4 px-4 mb-2 text-[10px] font-black uppercase text-gray-300 dark:text-slate-600">
                  <span>Time</span>
                  <span>Game</span>
                  <span className="text-center">-</span>
                  <span className="text-center">1</span>
                  <span className="text-center">X</span>
                  <span className="text-center">2</span>
                  <span className="text-center">Prediction</span>
                </div>

                <div className="space-y-4">
                  {matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 dark:text-gray-500 font-bold">No matches found for this league.</p>
              </div>
            )}
          </div>
          <aside className="w-full lg:w-80">
            <OffersSidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default LeagueDetail;
