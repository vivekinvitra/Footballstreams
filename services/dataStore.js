
/**
 * Consolidated Data Store
 * Source of truth for all matches, categories, betting offers, and match analysis.
 */

export const getSuperCategories = () => [
  { id: 'Supercat', label: 'Popular', hasBadge: false, type: 'mega' },
  { id: 'Live', label: 'Live', hasBadge: true, type: 'link', path: '/live' },
  { id: 'Category', label: 'All Category', hasBadge: false, type: 'mega' },
  { id: 'International', label: 'International', hasBadge: false, type: 'mega' },
  { id: 'News', label: 'News', hasBadge: false, type: 'mega' },
];

export const getBettingSitesConfig = () => ({
  label: 'Betting sites',
  path: '/' // Linking to home page as it is the "All Category" view
});

export const getPopularCategories = () => [
  {
    categoryName: 'England',
    subCategories: [
      { name: 'English Premier League', icon: 'https://www.footballstreams.com/assets/img/leagues/premierleague.png', country: 'England' },
      { name: 'EFL Championship', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'England' },
      { name: 'FA Cup', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'England' },
    ]
  },
  {
    categoryName: 'Spain',
    subCategories: [
      { name: 'Spanish La Liga', icon: 'https://www.footballstreams.com/assets/img/leagues/laliga.png', country: 'Spain' },
      { name: 'Copa del Rey', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'Spain' },
    ]
  },
  {
    categoryName: 'Germany',
    subCategories: [
      { name: 'Bundesliga', icon: 'https://www.footballstreams.com/assets/img/leagues/bundesliga.png', country: 'Germany' },
      { name: 'DFB Pokal', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'Germany' },
    ]
  },
  {
    categoryName: 'France',
    subCategories: [
      { name: 'French Ligue 1', icon: 'https://www.footballstreams.com/assets/img/leagues/ligue1.png', country: 'France' },
    ]
  },
  {
    categoryName: 'Italy',
    subCategories: [
      { name: 'Italian Serie A', icon: 'https://www.footballstreams.com/assets/img/leagues/seriea.png', country: 'Italy' },
    ]
  }
];

export const getAllCountries = () => [
  "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", 
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", 
  "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "British Virgin Islands", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", 
  "Cambodia", "Cameroon", "Canada", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Chinese Taipei", 
  "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia", "Cuba", "Curacao", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "DR Congo", "Ecuador", "Egypt", "El Salvador", "England", "Equatorial Guinea", 
  "Estonia", "Eswatini", "Ethiopia", "Faroe Islands", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
  "Germany", "Ghana", "Gibraltar", "Greece", "Grenada", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", 
  "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", 
  "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kosovo", "Kuwait"
];

export const getInternationalLeagues = () => [
  { name: 'UEFA Champions League', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'International' },
  { name: 'UEFA Europa League', icon: 'https://www.footballstreams.com/assets/img/leagues/europa-league.png', country: 'International' },
  { name: 'UEFA Europa Conference League', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'International' },
  { name: 'FIFA World Cup', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'International' },
  { name: 'FIFA World Cup qualification (UEFA)', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'International' },
  { name: 'FIFA World Cup qualification (AFC)', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'International' },
  { name: 'UEFA Nations League', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'International' },
  { name: 'Copa América', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'International' },
];

export const getNewsCategories = () => [
  { name: 'Transfer News', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'News' },
  { name: 'Match Previews', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'News' },
  { name: 'Injury Updates', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'News' },
  { name: 'Betting Tips', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'News' },
  { name: 'Live Reports', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'News' },
  { name: 'Manager Interviews', icon: 'https://www.footballstreams.com/assets/img/leagues/default.png', country: 'News' },
];

export const getMegaMenuOffers = () => [
  { name: 'Stake.com', logo: 'https://www.footballstreams.com/assets/img/bookmakers/stake.png', desc: 'Claim the maximum new Stake bonus offer when you join with promo code MAXBET. Deposit $1500. Get $3000. That\'s a 200% bonus. Over 18s only. T&Cs apply.' },
  { name: '1xBet', logo: 'https://www.footballstreams.com/assets/img/bookmakers/1xbet.png', desc: 'Get $30 more bonus when you use the 1xbet code NEWBONUS. T&Cs apply. Over 18s only. Deposit $100, get $130.' },
  { name: 'Linebet', logo: 'https://www.footballstreams.com/assets/img/leagues/default.png', desc: 'Register with Promo code NEWBONUS to unlock special betting rewards and exclusive features.' },
];

export const getSupportLinks = () => [
  { name: 'Privacy Policy', path: '#' },
  { name: 'Terms of Use', path: '#' },
  { name: 'Contact Us', path: '#' },
  { name: 'FAQ', path: '#' },
];

/**
 * Supercat items (formerly Popular Leagues)
 */
export const getSupercatItems = () => [
  { name: 'UEFA Europa League', time: '14 hr', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/europa-league.png' },
  { name: 'Eredivisie', time: '1 day', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/eredivisie.png' },
  { name: 'Bundesliga', time: '1 day', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/bundesliga.png' },
  { name: 'French Ligue 1', time: '1 day', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/ligue1.png' },
  { name: 'Italian Serie A', time: '1 day', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/seriea.png' },
  { name: 'Spanish La Liga', time: '1 day', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/laliga.png' },
  { name: 'English Premier League', time: '2 days', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/premierleague.png' },
  { name: 'Copa del Rey', time: '3 days', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/default.png' },
  { name: 'FA Cup', time: '4 days', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/default.png' },
  { name: 'Champions League', time: '5 days', status: 'upcoming', logo: 'https://www.footballstreams.com/assets/img/leagues/default.png' },
];

/**
 * Generates a set of mock matches covering various leagues.
 */
const generateMockMatches = () => {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  return [
    // World / Europa League
    {
      id: 'europa-1',
      homeTeam: { name: 'Genk', logo: 'https://img.vscore.com/logo/team/krc-genk.png', score: 2 },
      awayTeam: { name: 'Malmoe FF', logo: 'https://img.vscore.com/logo/team/malmo.png', score: 1 },
      time: '01:30',
      date: todayStr,
      league: 'Europa League',
      country: 'World',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/europa-league.png',
      status: 'FINISHED',
      odds: { home: 1.36, draw: 5.60, away: 8.65 },
      prediction: 'W1',
      predictionOdds: '1.36',
    },
    // England / Premier League
    {
      id: 'epl-1',
      homeTeam: { name: 'Manchester City', logo: 'https://img.vscore.com/logo/team/manchester-city.png', score: 3 },
      awayTeam: { name: 'Arsenal', logo: 'https://img.vscore.com/logo/team/arsenal.png', score: 2 },
      time: '20:00',
      date: todayStr,
      league: 'English Premier League',
      country: 'England',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/premierleague.png',
      status: 'LIVE',
      odds: { home: 1.85, draw: 3.50, away: 4.20 },
      prediction: 'W1',
      predictionOdds: '1.85',
    },
    {
      id: 'epl-2',
      homeTeam: { name: 'Liverpool', logo: 'https://img.vscore.com/logo/team/liverpool.png', score: 0 },
      awayTeam: { name: 'Chelsea', logo: 'https://img.vscore.com/logo/team/chelsea.png', score: 0 },
      time: '17:30',
      date: todayStr,
      league: 'English Premier League',
      country: 'England',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/premierleague.png',
      status: 'UPCOMING',
      odds: { home: 1.65, draw: 4.00, away: 5.50 },
      prediction: 'W1',
      predictionOdds: '1.65',
    },
    // Spain / La Liga
    {
      id: 'laliga-1',
      homeTeam: { name: 'Real Madrid', logo: 'https://img.vscore.com/logo/team/real-madrid.png', score: 4 },
      awayTeam: { name: 'Barcelona', logo: 'https://img.vscore.com/logo/team/barcelona.png', score: 1 },
      time: '21:00',
      date: todayStr,
      league: 'Spanish La Liga',
      country: 'Spain',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/laliga.png',
      status: 'FINISHED',
      odds: { home: 2.10, draw: 3.40, away: 3.50 },
      prediction: 'W1',
      predictionOdds: '2.10',
    },
    {
      id: 'laliga-2',
      homeTeam: { name: 'Atletico Madrid', logo: 'https://img.vscore.com/logo/team/atletico-madrid.png', score: 1 },
      awayTeam: { name: 'Sevilla', logo: 'https://img.vscore.com/logo/team/sevilla.png', score: 1 },
      time: '19:00',
      date: todayStr,
      league: 'Spanish La Liga',
      country: 'Spain',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/laliga.png',
      status: 'LIVE',
      odds: { home: 1.75, draw: 3.60, away: 4.80 },
      prediction: 'X',
      predictionOdds: '3.60',
    },
    // Germany / Bundesliga
    {
      id: 'bundesliga-1',
      homeTeam: { name: 'Bayern Munich', logo: 'https://img.vscore.com/logo/team/bayern-munchen.png', score: 2 },
      awayTeam: { name: 'Bayer Leverkusen', logo: 'https://img.vscore.com/logo/team/bayer-leverkusen.png', score: 2 },
      time: '15:30',
      date: todayStr,
      league: 'Bundesliga',
      country: 'Germany',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/bundesliga.png',
      status: 'FINISHED',
      odds: { home: 1.90, draw: 3.75, away: 3.80 },
      prediction: 'X',
      predictionOdds: '3.75',
    },
    {
      id: 'bundesliga-2',
      homeTeam: { name: 'Dortmund', logo: 'https://img.vscore.com/logo/team/borussia-dortmund.png', score: 3 },
      awayTeam: { name: 'RB Leipzig', logo: 'https://img.vscore.com/logo/team/rb-leipzig.png', score: 1 },
      time: '18:30',
      date: todayStr,
      league: 'Bundesliga',
      country: 'Germany',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/bundesliga.png',
      status: 'LIVE',
      odds: { home: 2.25, draw: 3.50, away: 3.10 },
      prediction: 'W1',
      predictionOdds: '2.25',
    },
    // Italy / Serie A
    {
      id: 'seriea-1',
      homeTeam: { name: 'Inter Milan', logo: 'https://img.vscore.com/logo/team/inter-milan.png', score: 1 },
      awayTeam: { name: 'Juventus', logo: 'https://img.vscore.com/logo/team/juventus.png', score: 0 },
      time: '20:45',
      date: todayStr,
      league: 'Italian Serie A',
      country: 'Italy',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/seriea.png',
      status: 'UPCOMING',
      odds: { home: 1.95, draw: 3.25, away: 4.50 },
      prediction: 'W1',
      predictionOdds: '1.95',
    },
    // France / Ligue 1
    {
      id: 'ligue1-1',
      homeTeam: { name: 'PSG', logo: 'https://img.vscore.com/logo/team/paris-saint-germain.png', score: 5 },
      awayTeam: { name: 'Monaco', logo: 'https://img.vscore.com/logo/team/monaco.png', score: 2 },
      time: '21:00',
      date: todayStr,
      league: 'French Ligue 1',
      country: 'France',
      countryFlag: 'https://www.footballstreams.com/assets/img/leagues/ligue1.png',
      status: 'FINISHED',
      odds: { home: 1.45, draw: 4.75, away: 6.50 },
      prediction: 'W1',
      predictionOdds: '1.45',
    },
  ];
};

export const getMatches = async () => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return generateMockMatches();
};

export const getOffers = () => [
  { bookmaker: 'Stake', logo: 'https://www.footballstreams.com/assets/img/bookmakers/stake.png', bonus: 'Deposit $1500 Get $3000', promoCode: 'MAXBET', description: 'Claim the maximum new Stake bonus offer.', claimUrl: '#' },
  { bookmaker: '1XBET', logo: 'https://www.footballstreams.com/assets/img/bookmakers/1xbet.png', bonus: '$130 Bonus', promoCode: 'NEWBONUS', description: 'Get $30 extra bonus.', claimUrl: '#' },
];

export const getMatchAnalysis = (match) => ({
  verdict: `Match Analysis Verdict Placeholder.`,
  editor: { name: 'Lukas Schneider', role: 'Sports Editor', avatar: 'https://i.pravatar.cc/150?u=lukas' },
  matchInfo: { stadium: 'Modern Arena', capacity: '50,000', referee: 'Referee X', weather: 'Clear' },
  bookmakerOdds: [],
  h2hStats: [],
  homeDetailedForm: [],
  awayDetailedForm: [],
  homeFormSummary: { w: 0, d: 0, l: 0 },
  awayFormSummary: { w: 0, d: 0, l: 0 },
  relatedVideos: [],
  bettingOffers: getOffers()
});
