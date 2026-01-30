
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { Match } from '../types';
import MatchCard from '../components/MatchCard';
import Sidebar from '../components/Sidebar';

type DateFilter = 'YESTERDAY' | 'TODAY' | 'TOMORROW' | 'LIVE' | 'ALL';

const Home: React.FC = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [dateFilter, setDateFilter] = useState<DateFilter>('ALL');

  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);
  const yesterdayStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  }, []);
  const tomorrowStr = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      let data: Match[] = [];
      
      // Fix: Added type assertion as Match[] to resolve inferred string vs enum mismatch
      if (dateFilter === 'LIVE') {
        data = (await matchService.getLiveMatches()) as Match[];
      } else if (dateFilter === 'ALL') {
        data = (await matchService.getAllMatches()) as Match[];
      } else {
        const targetDate = dateFilter === 'YESTERDAY' ? yesterdayStr : 
                           dateFilter === 'TODAY' ? todayStr : 
                           tomorrowStr;
        data = (await matchService.getMatchesByDate(targetDate)) as Match[];
      }
      
      setMatches(data);
      setLoading(false);
    };
    fetchData();
  }, [dateFilter, yesterdayStr, todayStr, tomorrowStr]);

  const groupedMatches = useMemo(() => matchService.groupMatches(matches), [matches]);
  const [allMatchesForCount, setAllMatchesForCount] = useState<Match[]>([]);

  useEffect(() => {
    // Fix: Explicitly cast data to Match[] when calling setAllMatchesForCount
    matchService.getAllMatches().then(data => setAllMatchesForCount(data as Match[]));
  }, []);

  const liveCount = useMemo(() => allMatchesForCount.filter(m => m.status === 'LIVE' as any).length, [allMatchesForCount]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Football Leagues</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="relative">
              <select className="appearance-none bg-white border rounded-xl px-4 py-2 text-xs font-bold pr-10 hover:border-gray-400 cursor-pointer shadow-sm">
                <option>Upcoming</option>
              </select>
              <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="flex items-center bg-white border rounded-xl p-1 shadow-sm overflow-x-auto">
              {['LIVE', 'YESTERDAY', 'TODAY', 'TOMORROW', 'ALL'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setDateFilter(filter as DateFilter)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${dateFilter === filter ? 'bg-[#1a1c1e] text-white' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                  {filter === 'LIVE' ? `Live (${liveCount})` : filter.charAt(0) + filter.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {['Over/Under', 'Correct Score', 'BTTS', 'Half Time/Full Time', 'Asian Handicap', 'Double Chance'].map((tab) => (
              <button key={tab} className={`px-4 py-2 border rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm bg-white hover:text-gray-900 hover:border-gray-400 text-gray-400`}>
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="bg-white rounded-xl h-24 animate-pulse border shadow-sm"></div>)}
            </div>
          ) : Object.keys(groupedMatches).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedMatches).map(([key, data]) => (
                <div key={key}>
                  <div className="flex items-center space-x-2 mb-4">
                    <img src={data.flag} alt="" className="w-5 h-5 object-contain" onError={(e: any) => e.target.style.display='none'} />
                    <h2 className="text-sm font-black text-gray-900 flex items-center">
                      <Link to={`/country/${data.country}`} className="text-gray-400 font-bold hover:text-green-500 transition-colors">
                        {data.country}
                      </Link>
                      <span className="mx-1 text-gray-300">:</span>
                      <Link to={`/league/${data.country}/${data.league}`} className="uppercase tracking-tight hover:text-green-500 transition-colors">
                        {data.league}
                      </Link>
                    </h2>
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
                    {data.matches.map((match: any) => (
                      <MatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl border p-12 text-center shadow-sm">
              <h3 className="text-lg font-black text-gray-900 mb-1">No matches found</h3>
              <p className="text-gray-500 text-sm font-medium">Try another date or category.</p>
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

export default Home;
