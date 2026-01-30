
import React from 'react';
import { matchService } from '../services/matchService';

const OffersSidebar: React.FC = () => {
  const offers = matchService.getOffers();

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 sticky top-20">
      <h3 className="font-black text-lg mb-6 text-gray-900">Offers</h3>
      <div className="space-y-6">
        {offers.map((offer, idx) => (
          <div key={idx} className="border rounded-xl overflow-hidden bg-white shadow-sm flex flex-col group hover:border-green-500 transition-all">
            <div className="bg-[#1a1c1e] p-3 flex items-center justify-between">
              <img src={offer.logo} alt={offer.bookmaker} className="h-6 object-contain" />
              <button className="bg-green-500 text-black px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-400">Claim</button>
            </div>
            <div className="p-4">
               <div className="flex flex-col mb-3">
                 <span className="text-sm font-black text-gray-900">{offer.bonus}</span>
                 {offer.promoCode && <span className="text-[10px] text-gray-400 font-bold uppercase">with promo code {offer.promoCode}</span>}
               </div>
               <p className="text-[10px] text-gray-400 leading-tight">
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
