
import React, { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { Match } from '../types';
import MatchCard from '../components/MatchCard';
import OffersSidebar from '../components/OffersSidebar';

const CountryLeagues: React.FC = () => {
  const { countryName } = useParams<{ countryName: string }>();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (countryName) {
        const data = await matchService.getMatchesByCountry(countryName);
        // Fix: Added type assertion to bridge JS data to Match[]
        setMatches(data as Match[]);
      }
      setLoading(false);
    };
    fetchData();
  }, [countryName]);

  const groupedByLeague = useMemo(() => {
    const groups: Record<string, Match[]> = {};
    matches.forEach(m => {
      if (!groups[m.league]) groups[m.league] = [];
      groups[m.league].push(m);
    });
    return groups;
  }, [matches]);

  const availableLeagues = useMemo(() => Object.keys(groupedByLeague), [groupedByLeague]);

  return (
    <div className="w-full bg-[#f3f4f6] flex-1">
      <div className="bg-[#1a1c1e] text-white py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <Link to="/" className="hover:text-green-500">Home</Link>
            <span>»</span>
            <span className="text-white">{countryName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-black text-gray-900">{countryName} Leagues</h1>
              <div className="relative">
                <select className="appearance-none bg-white border rounded-xl px-4 py-2 text-xs font-bold pr-10 hover:border-gray-400 cursor-pointer shadow-sm min-w-[180px]">
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
                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-50 rounded-xl animate-pulse"></div>)}
              </div>
            ) : availableLeagues.length > 0 ? (
              <div className="space-y-12">
                {Object.entries(groupedByLeague).map(([leagueName, leagueMatches]) => (
                  <div key={leagueName}>
                    <div className="flex items-center space-x-3 mb-6">
                      <img src={leagueMatches[0].countryFlag} alt="" className="w-5 h-5 object-contain" />
                      <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">{leagueName}</h2>
                    </div>

                    <div className="grid grid-cols-[80px_1fr_60px_60px_60px_80px] gap-4 px-4 mb-2 text-[10px] font-black uppercase text-gray-300">
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
                <p className="text-gray-400 font-bold">No matches found for this country.</p>
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
