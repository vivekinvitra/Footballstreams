
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { matchService } from '../services/matchService';

const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Data from service
  const [superCategories, setSuperCategories] = useState<any[]>([]);
  const [popularCategories, setPopularCategories] = useState<any[]>([]);
  const [allOtherCategories, setAllOtherCategories] = useState<string[]>([]);
  const [internationalLeagues, setInternationalLeagues] = useState<any[]>([]);
  const [newsCategories, setNewsCategories] = useState<any[]>([]);
  const [bestSportsOffers, setBestSportsOffers] = useState<any[]>([]);
  const [bettingSitesLink, setBettingSitesLink] = useState<any>({ label: 'Betting sites', path: '/' });
  const [liveMatchCount, setLiveMatchCount] = useState(0);

  useEffect(() => {
    // Populate header data from service
    setSuperCategories(matchService.getSuperCategories());
    setPopularCategories(matchService.getPopularCategories());
    setAllOtherCategories(matchService.getAllCategories());
    setInternationalLeagues(matchService.getInternationalLeagues());
    setNewsCategories(matchService.getNewsCategories());
    setBestSportsOffers(matchService.getMegaMenuOffers());
    setBettingSitesLink(matchService.getBettingSitesLink());
    
    // Fetch live count
    matchService.getLiveMatches().then(matches => setLiveMatchCount(matches.length));
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (supercat: any) => {
    if (supercat.type === 'link') {
      setActiveMenu(null);
      navigate(supercat.path);
    } else {
      setActiveMenu(activeMenu === supercat.id ? null : supercat.id);
    }
  };

  return (
    <header className="bg-[#1a1c1e] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-8">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setActiveMenu(null)}>
            <span className="text-2xl font-black italic tracking-tighter">
              FOOTBALL <span className="text-green-500">STREAMS</span>
            </span>
            <div className="bg-green-500 rounded p-0.5">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {superCategories.map((supercat) => (
              <div 
                key={supercat.id}
                className={`flex items-center cursor-pointer transition-colors group ${activeMenu === supercat.id ? 'text-green-500' : 'hover:text-green-500'}`}
                onClick={() => handleNavClick(supercat)}
              >
                <span>{supercat.label}</span>
                {supercat.hasBadge && (
                  <span className="ml-1 bg-green-500 text-black text-[10px] px-1 rounded font-bold">
                    {liveMatchCount}
                  </span>
                )}
                {supercat.type === 'mega' && (
                  <svg className={`w-4 h-4 ml-1 transition-transform ${activeMenu === supercat.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                )}
              </div>
            ))}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-800 rounded-full transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <Link 
            to={bettingSitesLink.path} 
            className="bg-green-500 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-400 transition-colors hidden sm:block"
          >
            {bettingSitesLink.label}
          </Link>
        </div>
      </div>

      {/* Mega Menu Overlay */}
      {activeMenu && (
        <div ref={menuRef} className="absolute top-16 left-0 w-full bg-white text-gray-900 border-b shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="flex gap-12">
              
              {/* Main List Section */}
              <div className="flex-1">
                {activeMenu === 'Supercat' ? (
                  <div className="grid grid-cols-5 gap-8">
                    {popularCategories.map((cat: any) => (
                      <div key={cat.categoryName} className="space-y-4">
                        <Link 
                          to={`/country/${cat.categoryName}`} 
                          className="block text-sm font-black text-gray-900 hover:text-green-600 transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          {cat.categoryName}
                        </Link>
                        <div className="h-[2px] bg-gray-100 w-full"></div>
                        <ul className="space-y-3">
                          {cat.subCategories.map((sub: any) => (
                            <li key={sub.name}>
                              <Link 
                                to={`/league/${sub.country}/${sub.name}`}
                                className="flex items-center space-x-3 group"
                                onClick={() => setActiveMenu(null)}
                              >
                                <img 
                                  src={sub.icon} 
                                  alt="" 
                                  className="w-4 h-4 object-contain group-hover:scale-110 transition-transform" 
                                  onError={(e: any) => e.target.src = 'https://www.footballstreams.com/assets/img/leagues/default.png'}
                                />
                                <span className="text-[12px] font-bold text-gray-600 group-hover:text-black transition-colors">
                                  {sub.name}
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                ) : activeMenu === 'Category' ? (
                  <div className="flex flex-col h-full">
                    <h3 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-wider">All Categories</h3>
                    <div className="grid grid-cols-2 gap-y-3 gap-x-12 custom-scrollbar overflow-y-auto max-h-[400px] pr-4">
                      {allOtherCategories.map((country) => (
                        <Link 
                          key={country}
                          to={`/country/${country}`}
                          className="text-[13px] font-bold text-gray-600 hover:text-green-600 transition-colors"
                          onClick={() => setActiveMenu(null)}
                        >
                          {country}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : activeMenu === 'International' ? (
                  <div>
                    <h3 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-wider">International</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                      {internationalLeagues.map((league: any) => (
                        <Link 
                          key={league.name} 
                          to={`/league/${league.country}/${league.name}`}
                          className="flex items-center space-x-3 group cursor-pointer"
                          onClick={() => setActiveMenu(null)}
                        >
                          <img src={league.icon} alt="" className="w-5 h-5 object-contain" onError={(e: any) => e.target.src = 'https://www.footballstreams.com/assets/img/leagues/default.png'} />
                          <span className="text-[12px] font-bold text-gray-600 group-hover:text-black transition-colors">{league.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : activeMenu === 'News' ? (
                  <div>
                    <h3 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-wider">News</h3>
                    <div className="grid grid-cols-2 gap-y-4 gap-x-12">
                      {newsCategories.map((cat: any) => (
                        <Link 
                          key={cat.name} 
                          to={`/league/${cat.country}/${cat.name}`}
                          className="flex items-center space-x-3 group cursor-pointer"
                          onClick={() => setActiveMenu(null)}
                        >
                          <img src={cat.icon} alt="" className="w-5 h-5 object-contain" onError={(e: any) => e.target.src = 'https://www.footballstreams.com/assets/img/leagues/default.png'} />
                          <span className="text-[12px] font-bold text-gray-600 group-hover:text-black transition-colors">{cat.name}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>

              {/* Sidebar Sidebar */}
              <div className="w-80 border-l pl-12">
                <h3 className="text-sm font-black text-gray-900 mb-6 uppercase tracking-wider">Best Sports:</h3>
                <div className="space-y-6">
                  {bestSportsOffers.map((offer: any) => (
                    <div key={offer.name} className="bg-gray-50 rounded-xl p-4 border border-transparent hover:border-green-200 transition-all cursor-pointer group">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <img src={offer.logo} alt="" className="h-6 object-contain" />
                          <span className="text-sm font-black text-gray-900">{offer.name}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" />
                        </svg>
                      </div>
                      <p className="text-[10px] text-gray-400 leading-snug font-medium line-clamp-3">
                        {offer.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-12 flex justify-center">
              <button 
                className="w-full max-w-5xl bg-green-500 hover:bg-green-600 text-black font-black py-4 rounded-xl text-sm transition-all shadow-lg"
                onClick={() => {
                   setActiveMenu(null);
                   navigate('/');
                }}
              >
                View all Categories
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
