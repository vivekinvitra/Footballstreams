
import React, { useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import SEO from '../components/SEO';

const FooterDetails: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;

  const content = useMemo(() => {
    switch (path) {
      case '/privacy-policy':
        return {
          title: 'Privacy Policy',
          body: (
            <div className="space-y-6">
              <p>Last updated: June 2024</p>
              <section>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">1. Information We Collect</h2>
                <p>We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and any other information you choose to provide.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">2. Use of Information</h2>
                <p>We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on Football Streams.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">3. Cookies</h2>
                <p>We use cookies and similar technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.</p>
              </section>
            </div>
          )
        };
      case '/terms-of-use':
        return {
          title: 'Terms of Use',
          body: (
            <div className="space-y-6">
              <p>Last updated: June 2024</p>
              <section>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">1. Agreement to Terms</h2>
                <p>By accessing or using Football Streams, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our services.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">2. Intellectual Property</h2>
                <p>The content, features, and functionality of Football Streams are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>
              </section>
              <section>
                <h2 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">3. User Conduct</h2>
                <p>You agree not to use Football Streams for any unlawful purpose or in any way that interrupts, damages, or impairs our service.</p>
              </section>
            </div>
          )
        };
      case '/contact-us':
        return {
          title: 'Contact US',
          body: (
            <div className="space-y-8">
              <p>Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out to our team directly.</p>
              <form className="space-y-4 max-w-lg" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300">Name</label>
                  <input type="text" className="w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors dark:text-white" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300">Email</label>
                  <input type="email" className="w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors dark:text-white" placeholder="Your Email" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300">Message</label>
                  <textarea rows={4} className="w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors dark:text-white" placeholder="How can we help?"></textarea>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-black font-black px-8 py-3 rounded-xl text-sm transition-all shadow-lg">
                  Send Message
                </button>
              </form>
              <div className="pt-8 border-t dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white mb-2">Other ways to connect:</h3>
                <p className="text-sm">Email: support@footballstreams.com</p>
                <p className="text-sm">Twitter: @FootballStreams</p>
              </div>
            </div>
          )
        };
      case '/faq':
        return {
          title: 'Frequently Asked Questions',
          body: (
            <div className="space-y-6">
              <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Is Football Streams free to use?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Yes, our platform is free for all users. We provide schedules, scores, and analysis without requiring a subscription.</p>
              </section>
              <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">Do you host the live streams?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">No, Football Streams does not host any video content. We provide a guide to official and legal streaming sources where you can watch the matches.</p>
              </section>
              <section className="bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm">
                <h2 className="text-lg font-bold mb-2 text-slate-900 dark:text-white">How often are scores updated?</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">Live scores are updated in real-time. Our data feeds are refreshed constantly to ensure you never miss a goal.</p>
              </section>
            </div>
          )
        };
      default:
        return { title: 'Not Found', body: <p>The page you are looking for does not exist.</p> };
    }
  }, [path]);

  return (
    <div className="w-full flex-1 bg-gray-100 dark:bg-slate-950 transition-colors duration-300">
      <SEO title={`${content.title} — Football Streams`} description={`${content.title} for Football Streams: details, policies and contact information.`} keywords={`${content.title}, football, policy`} />
      <div className="bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400">
            <Link to="/" className="hover:text-green-500 transition-colors">Home</Link>
            <span>»</span>
            <span className="text-white">{content.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-12">{content.title}</h1>
        <div className="prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-400">
          {content.body}
        </div>
      </div>
    </div>
  );
};

export default FooterDetails;
