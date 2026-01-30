
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { Match } from '../types';
import MatchCard from '../components/MatchCard';
import OffersSidebar from '../components/OffersSidebar';

const LeagueDetail: React.FC = () => {
  const { countryName, leagueName } = useParams<{ countryName: string; leagueName: string }>();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (countryName && leagueName) {
        const data = await matchService.getMatchesByLeague(countryName, leagueName);
        // Fix: Added type assertion to bridge JS data to Match[]
        setMatches(data as Match[]);
      }
      setLoading(false);
    };
    fetchData();
  }, [countryName, leagueName]);

  return (
    <div className="w-full bg-[#f3f4f6] flex-1">
      <div className="bg-[#1a1c1e] text-white py-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <Link to="/" className="hover:text-green-500">Home</Link>
            <span>»</span>
            <Link to={`/country/${countryName}`} className="hover:text-green-500">{countryName}</Link>
            <span>»</span>
            <span className="text-white">{leagueName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 bg-white rounded-2xl shadow-sm border p-8">
            <div className="flex items-center space-x-3 mb-10">
              {matches.length > 0 && <img src={matches[0].countryFlag} alt="" className="w-6 h-6 object-contain" />}
              <h1 className="text-2xl font-black text-gray-900">{leagueName} Fixtures</h1>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-gray-50 rounded-xl animate-pulse"></div>)}
              </div>
            ) : matches.length > 0 ? (
              <div>
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
                  {matches.map(match => (
                    <MatchCard key={match.id} match={match} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-gray-400 font-bold">No matches found for this league.</p>
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
