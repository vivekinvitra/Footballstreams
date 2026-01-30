
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { footerService } from '../services/footerService';

const Footer: React.FC = () => {
  const [quickLinks, setQuickLinks] = useState<any[]>([]);
  const [supportLinks, setSupportLinks] = useState<any[]>([]);

  useEffect(() => {
    setQuickLinks(footerService.getQuickLinks());
    setSupportLinks(footerService.getSupportLinks());
  }, []);

  return (
    <footer className="bg-white dark:bg-slate-950 border-t dark:border-slate-800 mt-12 py-12 text-gray-600 dark:text-gray-400 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-black italic tracking-tighter text-black dark:text-white">
                FOOTBALL <span className="text-green-500">STREAMS</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed max-w-md">
              Football Streams is your ultimate guide to finding legal ways to watch football matches from across the globe. 
              Get up-to-date fixtures, live scores, and expert analysis for every major league.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-green-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-black dark:text-white mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              {supportLinks.map((link, idx) => (
                <li key={idx}>
                  <Link to={link.path} className="hover:text-green-500 transition-colors">{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t dark:border-slate-800 mt-12 pt-8 text-center text-xs">
          <p>© 2024 Football Streams. All rights reserved. Please gamble responsibly.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
