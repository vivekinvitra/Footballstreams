
import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../types';
import { matchService } from '../services/matchService';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  // Delegate business logic (odds calculation) to the service
  const { p1, pX, p2 } = matchService.calculateOddsPercentages(match.odds);

  const isHomePrediction = match.prediction === 'W1';
  const isDrawPrediction = match.prediction === 'Draw' || match.prediction === 'X';
  const isAwayPrediction = match.prediction === 'W2';

  const dateParts = match.date.split('-');
  const displayDate = dateParts.length === 3 ? `${dateParts[2]} ${dateParts[1]}` : match.date;

  return (
    <div className="bg-white rounded-xl border shadow-sm hover:border-green-500 transition-all mb-4 overflow-hidden group">
      <Link to={`/match/${match.id}`}>
        <div className="p-4">
          <div className="grid grid-cols-[80px_1fr_60px_60px_60px_80px] items-center gap-4">
            {/* Time Column */}
            <div className="text-[11px] font-bold text-gray-400">
              <div className="text-gray-900 font-black">{displayDate}</div>
              <div className="text-gray-400">{match.time}</div>
            </div>

            {/* Game Column */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <img src={match.homeTeam.logo} alt="" className="w-5 h-5 object-contain" onError={(e: any) => e.target.style.display='none'} />
                <span className="text-xs font-bold text-gray-700 group-hover:text-green-600 transition-colors">{match.homeTeam.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <img src={match.awayTeam.logo} alt="" className="w-5 h-5 object-contain" onError={(e: any) => e.target.style.display='none'} />
                <span className="text-xs font-bold text-gray-700 group-hover:text-green-600 transition-colors">{match.awayTeam.name}</span>
              </div>
            </div>

            {/* Score Placeholder */}
            <div className="text-center font-bold text-gray-300">-</div>

            {/* Odds 1 */}
            <div className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-colors ${isHomePrediction ? 'bg-green-100 border-green-200' : 'bg-gray-50/50 border-transparent'}`}>
              <div className="flex items-center gap-0.5">
                {isHomePrediction && (
                  <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                )}
                <span className={`text-[10px] font-bold ${isHomePrediction ? 'text-green-700' : 'text-gray-400'}`}>{match.odds.home.toFixed(2)}</span>
              </div>
              <span className={`text-[11px] font-black ${isHomePrediction ? 'text-green-800' : 'text-gray-900'}`}>{p1}%</span>
            </div>

            {/* Odds X */}
            <div className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-colors ${isDrawPrediction ? 'bg-green-100 border-green-200' : 'bg-gray-50/50 border-transparent'}`}>
              <span className={`text-[10px] font-bold ${isDrawPrediction ? 'text-green-700' : 'text-gray-400'}`}>{match.odds.draw.toFixed(2)}</span>
              <span className={`text-[11px] font-black ${isDrawPrediction ? 'text-green-800' : 'text-gray-900'}`}>{pX}%</span>
            </div>

            {/* Odds 2 */}
            <div className={`flex flex-col items-center justify-center p-1.5 rounded-lg border transition-colors ${isAwayPrediction ? 'bg-green-100 border-green-200' : 'bg-gray-50/50 border-transparent'}`}>
              <div className="flex items-center gap-0.5">
                {isAwayPrediction && (
                  <svg className="w-2.5 h-2.5 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" />
                  </svg>
                )}
                <span className={`text-[10px] font-bold ${isAwayPrediction ? 'text-green-700' : 'text-gray-400'}`}>{match.odds.away.toFixed(2)}</span>
              </div>
              <span className={`text-[11px] font-black ${isAwayPrediction ? 'text-green-800' : 'text-gray-900'}`}>{p2}%</span>
            </div>

            {/* Prediction Box */}
            <div className="bg-[#1a1c1e] text-white p-2 rounded-lg flex flex-col items-center justify-center min-w-[50px] shadow-lg">
              <span className="text-[10px] font-black uppercase tracking-wider">{match.prediction}</span>
              <span className="text-[10px] font-medium opacity-80">{match.predictionOdds}</span>
            </div>
          </div>
          
          {match.description && (
            <div className="mt-4 pt-4 border-t border-dashed border-gray-100 text-[11px] text-gray-500 italic">
              {match.description}
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MatchCard;
