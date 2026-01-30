
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { matchService } from '../services/matchService';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = ['All', 'Team', 'Player', 'Match', 'Competition'];

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [results, setResults] = useState<any[]>([]);
  const overlayRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      inputRef.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  useEffect(() => {
    const performSearch = async () => {
      const searchResults = await matchService.search(query, activeCategory);
      setResults(searchResults);
    };
    performSearch();
  }, [query, activeCategory]);

  const handleItemClick = (item: any) => {
    onClose();
    if (item.type === 'Team') {
      // Navigate to country page as a fallback for teams
      navigate(`/country/${item.country}`);
    } else if (item.type === 'Competition') {
      navigate(`/league/${item.country}/${item.name}`);
    } else if (item.type === 'Match') {
      navigate(`/match/${item.id}`);
    }
    // Players don't have detail pages in the current route map
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 transition-all duration-300 animate-in fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={overlayRef}
        className="w-full max-w-2xl bg-slate-900 dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 animate-in zoom-in-95 duration-200"
      >
        {/* Search Input Area */}
        <div className="p-4 border-b border-slate-800 bg-slate-800/50">
          <div className="relative flex items-center">
            <svg className="absolute left-4 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              ref={inputRef}
              type="text"
              placeholder="Search matches, competitions, teams, players..."
              className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-green-500 transition-colors"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Categories */}
        <div className="p-4 border-b border-slate-800 overflow-x-auto custom-scrollbar">
          <div className="flex items-center space-x-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? 'bg-white text-slate-900' : 'bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results Area */}
        <div className="max-h-[500px] overflow-y-auto custom-scrollbar p-2">
          <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
            {query ? 'Results' : 'Suggested'}
          </div>
          
          <div className="space-y-1">
            {results.length > 0 ? results.map((item) => (
              <div 
                key={item.id} 
                className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer group transition-all"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden">
                    <img src={item.logo} alt="" className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white group-hover:text-green-500 transition-colors">{item.name}</span>
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-black text-green-500 uppercase px-1.5 py-0.5 bg-green-500/10 rounded">{item.type}</span>
                        {item.followers && (
                          <span className="text-[10px] font-bold text-gray-400 flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                            {item.followers}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <img src={item.flag} alt="" className="w-4 h-3 object-cover rounded-[1px]" />
                      <span className="text-[10px] font-bold text-gray-500 uppercase">{item.country}</span>
                      {item.subtitle && (
                        <>
                          <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
                          <span className="text-[10px] font-bold text-gray-400">{item.subtitle}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-yellow-500 transition-colors" onClick={(e) => e.stopPropagation()}>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </button>
              </div>
            )) : (
              <div className="p-8 text-center">
                <p className="text-gray-500 font-bold">No results found for "{query}"</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
