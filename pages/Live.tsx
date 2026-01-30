
import React, { useEffect, useState, useMemo } from 'react';
import { matchService } from '../services/matchService';
import { Match } from '../types';
import MatchCard from '../components/MatchCard';
import Sidebar from '../components/Sidebar';

const Live: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await matchService.getLiveMatches();
      // Fix: Added type assertion to bridge JS data to Match[]
      setMatches(data as Match[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  const groupedMatches = useMemo(() => matchService.groupMatches(matches), [matches]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
        <h1 className="text-3xl font-black text-gray-900">Live Matches</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-xl h-24 animate-pulse border shadow-sm"></div>)}
            </div>
          ) : matches.length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedMatches).map(([key, data]) => (
                <div key={key}>
                  <div className="flex items-center space-x-2 mb-4">
                    <img src={data.flag} alt="" className="w-5 h-5 object-contain" />
                    <h2 className="text-sm font-black text-gray-900 uppercase tracking-tight">
                      {data.country} : {data.league}
                    </h2>
                  </div>
                  <div className="space-y-4">
                    {data.matches.map((match: any) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border p-12 text-center shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-1">No live matches currently</h3>
              <p className="text-gray-500 text-sm font-medium">Check back later or view upcoming fixtures.</p>
            </div>
          )}
        </div>
        <aside className="w-full lg:w-80">
          <Sidebar />
        </aside>
      </div>
    </div>
  );
};

export default Live;
