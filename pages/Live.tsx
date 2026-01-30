
import React, { useEffect, useState, useMemo } from 'react';
import { matchService } from '../services/matchService';
import { Match, GroupedMatch } from '../types';
import MatchCard from '../components/MatchCard';
import Sidebar from '../components/Sidebar';

const Live: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await matchService.getLiveMatches();
      setMatches(data as Match[]);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Use explicit type casting for groupedMatches to resolve 'unknown' property errors in the template
  const groupedMatches = useMemo(() => matchService.groupMatches(matches) as Record<string, GroupedMatch>, [matches]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full transition-colors duration-300">
      <div className="flex items-center space-x-3 mb-8">
        <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50"></div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white">Live Matches</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="bg-white dark:bg-slate-900 rounded-xl h-24 animate-pulse border dark:border-slate-800 shadow-sm"></div>)}
            </div>
          ) : matches.length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedMatches).map(([key, data]) => (
                <div key={key}>
                  <div className="flex items-center space-x-2 mb-4">
                    <img src={data.flag} alt="" className="w-5 h-5 object-contain" />
                    <h2 className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-12 text-center shadow-sm transition-colors duration-300">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">No live matches currently</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Check back later or view upcoming fixtures.</p>
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
