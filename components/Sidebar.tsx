
import React from 'react';
import { Link } from 'react-router-dom';
import { leagueService } from '../services/leagueService';

const Sidebar: React.FC = () => {
  const popularLeagues = leagueService.getPopularLeagues();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-6 sticky top-20 transition-all duration-300">
      <h3 className="font-black text-lg mb-6 text-slate-900 dark:text-white">Popular</h3>
      <div className="space-y-4">
        {popularLeagues.map((league: any, idx) => (
          <Link 
            key={idx} 
            to={`/league/${league.country}/${league.name}`}
            className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 p-2 rounded-xl transition-all"
          >
            <div className="flex items-center space-x-3">
              <img 
                src={league.logo} 
                alt={league.name} 
                className="w-5 h-5 object-contain"
                onError={(e: any) => e.target.src = 'https://www.footballstreams.com/assets/img/leagues/default.png'}
              />
              <span className="text-[13px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-green-500 transition-colors">{league.name}</span>
            </div>
            <div className="flex items-center">
              <span className={`text-[10px] font-bold px-2 py-1 rounded min-w-[45px] text-center border dark:border-slate-800 transition-colors ${league.status === 'Live' ? 'bg-green-500 text-black animate-pulse border-green-500' : 'bg-white dark:bg-slate-900 text-gray-400 dark:text-gray-500'}`}>
                {league.time || league.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
