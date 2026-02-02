
import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { Match, GroupedMatch } from '../types';
import MatchCard from '../components/MatchCard';
import Sidebar from '../components/Sidebar';
import { useSSRData } from '../src/contexts/SSRDataContext';
import SEO from '../components/SEO';

type DateFilter = 'YESTERDAY' | 'TODAY' | 'TOMORROW' | 'LIVE' | 'ALL';

const Home: React.FC = () => {
  const ssr = useSSRData();
  const [matches, setMatches] = useState<Match[]>(ssr?.matches ?? []);
  const [loading, setLoading] = useState<boolean>(ssr ? false : true);
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
      // If we have server-provided data for the home page and the filter is ALL, reuse it.
      if (ssr && ssr.page === 'home' && dateFilter === 'ALL') {
        setMatches(ssr.matches || []);
        setLoading(false);
        return;
      }

      setLoading(true);
      let data: Match[] = [];
      
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
  }, [dateFilter, yesterdayStr, todayStr, tomorrowStr, ssr]);

  // Use explicit type casting for groupedMatches to resolve 'unknown' property errors in the template
  const groupedMatches = useMemo(() => matchService.groupMatches(matches) as Record<string, GroupedMatch>, [matches]);
  const [allMatchesForCount, setAllMatchesForCount] = useState<Match[]>(ssr?.page === 'home' ? (ssr.matches || []) : []);

  useEffect(() => {
    if (ssr && ssr.page === 'home') return; // already provided
    matchService.getAllMatches().then(data => setAllMatchesForCount(data as Match[]));
  }, [ssr]);

  const liveCount = useMemo(() => allMatchesForCount.filter(m => m.status === 'LIVE' as any).length, [allMatchesForCount]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 w-full transition-colors duration-300">
      <SEO title={`Football Streams — Live Scores, Fixtures & Predictions`} description={`Live football streams, scores, fixtures, match analysis and predictions across Premier League, La Liga, Bundesliga and more.`} keywords={`football live stream, live scores, fixtures, predictions, match analysis`} />
      <h1 className="text-3xl font-black text-slate-900 dark:text-white mb-8">Football Leagues</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <div className="relative">
              <select className="appearance-none bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-bold pr-10 hover:border-gray-400 dark:hover:border-slate-600 cursor-pointer shadow-sm text-slate-900 dark:text-white">
                <option>Upcoming</option>
              </select>
              <svg className="w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>

            <div className="flex items-center bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-1 shadow-sm overflow-x-auto">
              {['LIVE', 'YESTERDAY', 'TODAY', 'TOMORROW', 'ALL'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => setDateFilter(filter as DateFilter)}
                  className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${dateFilter === filter ? 'bg-slate-900 dark:bg-slate-700 text-white' : 'text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                >
                  {filter === 'LIVE' ? `Live (${liveCount})` : filter.charAt(0) + filter.slice(1).toLowerCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
            {['Over/Under', 'Correct Score', 'BTTS', 'Half Time/Full Time', 'Asian Handicap', 'Double Chance'].map((tab) => (
              <button key={tab} className={`px-4 py-2 border dark:border-slate-800 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm bg-white dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-slate-600 text-gray-400`}>
                {tab}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => <div key={i} className="bg-white dark:bg-slate-900 rounded-xl h-24 animate-pulse border dark:border-slate-800 shadow-sm"></div>)}
            </div>
          ) : Object.keys(groupedMatches).length > 0 ? (
            <div className="space-y-12">
              {Object.entries(groupedMatches).map(([key, data]) => (
                <div key={key}>
                  <div className="flex items-center space-x-2 mb-4">
                    <img src={data.flag} alt="" className="w-5 h-5 object-contain" onError={(e: any) => e.target.style.display='none'} />
                    <h2 className="text-sm font-black text-slate-900 dark:text-white flex items-center">
                      <Link to={`/country/${data.country}`} className="text-gray-400 dark:text-gray-500 font-bold hover:text-green-500 transition-colors">
                        {data.country}
                      </Link>
                      <span className="mx-1 text-gray-300 dark:text-slate-700">:</span>
                      <Link to={`/league/${data.country}/${data.league}`} className="uppercase tracking-tight hover:text-green-500 transition-colors">
                        {data.league}
                      </Link>
                    </h2>
                  </div>

                  <div className="grid grid-cols-[70px_1fr_240px_130px] gap-4 px-4 mb-2 text-[10px] font-black uppercase text-gray-300 dark:text-slate-600">
                    <span>Time</span>
                    <span>Game</span>
                    <div className="grid grid-cols-3 text-center">
                      <span>1</span>
                      <span>X</span>
                      <span>2</span>
                    </div>
                    <span className="text-right">Prediction</span>
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
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-12 text-center shadow-sm">
              <h3 className="text-lg font-black text-slate-900 dark:text-white mb-1">No matches found</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Try another date or category.</p>
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
