
import React from 'react';
import { matchService } from '../services/matchService';

const OffersSidebar: React.FC = () => {
  const offers = matchService.getOffers();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-6 sticky top-20 transition-colors duration-300">
      <h3 className="font-black text-lg mb-6 text-slate-900 dark:text-white">Offers</h3>
      <div className="space-y-6">
        {offers.map((offer, idx) => (
          <div key={idx} className="border dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm flex flex-col group hover:border-green-500 transition-all">
            <div className="bg-slate-900 dark:bg-slate-800 p-3 flex items-center justify-between">
              <img src={offer.logo} alt={offer.bookmaker} className="h-6 object-contain" />
              <button className="bg-green-500 text-black px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-400">Claim</button>
            </div>
            <div className="p-4">
               <div className="flex flex-col mb-3">
                 <span className="text-sm font-black text-slate-900 dark:text-white">{offer.bonus}</span>
                 {offer.promoCode && <span className="text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase">with promo code {offer.promoCode}</span>}
               </div>
               <p className="text-[10px] text-gray-400 dark:text-gray-400 leading-tight">
                 {offer.description}
               </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffersSidebar;
