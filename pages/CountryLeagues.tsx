
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { Match } from '../types';
import MatchCard from '../components/MatchCard';
import OffersSidebar from '../components/OffersSidebar';
import { useSSRData } from '../src/contexts/SSRDataContext';
import SEO from '../components/SEO';

const CountryLeagues: React.FC = () => {
  const ssr = useSSRData();
  const { countryName } = useParams<{ countryName: string }>();
  const [matches, setMatches] = useState<Match[]>(ssr?.page === 'country' && ssr.country === countryName ? (ssr.matches || []) : []);
  const [loading, setLoading] = useState<boolean>(ssr && ssr.page === 'country' ? false : true);

  useEffect(() => {
    if (ssr && ssr.page === 'country' && ssr.country === countryName) return;
    const fetchData = async () => {
      setLoading(true);
      if (countryName) {
        const data = await matchService.getMatchesByCountry(countryName);
        setMatches(data as Match[]);
      }
      setLoading(false);
    };
    fetchData();
  }, [countryName, ssr]);

  // Use explicit typing for groupedByLeague to avoid inference issues
  const groupedByLeague = useMemo<Record<string, Match[]>>(() => {
    const groups: Record<string, Match[]> = {};
    matches.forEach(m => {
      if (!groups[m.league]) groups[m.league] = [];
      groups[m.league].push(m);
    });
    return groups;
  }, [matches]);

  // Use explicit type casting for availableLeagues to resolve 'unknown' property errors
  const availableLeagues = useMemo(() => Object.keys(groupedByLeague) as string[], [groupedByLeague]);

  return (
    <div className="w-full bg-gray-100 dark:bg-slate-950 flex-1 transition-colors duration-300">
      <SEO title={`${countryName} Football — Leagues, Fixtures & Results`} description={`Comprehensive fixtures and results for football leagues in ${countryName}. Browse league tables, matches and match analysis.`} keywords={`${countryName} football, leagues, fixtures, results`} />
      <div className="bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
            <span>»</span>
            <span className="text-white">{countryName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-8 transition-colors duration-300">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h1 className="text-2xl font-black text-slate-900 dark:text-white">{countryName} Leagues</h1>
              <div className="relative">
                <select className="appearance-none bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-bold pr-10 hover:border-gray-400 dark:hover:border-slate-600 cursor-pointer shadow-sm min-w-[180px] text-slate-900 dark:text-white">
                  <option>Select League</option>
                  {availableLeagues.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
                <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-50 dark:bg-slate-800/50 rounded-xl animate-pulse"></div>)}
              </div>
            ) : availableLeagues.length > 0 ? (
              <div className="space-y-12">
                {Object.entries(groupedByLeague).map(([leagueName, leagueMatches]) => (
                  <div key={leagueName}>
                    <div className="flex items-center space-x-3 mb-6">
                      <img src={leagueMatches[0].countryFlag} alt="" className="w-5 h-5 object-contain" />
                      <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">{leagueName}</h2>
                    </div>

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
                      {leagueMatches.map(match => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 dark:text-gray-500 font-bold">No matches found for this country.</p>
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

export default CountryLeagues;
