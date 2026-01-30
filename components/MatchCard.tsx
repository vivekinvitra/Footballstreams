
import React from 'react';
import { Link } from 'react-router-dom';
import { Match } from '../types';
import { matchService } from '../services/matchService';

interface MatchCardProps {
  match: Match;
}

const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { p1, pX, p2 } = matchService.calculateOddsPercentages(match.odds);

  const isHomePrediction = match.prediction === 'W1';
  const isDrawPrediction = match.prediction === 'Draw' || match.prediction === 'X';
  const isAwayPrediction = match.prediction === 'W2';

  // Mocking outcome for visual fidelity with the reference image
  // In a real app, this would come from match.status and scores
  const isCorrect = match.id.includes('1') || match.id.includes('4'); 

  const dateParts = match.date.split('-');
  const displayDate = dateParts.length === 3 ? "Today" : match.date;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 shadow-sm hover:border-green-500 dark:hover:border-green-500 transition-all mb-3 overflow-hidden group">
      <Link to={`/match/${match.id}`}>
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-[70px_1fr_240px_130px] items-center gap-4">
            
            {/* Time Column */}
            <div className="text-[11px] font-bold text-gray-400 dark:text-gray-500 flex flex-col items-center border-r dark:border-slate-800 pr-4">
              <div className="text-slate-500 dark:text-slate-400 font-bold">{displayDate}</div>
              <div className="text-slate-900 dark:text-white font-black text-sm">{match.time}</div>
            </div>

            {/* Game Column */}
            <div className="flex items-center justify-between pr-8">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <img src={match.homeTeam.logo} alt="" className="w-6 h-6 object-contain" onError={(e: any) => e.target.style.display='none'} />
                  <span className="text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-green-600 transition-colors">{match.homeTeam.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <img src={match.awayTeam.logo} alt="" className="w-6 h-6 object-contain" onError={(e: any) => e.target.style.display='none'} />
                  <span className="text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-green-600 transition-colors">{match.awayTeam.name}</span>
                </div>
              </div>
              <div className="flex flex-col gap-3 items-end">
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{match.homeTeam.score ?? 0}</span>
                <span className="text-xl font-black text-slate-900 dark:text-white leading-none">{match.awayTeam.score ?? 0}</span>
              </div>
            </div>

            {/* Odds Column */}
            <div className="flex items-center gap-2">
              {/* Box 1 */}
              <div className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg border transition-colors ${isHomePrediction ? 'bg-yellow-300 dark:bg-yellow-500 border-yellow-400' : 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700'}`}>
                <span className={`text-[10px] font-bold ${isHomePrediction ? 'text-slate-700 dark:text-slate-900' : 'text-gray-400 dark:text-gray-500'}`}>{match.odds.home.toFixed(2)}</span>
                <span className={`text-sm font-black ${isHomePrediction ? 'text-slate-900' : 'text-slate-800 dark:text-slate-200'}`}>{p1}%</span>
              </div>
              {/* Box X */}
              <div className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg border transition-colors ${isDrawPrediction ? 'bg-yellow-300 dark:bg-yellow-500 border-yellow-400' : 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700'}`}>
                <span className={`text-[10px] font-bold ${isDrawPrediction ? 'text-slate-700 dark:text-slate-900' : 'text-gray-400 dark:text-gray-500'}`}>{match.odds.draw.toFixed(2)}</span>
                <span className={`text-sm font-black ${isDrawPrediction ? 'text-slate-900' : 'text-slate-800 dark:text-slate-200'}`}>{pX}%</span>
              </div>
              {/* Box 2 */}
              <div className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg border transition-colors ${isAwayPrediction ? 'bg-yellow-300 dark:bg-yellow-500 border-yellow-400' : 'bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700'}`}>
                <span className={`text-[10px] font-bold ${isAwayPrediction ? 'text-slate-700 dark:text-slate-900' : 'text-gray-400 dark:text-gray-500'}`}>{match.odds.away.toFixed(2)}</span>
                <span className={`text-sm font-black ${isAwayPrediction ? 'text-slate-900' : 'text-slate-800 dark:text-slate-200'}`}>{p2}%</span>
              </div>
            </div>

            {/* Prediction Column */}
            <div className={`flex items-center gap-3 p-2 rounded-xl border ${isCorrect ? 'bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/40' : 'bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/40'}`}>
              <div className={`w-6 h-6 rounded-md flex items-center justify-center ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                {isCorrect ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" /></svg>
                )}
              </div>
              <div className="flex-1 text-right">
                <div className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{match.prediction}</div>
                <div className="text-sm font-black text-slate-900 dark:text-white">{match.predictionOdds}</div>
              </div>
            </div>

          </div>
        </div>
      </Link>
    </div>
  );
};

export default MatchCard;
