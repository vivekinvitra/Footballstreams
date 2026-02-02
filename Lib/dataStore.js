
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
      { name: 'English Premier League', icon: 'assets/img/leagues/premierleague.png', country: 'England' },
      { name: 'EFL Championship', icon: 'assets/img/leagues/default.png', country: 'England' },
      { name: 'FA Cup', icon: 'assets/img/leagues/default.png', country: 'England' },
    ]
  },
  {
    categoryName: 'Spain',
    subCategories: [
      { name: 'Spanish La Liga', icon: 'assets/img/leagues/laliga.png', country: 'Spain' },
      { name: 'Copa del Rey', icon: 'assets/img/leagues/default.png', country: 'Spain' },
    ]
  },
  {
    categoryName: 'Germany',
    subCategories: [
      { name: 'Bundesliga', icon: 'assets/img/leagues/bundesliga.png', country: 'Germany' },
      { name: 'DFB Pokal', icon: 'assets/img/leagues/default.png', country: 'Germany' },
    ]
  },
  {
    categoryName: 'France',
    subCategories: [
      { name: 'French Ligue 1', icon: 'assets/img/leagues/ligue1.png', country: 'France' },
    ]
  },
  {
    categoryName: 'Italy',
    subCategories: [
      { name: 'Italian Serie A', icon: 'assets/img/leagues/seriea.png', country: 'Italy' },
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
  { name: 'UEFA Champions League', icon: 'assets/img/leagues/default.png', country: 'International' },
  { name: 'UEFA Europa League', icon: 'assets/img/leagues/europa-league.png', country: 'International' },
  { name: 'UEFA Europa Conference League', icon: 'assets/img/leagues/default.png', country: 'International' },
  { name: 'FIFA World Cup', icon: 'assets/img/leagues/default.png', country: 'International' },
  { name: 'FIFA World Cup qualification (UEFA)', icon: 'assets/img/leagues/default.png', country: 'International' },
  { name: 'FIFA World Cup qualification (AFC)', icon: 'assets/img/leagues/default.png', country: 'International' },
  { name: 'UEFA Nations League', icon: 'assets/img/leagues/default.png', country: 'International' },
  { name: 'Copa América', icon: 'assets/img/leagues/default.png', country: 'International' },
];

export const getNewsCategories = () => [
  { name: 'Transfer News', icon: 'assets/img/leagues/default.png', country: 'News' },
  { name: 'Match Previews', icon: 'assets/img/leagues/default.png', country: 'News' },
  { name: 'Injury Updates', icon: 'assets/img/leagues/default.png', country: 'News' },
  { name: 'Betting Tips', icon: 'assets/img/leagues/default.png', country: 'News' },
  { name: 'Live Reports', icon: 'assets/img/leagues/default.png', country: 'News' },
  { name: 'Manager Interviews', icon: 'assets/img/leagues/default.png', country: 'News' },
];

export const getMegaMenuOffers = () => [
  { name: 'Stake.com', logo: 'assets/img/bookmakers/stake.png', desc: 'Claim the maximum new Stake bonus offer when you join with promo code MAXBET. Deposit $1500. Get $3000. That\'s a 200% bonus. Over 18s only. T&Cs apply.' },
  { name: '1xBet', logo: 'assets/img/bookmakers/1xbet.png', desc: 'Get $30 more bonus when you use the 1xbet code NEWBONUS. T&Cs apply. Over 18s only. Deposit $100, get $130.' },
  { name: 'Linebet', logo: 'assets/img/leagues/default.png', desc: 'Register with Promo code NEWBONUS to unlock special betting rewards and exclusive features.' },
];

export const getSupportLinks = () => [
  { name: 'Privacy Policy', path: '/privacy-policy' },
  { name: 'Term', path: '/terms-of-use' },
  { name: 'Contact US', path: '/contact-us' },
  { name: 'FAQ', path: '/faq' },
];

export const getFooterQuickLinks = () => [
  { name: 'Premier League', path: '/league/England/English Premier League' },
  { name: 'La Liga', path: '/league/Spain/Spanish La Liga' },
  { name: 'Bundesliga', path: '/league/Germany/Bundesliga' },
  { name: 'Champions League', path: '/league/International/UEFA Champions League' }
];

/**
 * Supercat items (formerly Popular Leagues)
 */
export const getSupercatItems = () => [
  { name: 'UEFA Europa League', time: '14 hr', status: 'upcoming', logo: 'assets/img/leagues/europa-league.png', country: 'International' },
  { name: 'Eredivisie', time: '1 day', status: 'upcoming', logo: 'assets/img/leagues/eredivisie.png', country: 'Netherlands' },
  { name: 'Bundesliga', time: '1 day', status: 'upcoming', logo: 'assets/img/leagues/bundesliga.png', country: 'Germany' },
  { name: 'French Ligue 1', time: '1 day', status: 'upcoming', logo: 'assets/img/leagues/ligue1.png', country: 'France' },
  { name: 'Italian Serie A', time: '1 day', status: 'upcoming', logo: 'assets/img/leagues/seriea.png', country: 'Italy' },
  { name: 'Spanish La Liga', time: '1 day', status: 'upcoming', logo: 'assets/img/leagues/laliga.png', country: 'Spain' },
  { name: 'English Premier League', time: '2 days', status: 'upcoming', logo: 'assets/img/leagues/premierleague.png', country: 'England' },
  { name: 'Copa del Rey', time: '3 days', status: 'upcoming', logo: 'assets/img/leagues/default.png', country: 'Spain' },
  { name: 'FA Cup', time: '4 days', status: 'upcoming', logo: 'assets/img/leagues/default.png', country: 'England' },
  { name: 'UEFA Champions League', time: '5 days', status: 'upcoming', logo: 'assets/img/leagues/default.png', country: 'International' },
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
      homeTeam: { name: 'Genk', logo: 'assets/logo/team/krc-genk.png', score: 2 },
      awayTeam: { name: 'Malmoe FF', logo: 'assets/logo/team/malmo.png', score: 1 },
      time: '01:30',
      date: todayStr,
      league: 'Europa League',
      country: 'World',
      countryFlag: 'assets/img/leagues/europa-league.png',
      status: 'FINISHED',
      odds: { home: 1.36, draw: 5.60, away: 8.65 },
      prediction: 'W1',
      predictionOdds: '1.36',
    },
    // England / Premier League
    {
      id: 'epl-1',
      homeTeam: { name: 'Manchester City', logo: 'assets/logo/team/manchester-city.png', score: 3 },
      awayTeam: { name: 'Arsenal', logo: 'assets/logo/team/arsenal.png', score: 2 },
      time: '20:00',
      date: todayStr,
      league: 'English Premier League',
      country: 'England',
      countryFlag: 'assets/img/leagues/premierleague.png',
      status: 'LIVE',
      odds: { home: 1.85, draw: 3.50, away: 4.20 },
      prediction: 'W1',
      predictionOdds: '1.85',
    },
    {
      id: 'epl-2',
      homeTeam: { name: 'Liverpool', logo: 'assets/logo/team/liverpool.png', score: 0 },
      awayTeam: { name: 'Chelsea', logo: 'assets/logo/team/chelsea.png', score: 0 },
      time: '17:30',
      date: todayStr,
      league: 'English Premier League',
      country: 'England',
      countryFlag: 'assets/img/leagues/premierleague.png',
      status: 'UPCOMING',
      odds: { home: 1.65, draw: 4.00, away: 5.50 },
      prediction: 'W1',
      predictionOdds: '1.65',
    },
    // Spain / La Liga
    {
      id: 'laliga-1',
      homeTeam: { name: 'Real Madrid', logo: 'assets/logo/team/real-madrid.png', score: 4 },
      awayTeam: { name: 'Barcelona', logo: 'assets/logo/team/barcelona.png', score: 1 },
      time: '21:00',
      date: todayStr,
      league: 'Spanish La Liga',
      country: 'Spain',
      countryFlag: 'assets/img/leagues/laliga.png',
      status: 'FINISHED',
      odds: { home: 2.10, draw: 3.40, away: 3.50 },
      prediction: 'W1',
      predictionOdds: '2.10',
    },
    {
      id: 'laliga-2',
      homeTeam: { name: 'Atletico Madrid', logo: 'assets/logo/team/atletico-madrid.png', score: 1 },
      awayTeam: { name: 'Sevilla', logo: 'assets/logo/team/sevilla.png', score: 1 },
      time: '19:00',
      date: todayStr,
      league: 'Spanish La Liga',
      country: 'Spain',
      countryFlag: 'assets/img/leagues/laliga.png',
      status: 'LIVE',
      odds: { home: 1.75, draw: 3.60, away: 4.80 },
      prediction: 'X',
      predictionOdds: '3.60',
    },
    // Germany / Bundesliga
    {
      id: 'bundesliga-1',
      homeTeam: { name: 'Bayern Munich', logo: 'assets/logo/team/bayern-munchen.png', score: 2 },
      awayTeam: { name: 'Bayer Leverkusen', logo: 'assets/logo/team/bayer-leverkusen.png', score: 2 },
      time: '15:30',
      date: todayStr,
      league: 'Bundesliga',
      country: 'Germany',
      countryFlag: 'assets/img/leagues/bundesliga.png',
      status: 'FINISHED',
      odds: { home: 1.90, draw: 3.75, away: 3.80 },
      prediction: 'X',
      predictionOdds: '3.75',
    },
    {
      id: 'bundesliga-2',
      homeTeam: { name: 'Dortmund', logo: 'assets/logo/team/borussia-dortmund.png', score: 3 },
      awayTeam: { name: 'RB Leipzig', logo: 'assets/logo/team/rb-leipzig.png', score: 1 },
      time: '18:30',
      date: todayStr,
      league: 'Bundesliga',
      country: 'Germany',
      countryFlag: 'assets/img/leagues/bundesliga.png',
      status: 'LIVE',
      odds: { home: 2.25, draw: 3.50, away: 3.10 },
      prediction: 'W1',
      predictionOdds: '2.25',
    },
    // Italy / Serie A
    {
      id: 'seriea-1',
      homeTeam: { name: 'Inter Milan', logo: 'assets/logo/team/inter-milan.png', score: 1 },
      awayTeam: { name: 'Juventus', logo: 'assets/logo/team/juventus.png', score: 0 },
      time: '20:45',
      date: todayStr,
      league: 'Italian Serie A',
      country: 'Italy',
      countryFlag: 'assets/img/leagues/seriea.png',
      status: 'UPCOMING',
      odds: { home: 1.95, draw: 3.25, away: 4.50 },
      prediction: 'W1',
      predictionOdds: '1.95',
    },
    // France / Ligue 1
    {
      id: 'ligue1-1',
      homeTeam: { name: 'PSG', logo: 'assets/logo/team/paris-saint-germain.png', score: 5 },
      awayTeam: { name: 'Monaco', logo: 'assets/logo/team/monaco.png', score: 2 },
      time: '21:00',
      date: todayStr,
      league: 'French Ligue 1',
      country: 'France',
      countryFlag: 'assets/img/leagues/ligue1.png',
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
  { bookmaker: 'Stake', logo: 'assets/img/bookmakers/stake.png', bonus: 'Deposit $1500 Get $3000', promoCode: 'MAXBET', description: 'Claim the maximum new Stake bonus offer.', claimUrl: '#' },
  { bookmaker: '1XBET', logo: 'assets/img/bookmakers/1xbet.png', bonus: '$130 Bonus', promoCode: 'NEWBONUS', description: 'Get $30 extra bonus.', claimUrl: '#' },
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

/**
 * Search-specific mock data
 */
export const getSearchData = () => [
  { id: 's1', type: 'Team', name: 'Real Madrid', country: 'Spain', followers: '6.6M', logo: 'assets/logo/team/real-madrid.png', flag: 'https://flagcdn.com/w40/es.png', subtitle: 'Football' },
  { id: 's2', type: 'Team', name: 'Barcelona', country: 'Spain', followers: '6.3M', logo: 'assets/logo/team/barcelona.png', flag: 'https://flagcdn.com/w40/es.png', subtitle: 'Football' },
  { id: 's3', type: 'Team', name: 'Manchester City', country: 'England', followers: '3.6M', logo: 'assets/logo/team/manchester-city.png', flag: 'https://flagcdn.com/w40/gb-eng.png', subtitle: 'Football' },
  { id: 's4', type: 'Team', name: 'Liverpool', country: 'England', followers: '3.5M', logo: 'assets/logo/team/liverpool.png', flag: 'https://flagcdn.com/w40/gb-eng.png', subtitle: 'Football' },
  { id: 's5', type: 'Team', name: 'Manchester United', country: 'England', followers: '3.1M', logo: 'assets/logo/team/manchester-united.png', flag: 'https://flagcdn.com/w40/gb-eng.png', subtitle: 'Football' },
  { id: 's6', type: 'Team', name: 'Arsenal', country: 'England', followers: '3M', logo: 'assets/logo/team/arsenal.png', flag: 'https://flagcdn.com/w40/gb-eng.png', subtitle: 'Football' },
  { id: 's7', type: 'Player', name: 'Lionel Messi', country: 'Argentina', followers: '10M+', logo: 'https://i.pravatar.cc/150?u=messi', flag: 'https://flagcdn.com/w40/ar.png', subtitle: 'Forward' },
  { id: 's8', type: 'Player', name: 'Cristiano Ronaldo', country: 'Portugal', followers: '10M+', logo: 'https://i.pravatar.cc/150?u=cr7', flag: 'https://flagcdn.com/w40/pt.png', subtitle: 'Forward' },
  { id: 's9', type: 'Competition', name: 'English Premier League', country: 'England', followers: '5M', logo: 'assets/img/leagues/premierleague.png', flag: 'https://flagcdn.com/w40/gb-eng.png', subtitle: 'Top Division' },
  { id: 's10', type: 'Competition', name: 'Spanish La Liga', country: 'Spain', followers: '4M', logo: 'assets/img/leagues/laliga.png', flag: 'https://flagcdn.com/w40/es.png', subtitle: 'Top Division' },
  { id: 'europa-1', type: 'Match', name: 'Genk vs Malmoe FF', country: 'World', logo: 'assets/img/leagues/europa-league.png', flag: 'https://flagcdn.com/w40/un.png', subtitle: 'Europa League' },
  { id: 'epl-1', type: 'Match', name: 'Man City vs Arsenal', country: 'England', logo: 'assets/logo/team/manchester-city.png', flag: 'https://flagcdn.com/w40/gb-eng.png', subtitle: 'Premier League' },
];
