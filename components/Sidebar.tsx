
import React from 'react';
import { matchService } from '../services/matchService';

const Sidebar: React.FC = () => {
  const popularLeagues = matchService.getPopularLeagues();

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-20">
      <h3 className="font-black text-lg mb-6 text-gray-900">Popular</h3>
      <div className="space-y-4">
        {popularLeagues.map((league: any, idx) => (
          <div key={idx} className="flex items-center justify-between group cursor-pointer hover:bg-gray-50 p-2 rounded-xl transition-all">
            <div className="flex items-center space-x-3">
              <img 
                src={league.logo} 
                alt={league.name} 
                className="w-5 h-5 object-contain"
                onError={(e: any) => e.target.src = 'https://www.footballstreams.com/assets/img/leagues/default.png'}
              />
              <span className="text-xs font-bold text-gray-700 group-hover:text-black">{league.name}</span>
            </div>
            <div className="flex items-center">
              <span className={`text-[10px] font-bold px-2 py-1 rounded min-w-[45px] text-center ${league.status === 'Live' ? 'bg-green-500 text-black animate-pulse' : 'bg-white text-gray-400 border'}`}>
                {league.time || league.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
