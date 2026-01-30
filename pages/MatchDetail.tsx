
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { matchService } from '../services/matchService';
import { Match, MatchAnalysis, BettingOffer } from '../types';

const Breadcrumbs: React.FC<{ match: Match }> = ({ match }) => (
  <div className="bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-900">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
        <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
        <span>»</span>
        <span className="hover:text-green-500 cursor-pointer">{match.country}</span>
        <span>»</span>
        <span className="hover:text-green-500 cursor-pointer">{match.league}</span>
        <span>»</span>
        <span className="text-white">{match.homeTeam.name} vs {match.awayTeam.name}</span>
      </div>
    </div>
  </div>
);

const MatchHero: React.FC<{ match: Match }> = ({ match }) => (
  <div className="bg-slate-900 dark:bg-black text-white py-12 border-b border-gray-800 dark:border-slate-900 relative overflow-hidden transition-colors duration-300">
    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
    <div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
      <h1 className="text-2xl sm:text-3xl font-black mb-12">
        {match.homeTeam.name} vs {match.awayTeam.name} Live Stream - Stats and Predictions
      </h1>
      
      <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-16 space-y-8 sm:space-y-0">
        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full p-2 shadow-2xl mb-4 flex items-center justify-center">
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-black">{match.homeTeam.name}</h2>
        </div>

        <div className="flex flex-col items-center">
          <div className="text-sm font-bold text-green-500 mb-2">{match.date} • {match.league}</div>
          <div className="text-5xl font-black tracking-tighter mb-2">{match.time} GMT</div>
          <p className="max-w-md text-xs text-gray-400 font-medium leading-relaxed">
            {match.description}
          </p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-24 h-24 bg-white rounded-full p-2 shadow-2xl mb-4 flex items-center justify-center">
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-full h-full object-contain" />
          </div>
          <h2 className="text-xl font-black">{match.awayTeam.name}</h2>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mt-16">
        {['Verdict', 'Stream', 'Prediction', 'Odds', 'Head-to-Head', 'Team Form', 'Match Info'].map((tab, i) => (
          <button key={tab} className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${i === 0 ? 'bg-green-500 text-black shadow-lg shadow-green-500/20' : 'bg-gray-800 dark:bg-slate-800 text-white hover:bg-gray-700 dark:hover:bg-slate-700'}`}>
            {tab}
          </button>
        ))}
      </div>
    </div>
  </div>
);

const VerdictCard: React.FC<{ analysis: MatchAnalysis }> = ({ analysis }) => (
  <div className="bg-slate-900 dark:bg-slate-800/50 text-white rounded-2xl overflow-hidden mb-8 shadow-xl transition-colors duration-300">
    <div className="p-6 sm:p-8">
      <div className="flex items-center space-x-4 mb-6">
        <img src={analysis.editor.avatar} alt="" className="w-14 h-14 rounded-full border-2 border-green-500 shadow-lg shadow-green-500/20" />
        <div>
          <h3 className="text-lg font-black">{analysis.editor.name}'s Verdict</h3>
          <p className="text-xs text-gray-400 font-bold uppercase">{analysis.editor.role}</p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <p className="text-sm text-gray-300 leading-relaxed font-medium flex-1">
          {analysis.verdict}
        </p>
        <button className="whitespace-nowrap bg-green-500 text-black px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20">
          Place Bet 
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
        </button>
      </div>
    </div>
  </div>
);

const PredictionTable: React.FC<{ match: Match }> = ({ match }) => (
  <div className="mb-12">
    <h3 className="text-lg font-black mb-6 text-slate-900 dark:text-white">1X2 prediction for {match.homeTeam.name} vs {match.awayTeam.name} match</h3>
    <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-300">
      <table className="w-full text-xs font-bold">
        <thead>
          <tr className="bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 border-b dark:border-slate-800">
            <th className="py-3 px-4 text-left">Game</th>
            <th className="py-3 px-4 text-center">1</th>
            <th className="py-3 px-4 text-center">X</th>
            <th className="py-3 px-4 text-center">2</th>
            <th className="py-3 px-4 text-center">Prediction</th>
          </tr>
        </thead>
        <tbody className="divide-y dark:divide-slate-800">
          <tr>
            <td className="py-4 px-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <img src={match.homeTeam.logo} alt="" className="w-4 h-4 object-contain" /> {match.homeTeam.name}
                  <span className="text-slate-900 dark:text-white ml-auto">0</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                  <img src={match.awayTeam.logo} alt="" className="w-4 h-4 object-contain" /> {match.awayTeam.name}
                  <span className="text-slate-900 dark:text-white ml-auto">0</span>
                </div>
              </div>
            </td>
            <td className="p-2">
              <div className="bg-gray-50 dark:bg-slate-800/50 p-2 rounded text-center">
                <div className="text-gray-400 dark:text-gray-500">3.89</div>
                <div className="text-slate-900 dark:text-white">26%</div>
              </div>
            </td>
            <td className="p-2">
              <div className="bg-gray-50 dark:bg-slate-800/50 p-2 rounded text-center">
                <div className="text-gray-400 dark:text-gray-500">3.75</div>
                <div className="text-slate-900 dark:text-white">27%</div>
              </div>
            </td>
            <td className="p-2">
              <div className="bg-green-100 dark:bg-green-950/30 p-2 rounded text-center border border-green-200 dark:border-green-900/50">
                <div className="text-green-700 dark:text-green-400 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" /></svg>
                  1.95
                </div>
                <div className="text-green-800 dark:text-green-300">51%</div>
              </div>
            </td>
            <td className="p-2">
              <div className="bg-slate-900 dark:bg-slate-800 text-white p-2 rounded text-center">
                <div>W2</div>
                <div>1.95</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const BettingOfferCard: React.FC<{ offer: BettingOffer }> = ({ offer }) => (
  <div className="border dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm flex flex-col gap-3 group hover:border-green-500 transition-all">
    <div className="flex items-center justify-between">
      <img src={offer.logo} alt={offer.bookmaker} className="h-6 object-contain" />
      <div className="flex flex-col items-end">
        <span className="text-xs font-black text-slate-900 dark:text-white">{offer.bonus}</span>
        {offer.promoCode && <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">Code: {offer.promoCode}</span>}
      </div>
      <button className="bg-green-500 text-black px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-400 transition-colors shadow-sm">Claim</button>
    </div>
    <p className="text-[10px] text-gray-400 dark:text-gray-500 leading-tight">
      {offer.description}
    </p>
  </div>
);

const MatchDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [match, setMatch] = useState<Match | null>(null);
  const [analysis, setAnalysis] = useState<MatchAnalysis | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        const found = await matchService.getMatchById(id);
        if (found) {
          setMatch(found as Match);
          const analysisData = await matchService.getMatchAnalysis(found);
          setAnalysis(analysisData as MatchAnalysis);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return (
    <div className="flex-1 flex items-center justify-center py-20 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
    </div>
  );
  
  if (!match || !analysis) return (
    <div className="flex-1 flex flex-col items-center justify-center py-20 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">Match Analysis Missing</h2>
      <Link to="/" className="bg-green-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors">Back to Fixtures</Link>
    </div>
  );

  return (
    <div className="w-full flex-1 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
      <Breadcrumbs match={match} />
      <MatchHero match={match} />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <VerdictCard analysis={analysis} />
            <PredictionTable match={match} />
            
            <div className="bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-8 mb-8 text-center transition-colors duration-300">
              <h3 className="text-lg font-black mb-4 text-slate-900 dark:text-white">{match.homeTeam.name} vs {match.awayTeam.name} Football Score</h3>
              <div className="flex items-center justify-center gap-12 border-t dark:border-slate-800 pt-8">
                <div className="flex flex-col items-center gap-2">
                  <img src={match.homeTeam.logo} alt="" className="w-10 h-10 object-contain" />
                  <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">{match.homeTeam.name}</span>
                </div>
                <div className="text-center">
                   <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-2">
                     {match.status === 'LIVE' as any ? 'In Progress' : 'Not started'}
                   </div>
                   <div className="text-2xl font-black text-slate-900 dark:text-white">
                     {match.status === 'LIVE' as any ? `${match.homeTeam.score} - ${match.awayTeam.score}` : 'VS'}
                   </div>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <img src={match.awayTeam.logo} alt="" className="w-10 h-10 object-contain" />
                  <span className="text-xs font-bold uppercase text-slate-700 dark:text-slate-300">{match.awayTeam.name}</span>
                </div>
              </div>
            </div>
          </div>

          <aside className="w-full lg:w-80 space-y-8">
            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-4">Related Videos</h3>
              <div className="space-y-6">
                {analysis.relatedVideos.map(video => (
                  <div key={video.id} className="group cursor-pointer">
                    <div className="relative mb-2 rounded-xl overflow-hidden shadow-sm">
                      <img src={video.thumbnail} alt="" className="w-full aspect-video object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-green-500 transition-colors">{video.title}</h4>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">{video.team}</span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">{video.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-sm p-6 transition-colors duration-300">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-4">Offers</h3>
              <div className="space-y-4">
                {analysis.bettingOffers.map((offer, idx) => (
                  <BettingOfferCard key={idx} offer={offer} />
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
