import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { useNavigate, Link, useParams, useLocation, Routes, Route, MemoryRouter } from "react-router-dom";
import { createContext, useState, useEffect, useContext, useRef, useMemo } from "react";
const getSuperCategories = () => [
  { id: "Supercat", label: "Popular", hasBadge: false, type: "mega" },
  { id: "Live", label: "Live", hasBadge: true, type: "link", path: "/live" },
  { id: "Category", label: "All Category", hasBadge: false, type: "mega" },
  { id: "International", label: "International", hasBadge: false, type: "mega" },
  { id: "News", label: "News", hasBadge: false, type: "mega" }
];
const getBettingSitesConfig = () => ({
  label: "Betting sites",
  path: "/"
  // Linking to home page as it is the "All Category" view
});
const getPopularCategories = () => [
  {
    categoryName: "England",
    subCategories: [
      { name: "English Premier League", icon: "assets/img/leagues/premierleague.png", country: "England" },
      { name: "EFL Championship", icon: "assets/img/leagues/default.png", country: "England" },
      { name: "FA Cup", icon: "assets/img/leagues/default.png", country: "England" }
    ]
  },
  {
    categoryName: "Spain",
    subCategories: [
      { name: "Spanish La Liga", icon: "assets/img/leagues/laliga.png", country: "Spain" },
      { name: "Copa del Rey", icon: "assets/img/leagues/default.png", country: "Spain" }
    ]
  },
  {
    categoryName: "Germany",
    subCategories: [
      { name: "Bundesliga", icon: "assets/img/leagues/bundesliga.png", country: "Germany" },
      { name: "DFB Pokal", icon: "assets/img/leagues/default.png", country: "Germany" }
    ]
  },
  {
    categoryName: "France",
    subCategories: [
      { name: "French Ligue 1", icon: "assets/img/leagues/ligue1.png", country: "France" }
    ]
  },
  {
    categoryName: "Italy",
    subCategories: [
      { name: "Italian Serie A", icon: "assets/img/leagues/seriea.png", country: "Italy" }
    ]
  }
];
const getAllCountries = () => [
  "Albania",
  "Algeria",
  "Andorra",
  "Angola",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bosnia and Herzegovina",
  "Botswana",
  "Brazil",
  "British Virgin Islands",
  "Brunei",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cape Verde",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Chinese Taipei",
  "Colombia",
  "Comoros",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curacao",
  "Cyprus",
  "Czech Republic",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "DR Congo",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "England",
  "Equatorial Guinea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Grenada",
  "Guam",
  "Guatemala",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Israel",
  "Italy",
  "Ivory Coast",
  "Jamaica",
  "Japan",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kosovo",
  "Kuwait"
];
const getInternationalLeagues = () => [
  { name: "UEFA Champions League", icon: "assets/img/leagues/default.png", country: "International" },
  { name: "UEFA Europa League", icon: "assets/img/leagues/europa-league.png", country: "International" },
  { name: "UEFA Europa Conference League", icon: "assets/img/leagues/default.png", country: "International" },
  { name: "FIFA World Cup", icon: "assets/img/leagues/default.png", country: "International" },
  { name: "FIFA World Cup qualification (UEFA)", icon: "assets/img/leagues/default.png", country: "International" },
  { name: "FIFA World Cup qualification (AFC)", icon: "assets/img/leagues/default.png", country: "International" },
  { name: "UEFA Nations League", icon: "assets/img/leagues/default.png", country: "International" },
  { name: "Copa América", icon: "assets/img/leagues/default.png", country: "International" }
];
const getNewsCategories = () => [
  { name: "Transfer News", icon: "assets/img/leagues/default.png", country: "News" },
  { name: "Match Previews", icon: "assets/img/leagues/default.png", country: "News" },
  { name: "Injury Updates", icon: "assets/img/leagues/default.png", country: "News" },
  { name: "Betting Tips", icon: "assets/img/leagues/default.png", country: "News" },
  { name: "Live Reports", icon: "assets/img/leagues/default.png", country: "News" },
  { name: "Manager Interviews", icon: "assets/img/leagues/default.png", country: "News" }
];
const getMegaMenuOffers = () => [
  { name: "Stake.com", logo: "assets/img/bookmakers/stake.png", desc: "Claim the maximum new Stake bonus offer when you join with promo code MAXBET. Deposit $1500. Get $3000. That's a 200% bonus. Over 18s only. T&Cs apply." },
  { name: "1xBet", logo: "assets/img/bookmakers/1xbet.png", desc: "Get $30 more bonus when you use the 1xbet code NEWBONUS. T&Cs apply. Over 18s only. Deposit $100, get $130." },
  { name: "Linebet", logo: "assets/img/leagues/default.png", desc: "Register with Promo code NEWBONUS to unlock special betting rewards and exclusive features." }
];
const getSupportLinks = () => [
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Term", path: "/terms-of-use" },
  { name: "Contact US", path: "/contact-us" },
  { name: "FAQ", path: "/faq" }
];
const getFooterQuickLinks = () => [
  { name: "Premier League", path: "/league/England/English Premier League" },
  { name: "La Liga", path: "/league/Spain/Spanish La Liga" },
  { name: "Bundesliga", path: "/league/Germany/Bundesliga" },
  { name: "Champions League", path: "/league/International/UEFA Champions League" }
];
const getSupercatItems = () => [
  { name: "UEFA Europa League", time: "14 hr", status: "upcoming", logo: "assets/img/leagues/europa-league.png", country: "International" },
  { name: "Eredivisie", time: "1 day", status: "upcoming", logo: "assets/img/leagues/eredivisie.png", country: "Netherlands" },
  { name: "Bundesliga", time: "1 day", status: "upcoming", logo: "assets/img/leagues/bundesliga.png", country: "Germany" },
  { name: "French Ligue 1", time: "1 day", status: "upcoming", logo: "assets/img/leagues/ligue1.png", country: "France" },
  { name: "Italian Serie A", time: "1 day", status: "upcoming", logo: "assets/img/leagues/seriea.png", country: "Italy" },
  { name: "Spanish La Liga", time: "1 day", status: "upcoming", logo: "assets/img/leagues/laliga.png", country: "Spain" },
  { name: "English Premier League", time: "2 days", status: "upcoming", logo: "assets/img/leagues/premierleague.png", country: "England" },
  { name: "Copa del Rey", time: "3 days", status: "upcoming", logo: "assets/img/leagues/default.png", country: "Spain" },
  { name: "FA Cup", time: "4 days", status: "upcoming", logo: "assets/img/leagues/default.png", country: "England" },
  { name: "UEFA Champions League", time: "5 days", status: "upcoming", logo: "assets/img/leagues/default.png", country: "International" }
];
const generateMockMatches = () => {
  const today = /* @__PURE__ */ new Date();
  const todayStr = today.toISOString().split("T")[0];
  return [
    // World / Europa League
    {
      id: "europa-1",
      homeTeam: { name: "Genk", logo: "assets/logo/team/krc-genk.png", score: 2 },
      awayTeam: { name: "Malmoe FF", logo: "assets/logo/team/malmo.png", score: 1 },
      time: "01:30",
      date: todayStr,
      league: "Europa League",
      country: "World",
      countryFlag: "assets/img/leagues/europa-league.png",
      status: "FINISHED",
      odds: { home: 1.36, draw: 5.6, away: 8.65 },
      prediction: "W1",
      predictionOdds: "1.36"
    },
    // England / Premier League
    {
      id: "epl-1",
      homeTeam: { name: "Manchester City", logo: "assets/logo/team/manchester-city.png", score: 3 },
      awayTeam: { name: "Arsenal", logo: "assets/logo/team/arsenal.png", score: 2 },
      time: "20:00",
      date: todayStr,
      league: "English Premier League",
      country: "England",
      countryFlag: "assets/img/leagues/premierleague.png",
      status: "LIVE",
      odds: { home: 1.85, draw: 3.5, away: 4.2 },
      prediction: "W1",
      predictionOdds: "1.85"
    },
    {
      id: "epl-2",
      homeTeam: { name: "Liverpool", logo: "assets/logo/team/liverpool.png", score: 0 },
      awayTeam: { name: "Chelsea", logo: "assets/logo/team/chelsea.png", score: 0 },
      time: "17:30",
      date: todayStr,
      league: "English Premier League",
      country: "England",
      countryFlag: "assets/img/leagues/premierleague.png",
      status: "UPCOMING",
      odds: { home: 1.65, draw: 4, away: 5.5 },
      prediction: "W1",
      predictionOdds: "1.65"
    },
    // Spain / La Liga
    {
      id: "laliga-1",
      homeTeam: { name: "Real Madrid", logo: "assets/logo/team/real-madrid.png", score: 4 },
      awayTeam: { name: "Barcelona", logo: "assets/logo/team/barcelona.png", score: 1 },
      time: "21:00",
      date: todayStr,
      league: "Spanish La Liga",
      country: "Spain",
      countryFlag: "assets/img/leagues/laliga.png",
      status: "FINISHED",
      odds: { home: 2.1, draw: 3.4, away: 3.5 },
      prediction: "W1",
      predictionOdds: "2.10"
    },
    {
      id: "laliga-2",
      homeTeam: { name: "Atletico Madrid", logo: "assets/logo/team/atletico-madrid.png", score: 1 },
      awayTeam: { name: "Sevilla", logo: "assets/logo/team/sevilla.png", score: 1 },
      time: "19:00",
      date: todayStr,
      league: "Spanish La Liga",
      country: "Spain",
      countryFlag: "assets/img/leagues/laliga.png",
      status: "LIVE",
      odds: { home: 1.75, draw: 3.6, away: 4.8 },
      prediction: "X",
      predictionOdds: "3.60"
    },
    // Germany / Bundesliga
    {
      id: "bundesliga-1",
      homeTeam: { name: "Bayern Munich", logo: "assets/logo/team/bayern-munchen.png", score: 2 },
      awayTeam: { name: "Bayer Leverkusen", logo: "assets/logo/team/bayer-leverkusen.png", score: 2 },
      time: "15:30",
      date: todayStr,
      league: "Bundesliga",
      country: "Germany",
      countryFlag: "assets/img/leagues/bundesliga.png",
      status: "FINISHED",
      odds: { home: 1.9, draw: 3.75, away: 3.8 },
      prediction: "X",
      predictionOdds: "3.75"
    },
    {
      id: "bundesliga-2",
      homeTeam: { name: "Dortmund", logo: "assets/logo/team/borussia-dortmund.png", score: 3 },
      awayTeam: { name: "RB Leipzig", logo: "assets/logo/team/rb-leipzig.png", score: 1 },
      time: "18:30",
      date: todayStr,
      league: "Bundesliga",
      country: "Germany",
      countryFlag: "assets/img/leagues/bundesliga.png",
      status: "LIVE",
      odds: { home: 2.25, draw: 3.5, away: 3.1 },
      prediction: "W1",
      predictionOdds: "2.25"
    },
    // Italy / Serie A
    {
      id: "seriea-1",
      homeTeam: { name: "Inter Milan", logo: "assets/logo/team/inter-milan.png", score: 1 },
      awayTeam: { name: "Juventus", logo: "assets/logo/team/juventus.png", score: 0 },
      time: "20:45",
      date: todayStr,
      league: "Italian Serie A",
      country: "Italy",
      countryFlag: "assets/img/leagues/seriea.png",
      status: "UPCOMING",
      odds: { home: 1.95, draw: 3.25, away: 4.5 },
      prediction: "W1",
      predictionOdds: "1.95"
    },
    // France / Ligue 1
    {
      id: "ligue1-1",
      homeTeam: { name: "PSG", logo: "assets/logo/team/paris-saint-germain.png", score: 5 },
      awayTeam: { name: "Monaco", logo: "assets/logo/team/monaco.png", score: 2 },
      time: "21:00",
      date: todayStr,
      league: "French Ligue 1",
      country: "France",
      countryFlag: "assets/img/leagues/ligue1.png",
      status: "FINISHED",
      odds: { home: 1.45, draw: 4.75, away: 6.5 },
      prediction: "W1",
      predictionOdds: "1.45"
    }
  ];
};
const getMatches = async () => {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return generateMockMatches();
};
const getOffers = () => [
  { bookmaker: "Stake", logo: "assets/img/bookmakers/stake.png", bonus: "Deposit $1500 Get $3000", promoCode: "MAXBET", description: "Claim the maximum new Stake bonus offer.", claimUrl: "#" },
  { bookmaker: "1XBET", logo: "assets/img/bookmakers/1xbet.png", bonus: "$130 Bonus", promoCode: "NEWBONUS", description: "Get $30 extra bonus.", claimUrl: "#" }
];
const getMatchAnalysis = (match) => ({
  verdict: `Match Analysis Verdict Placeholder.`,
  editor: { name: "Lukas Schneider", role: "Sports Editor", avatar: "https://i.pravatar.cc/150?u=lukas" },
  matchInfo: { stadium: "Modern Arena", capacity: "50,000", referee: "Referee X", weather: "Clear" },
  bookmakerOdds: [],
  h2hStats: [],
  homeDetailedForm: [],
  awayDetailedForm: [],
  homeFormSummary: { w: 0, d: 0, l: 0 },
  awayFormSummary: { w: 0, d: 0, l: 0 },
  relatedVideos: [],
  bettingOffers: getOffers()
});
const getSearchData = () => [
  { id: "s1", type: "Team", name: "Real Madrid", country: "Spain", followers: "6.6M", logo: "assets/logo/team/real-madrid.png", flag: "https://flagcdn.com/w40/es.png", subtitle: "Football" },
  { id: "s2", type: "Team", name: "Barcelona", country: "Spain", followers: "6.3M", logo: "assets/logo/team/barcelona.png", flag: "https://flagcdn.com/w40/es.png", subtitle: "Football" },
  { id: "s3", type: "Team", name: "Manchester City", country: "England", followers: "3.6M", logo: "assets/logo/team/manchester-city.png", flag: "https://flagcdn.com/w40/gb-eng.png", subtitle: "Football" },
  { id: "s4", type: "Team", name: "Liverpool", country: "England", followers: "3.5M", logo: "assets/logo/team/liverpool.png", flag: "https://flagcdn.com/w40/gb-eng.png", subtitle: "Football" },
  { id: "s5", type: "Team", name: "Manchester United", country: "England", followers: "3.1M", logo: "assets/logo/team/manchester-united.png", flag: "https://flagcdn.com/w40/gb-eng.png", subtitle: "Football" },
  { id: "s6", type: "Team", name: "Arsenal", country: "England", followers: "3M", logo: "assets/logo/team/arsenal.png", flag: "https://flagcdn.com/w40/gb-eng.png", subtitle: "Football" },
  { id: "s7", type: "Player", name: "Lionel Messi", country: "Argentina", followers: "10M+", logo: "https://i.pravatar.cc/150?u=messi", flag: "https://flagcdn.com/w40/ar.png", subtitle: "Forward" },
  { id: "s8", type: "Player", name: "Cristiano Ronaldo", country: "Portugal", followers: "10M+", logo: "https://i.pravatar.cc/150?u=cr7", flag: "https://flagcdn.com/w40/pt.png", subtitle: "Forward" },
  { id: "s9", type: "Competition", name: "English Premier League", country: "England", followers: "5M", logo: "assets/img/leagues/premierleague.png", flag: "https://flagcdn.com/w40/gb-eng.png", subtitle: "Top Division" },
  { id: "s10", type: "Competition", name: "Spanish La Liga", country: "Spain", followers: "4M", logo: "assets/img/leagues/laliga.png", flag: "https://flagcdn.com/w40/es.png", subtitle: "Top Division" },
  { id: "europa-1", type: "Match", name: "Genk vs Malmoe FF", country: "World", logo: "assets/img/leagues/europa-league.png", flag: "https://flagcdn.com/w40/un.png", subtitle: "Europa League" },
  { id: "epl-1", type: "Match", name: "Man City vs Arsenal", country: "England", logo: "assets/logo/team/manchester-city.png", flag: "https://flagcdn.com/w40/gb-eng.png", subtitle: "Premier League" }
];
class MatchService {
  async getAllMatches() {
    try {
      return await getMatches();
    } catch (error) {
      console.error("Failed to fetch matches:", error);
      return [];
    }
  }
  async getLiveMatches() {
    const matches = await this.getAllMatches();
    return matches.filter((m) => m.status === "LIVE");
  }
  async getMatchesByDate(date) {
    const matches = await this.getAllMatches();
    if (!date || date === "ALL") return matches;
    return matches.filter((m) => m.date === date);
  }
  async getMatchesByCategory(categoryName) {
    const matches = await this.getAllMatches();
    return matches.filter((m) => m.country.toLowerCase() === categoryName.toLowerCase());
  }
  async getMatchesBySubCategory(categoryName, subCategoryName) {
    const matches = await this.getAllMatches();
    return matches.filter(
      (m) => m.country.toLowerCase() === categoryName.toLowerCase() && m.league.toLowerCase() === subCategoryName.toLowerCase()
    );
  }
  // Aliases for better readability
  async getMatchesByCountry(countryName) {
    return this.getMatchesByCategory(countryName);
  }
  async getMatchesByLeague(country, league) {
    return this.getMatchesBySubCategory(country, league);
  }
  async getMatchById(id) {
    const matches = await this.getAllMatches();
    return matches.find((m) => m.id === id);
  }
  async getMatchAnalysis(match) {
    if (!match) return null;
    return getMatchAnalysis();
  }
  getOffers() {
    return getOffers();
  }
  async search(query, type = "All") {
    const data = getSearchData();
    return data.filter((item) => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || item.country.toLowerCase().includes(query.toLowerCase());
      const matchesType = type === "All" || item.type === type;
      return matchesQuery && matchesType;
    });
  }
  calculateOddsPercentages(odds) {
    if (!odds) return { p1: 0, pX: 0, p2: 0 };
    const total = 1 / odds.home + 1 / odds.draw + 1 / odds.away;
    return {
      p1: Math.round(1 / odds.home / total * 100),
      pX: Math.round(1 / odds.draw / total * 100),
      p2: Math.round(1 / odds.away / total * 100)
    };
  }
  groupMatches(matches) {
    const groups = {};
    matches.forEach((m) => {
      const key = `${m.country} : ${m.league}`;
      if (!groups[key]) {
        groups[key] = {
          matches: [],
          country: m.country,
          flag: m.countryFlag,
          league: m.league
        };
      }
      groups[key].matches.push(m);
    });
    return groups;
  }
}
const matchService = new MatchService();
class CategoryService {
  getSuperCategories() {
    return getSuperCategories();
  }
  getPopularCategories() {
    return getPopularCategories();
  }
  getAllCategories() {
    const popularNames = this.getPopularCategories().map((c) => c.categoryName.toLowerCase());
    const allCountries = getAllCountries();
    return allCountries.filter((country) => !popularNames.includes(country.toLowerCase()));
  }
  getInternationalLeagues() {
    return getInternationalLeagues();
  }
  getNewsCategories() {
    return getNewsCategories();
  }
  getMegaMenuOffers() {
    return getMegaMenuOffers();
  }
  getBettingSitesLink() {
    return getBettingSitesConfig();
  }
}
const categoryService = new CategoryService();
const ThemeContext = createContext(void 0);
const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    try {
      if (typeof window === "undefined" || typeof window.localStorage === "undefined") return "light";
      const saved = window.localStorage.getItem("theme");
      return saved || "light";
    } catch (err) {
      return "light";
    }
  });
  useEffect(() => {
    const root = typeof window !== "undefined" ? window.document.documentElement : null;
    if (root) {
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    try {
      if (typeof window !== "undefined" && window.localStorage) {
        window.localStorage.setItem("theme", theme);
      }
    } catch (err) {
    }
  }, [theme]);
  const toggleTheme = () => {
    setTheme((prev) => prev === "light" ? "dark" : "light");
  };
  return /* @__PURE__ */ jsx(ThemeContext.Provider, { value: { theme, toggleTheme }, children });
};
const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
const categories = ["All", "Team", "Player", "Match", "Competition"];
const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [results, setResults] = useState([]);
  const overlayRef = useRef(null);
  const inputRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    var _a;
    if (isOpen) {
      document.body.style.overflow = "hidden";
      (_a = inputRef.current) == null ? void 0 : _a.focus();
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);
  useEffect(() => {
    const performSearch = async () => {
      const searchResults = await matchService.search(query, activeCategory);
      setResults(searchResults);
    };
    performSearch();
  }, [query, activeCategory]);
  const handleItemClick = (item) => {
    onClose();
    if (item.type === "Team") {
      navigate(`/country/${item.country}`);
    } else if (item.type === "Competition") {
      navigate(`/league/${item.country}/${item.name}`);
    } else if (item.type === "Match") {
      navigate(`/match/${item.id}`);
    }
  };
  if (!isOpen) return null;
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: "fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4 transition-all duration-300 animate-in fade-in",
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      children: /* @__PURE__ */ jsxs(
        "div",
        {
          ref: overlayRef,
          className: "w-full max-w-2xl bg-slate-900 dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 animate-in zoom-in-95 duration-200",
          children: [
            /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-800 bg-slate-800/50", children: /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
              /* @__PURE__ */ jsx("svg", { className: "absolute left-4 w-5 h-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  ref: inputRef,
                  type: "text",
                  placeholder: "Search matches, competitions, teams, players...",
                  className: "w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-12 pr-4 text-white text-sm focus:outline-none focus:border-green-500 transition-colors",
                  value: query,
                  onChange: (e) => setQuery(e.target.value)
                }
              )
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "p-4 border-b border-slate-800 overflow-x-auto custom-scrollbar", children: /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2", children: categories.map((cat) => /* @__PURE__ */ jsx(
              "button",
              {
                onClick: () => setActiveCategory(cat),
                className: `px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${activeCategory === cat ? "bg-white text-slate-900" : "bg-slate-800 text-gray-400 hover:bg-slate-700 hover:text-white"}`,
                children: cat
              },
              cat
            )) }) }),
            /* @__PURE__ */ jsxs("div", { className: "max-h-[500px] overflow-y-auto custom-scrollbar p-2", children: [
              /* @__PURE__ */ jsx("div", { className: "px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2", children: query ? "Results" : "Suggested" }),
              /* @__PURE__ */ jsx("div", { className: "space-y-1", children: results.length > 0 ? results.map((item) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "flex items-center justify-between p-3 rounded-xl hover:bg-slate-800/50 cursor-pointer group transition-all",
                  onClick: () => handleItemClick(item),
                  children: [
                    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
                      /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-full bg-white p-1 flex items-center justify-center overflow-hidden", children: /* @__PURE__ */ jsx("img", { src: item.logo, alt: "", className: "w-full h-full object-contain" }) }),
                      /* @__PURE__ */ jsxs("div", { children: [
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsx("span", { className: "text-sm font-bold text-white group-hover:text-green-500 transition-colors", children: item.name }),
                          /* @__PURE__ */ jsx("div", { className: "w-2 h-2 bg-gray-600 rounded-full" }),
                          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5", children: [
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-black text-green-500 uppercase px-1.5 py-0.5 bg-green-500/10 rounded", children: item.type }),
                            item.followers && /* @__PURE__ */ jsxs("span", { className: "text-[10px] font-bold text-gray-400 flex items-center gap-1", children: [
                              /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" }) }),
                              item.followers
                            ] })
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
                          /* @__PURE__ */ jsx("img", { src: item.flag, alt: "", className: "w-4 h-3 object-cover rounded-[1px]" }),
                          /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-500 uppercase", children: item.country }),
                          item.subtitle && /* @__PURE__ */ jsxs(Fragment, { children: [
                            /* @__PURE__ */ jsx("div", { className: "w-1 h-1 bg-gray-700 rounded-full" }),
                            /* @__PURE__ */ jsx("span", { className: "text-[10px] font-bold text-gray-400", children: item.subtitle })
                          ] })
                        ] })
                      ] })
                    ] }),
                    /* @__PURE__ */ jsx("button", { className: "text-gray-600 hover:text-yellow-500 transition-colors", onClick: (e) => e.stopPropagation(), children: /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" }) }) })
                  ]
                },
                item.id
              )) : /* @__PURE__ */ jsx("div", { className: "p-8 text-center", children: /* @__PURE__ */ jsxs("p", { className: "text-gray-500 font-bold", children: [
                'No results found for "',
                query,
                '"'
              ] }) }) })
            ] })
          ]
        }
      )
    }
  );
};
const Header = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [superCategories, setSuperCategories] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [allOtherCategories, setAllOtherCategories] = useState([]);
  const [internationalLeagues, setInternationalLeagues] = useState([]);
  const [newsCategories, setNewsCategories] = useState([]);
  const [bestSportsOffers, setBestSportsOffers] = useState([]);
  const [bettingSitesLink, setBettingSitesLink] = useState({ label: "Betting sites", path: "/" });
  const [liveMatchCount, setLiveMatchCount] = useState(0);
  useEffect(() => {
    setSuperCategories(categoryService.getSuperCategories());
    setPopularCategories(categoryService.getPopularCategories());
    setAllOtherCategories(categoryService.getAllCategories());
    setInternationalLeagues(categoryService.getInternationalLeagues());
    setNewsCategories(categoryService.getNewsCategories());
    setBestSportsOffers(categoryService.getMegaMenuOffers());
    setBettingSitesLink(categoryService.getBettingSitesLink());
    matchService.getLiveMatches().then((matches) => setLiveMatchCount(matches.length));
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const handleNavClick = (supercat) => {
    if (supercat.type === "link") {
      setActiveMenu(null);
      navigate(supercat.path);
    } else {
      setActiveMenu(activeMenu === supercat.id ? null : supercat.id);
    }
  };
  return /* @__PURE__ */ jsxs("header", { className: "bg-slate-900 dark:bg-slate-950 text-white sticky top-0 z-50 shadow-md transition-colors duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-8", children: [
        /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center space-x-2", onClick: () => setActiveMenu(null), children: [
          /* @__PURE__ */ jsxs("span", { className: "text-2xl font-black italic tracking-tighter", children: [
            "FOOTBALL ",
            /* @__PURE__ */ jsx("span", { className: "text-green-500", children: "STREAMS" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "bg-green-500 rounded p-0.5", children: /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-black", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) })
        ] }),
        /* @__PURE__ */ jsx("nav", { className: "hidden md:flex items-center space-x-6 text-sm font-medium", children: superCategories.map((supercat) => /* @__PURE__ */ jsxs(
          "div",
          {
            className: `flex items-center cursor-pointer transition-colors group ${activeMenu === supercat.id ? "text-green-500" : "hover:text-green-500"}`,
            onClick: () => handleNavClick(supercat),
            children: [
              /* @__PURE__ */ jsx("span", { children: supercat.label }),
              supercat.hasBadge && /* @__PURE__ */ jsx("span", { className: "ml-1 bg-green-500 text-black text-[10px] px-1 rounded font-bold", children: liveMatchCount }),
              supercat.type === "mega" && /* @__PURE__ */ jsx("svg", { className: `w-4 h-4 ml-1 transition-transform ${activeMenu === supercat.id ? "rotate-180" : ""}`, fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
            ]
          },
          supercat.id
        )) })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: toggleTheme,
            className: "p-2 hover:bg-slate-800 dark:hover:bg-slate-800 rounded-full transition-colors text-gray-300 hover:text-white",
            "aria-label": "Toggle Theme",
            children: theme === "light" ? /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M15 12a3 3 0 11-6 0 3 3 0 016 0z" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            onClick: () => setIsSearchOpen(true),
            className: "p-2 hover:bg-slate-800 rounded-full transition-colors text-gray-300 hover:text-white",
            "aria-label": "Search",
            children: /* @__PURE__ */ jsx("svg", { className: "w-6 h-6", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" }) })
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            to: bettingSitesLink.path,
            className: "bg-green-500 text-black px-4 py-2 rounded-lg font-bold text-sm hover:bg-green-400 transition-colors hidden sm:block",
            children: bettingSitesLink.label
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx(SearchOverlay, { isOpen: isSearchOpen, onClose: () => setIsSearchOpen(false) }),
    activeMenu && /* @__PURE__ */ jsx("div", { ref: menuRef, className: "absolute top-16 left-0 w-full bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-b dark:border-slate-800 shadow-2xl animate-in slide-in-from-top-2 duration-200", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-10", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex gap-12", children: [
        /* @__PURE__ */ jsx("div", { className: "flex-1", children: activeMenu === "Supercat" ? /* @__PURE__ */ jsx("div", { className: "grid grid-cols-5 gap-8", children: popularCategories.map((cat) => /* @__PURE__ */ jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsx(
            Link,
            {
              to: `/country/${cat.categoryName}`,
              className: "block text-sm font-black text-slate-900 dark:text-white hover:text-green-600 transition-colors",
              onClick: () => setActiveMenu(null),
              children: cat.categoryName
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "h-[2px] bg-gray-100 dark:bg-slate-800 w-full" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-3", children: cat.subCategories.map((sub) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/league/${sub.country}/${sub.name}`,
              className: "flex items-center space-x-3 group",
              onClick: () => setActiveMenu(null),
              children: [
                /* @__PURE__ */ jsx(
                  "img",
                  {
                    src: sub.icon,
                    alt: "",
                    className: "w-4 h-4 object-contain group-hover:scale-110 transition-transform",
                    onError: (e) => e.target.src = "assets/img/leagues/default.png"
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "text-[12px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors", children: sub.name })
              ]
            }
          ) }, sub.name)) })
        ] }, cat.categoryName)) }) : activeMenu === "Category" ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider", children: "All Categories" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-y-3 gap-x-12 custom-scrollbar overflow-y-auto max-h-[400px] pr-4", children: allOtherCategories.map((country) => /* @__PURE__ */ jsx(
            Link,
            {
              to: `/country/${country}`,
              className: "text-[13px] font-bold text-gray-600 dark:text-gray-400 hover:text-green-600 transition-colors",
              onClick: () => setActiveMenu(null),
              children: country
            },
            country
          )) })
        ] }) : activeMenu === "International" ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider", children: "International" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-y-4 gap-x-12", children: internationalLeagues.map((league) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/league/${league.country}/${league.name}`,
              className: "flex items-center space-x-3 group cursor-pointer",
              onClick: () => setActiveMenu(null),
              children: [
                /* @__PURE__ */ jsx("img", { src: league.icon, alt: "", className: "w-5 h-5 object-contain", onError: (e) => e.target.src = "assets/img/leagues/default.png" }),
                /* @__PURE__ */ jsx("span", { className: "text-[12px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors", children: league.name })
              ]
            },
            league.name
          )) })
        ] }) : activeMenu === "News" ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider", children: "News" }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-2 gap-y-4 gap-x-12", children: newsCategories.map((cat) => /* @__PURE__ */ jsxs(
            Link,
            {
              to: `/league/${cat.country}/${cat.name}`,
              className: "flex items-center space-x-3 group cursor-pointer",
              onClick: () => setActiveMenu(null),
              children: [
                /* @__PURE__ */ jsx("img", { src: cat.icon, alt: "", className: "w-5 h-5 object-contain", onError: (e) => e.target.src = "assets/img/leagues/default.png" }),
                /* @__PURE__ */ jsx("span", { className: "text-[12px] font-bold text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors", children: cat.name })
              ]
            },
            cat.name
          )) })
        ] }) : null }),
        /* @__PURE__ */ jsxs("div", { className: "w-80 border-l dark:border-slate-800 pl-12", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black text-slate-900 dark:text-white mb-6 uppercase tracking-wider", children: "Best Sports:" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: bestSportsOffers.map((offer) => /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-slate-800/50 rounded-xl p-4 border border-transparent hover:border-green-200 dark:hover:border-green-900 transition-all cursor-pointer group", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
                /* @__PURE__ */ jsx("img", { src: offer.logo, alt: "", className: "h-6 object-contain" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-900 dark:text-white", children: offer.name })
              ] }),
              /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 text-gray-400 group-hover:text-green-500 transition-colors", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z" }) })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 leading-snug font-medium line-clamp-3", children: offer.desc })
          ] }, offer.name)) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-12 flex justify-center", children: /* @__PURE__ */ jsx(
        "button",
        {
          className: "w-full max-w-5xl bg-green-500 hover:bg-green-600 text-black font-black py-4 rounded-xl text-sm transition-all shadow-lg",
          onClick: () => {
            setActiveMenu(null);
            navigate("/");
          },
          children: "View all Categories"
        }
      ) })
    ] }) })
  ] });
};
class FooterService {
  getSupportLinks() {
    return getSupportLinks();
  }
  getQuickLinks() {
    return getFooterQuickLinks();
  }
}
const footerService = new FooterService();
const Footer = () => {
  const [quickLinks, setQuickLinks] = useState([]);
  const [supportLinks, setSupportLinks] = useState([]);
  useEffect(() => {
    setQuickLinks(footerService.getQuickLinks());
    setSupportLinks(footerService.getSupportLinks());
  }, []);
  return /* @__PURE__ */ jsx("footer", { className: "bg-white dark:bg-slate-950 border-t dark:border-slate-800 mt-12 py-12 text-gray-600 dark:text-gray-400 transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "col-span-1 md:col-span-2", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-2 mb-4", children: /* @__PURE__ */ jsxs("span", { className: "text-xl font-black italic tracking-tighter text-black dark:text-white", children: [
          "FOOTBALL ",
          /* @__PURE__ */ jsx("span", { className: "text-green-500", children: "STREAMS" })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "text-sm leading-relaxed max-w-md", children: "Football Streams is your ultimate guide to finding legal ways to watch football matches from across the globe. Get up-to-date fixtures, live scores, and expert analysis for every major league." })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-black dark:text-white mb-4", children: "Quick Links" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: quickLinks.map((link, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.path, className: "hover:text-green-500 transition-colors", children: link.name }) }, idx)) })
      ] }),
      /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx("h4", { className: "font-bold text-black dark:text-white mb-4", children: "Support" }),
        /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm", children: supportLinks.map((link, idx) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(Link, { to: link.path, className: "hover:text-green-500 transition-colors", children: link.name }) }, idx)) })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border-t dark:border-slate-800 mt-12 pt-8 text-center text-xs", children: /* @__PURE__ */ jsx("p", { children: "© 2024 Football Streams. All rights reserved. Please gamble responsibly." }) })
  ] }) });
};
const MatchCard = ({ match }) => {
  const { p1, pX, p2 } = matchService.calculateOddsPercentages(match.odds);
  const isHomePrediction = match.prediction === "W1";
  const isDrawPrediction = match.prediction === "Draw" || match.prediction === "X";
  const isAwayPrediction = match.prediction === "W2";
  const isCorrect = match.id.includes("1") || match.id.includes("4");
  const dateParts = match.date.split("-");
  const displayDate = dateParts.length === 3 ? "Today" : match.date;
  return /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 shadow-sm hover:border-green-500 dark:hover:border-green-500 transition-all mb-3 overflow-hidden group", children: /* @__PURE__ */ jsx(Link, { to: `/match/${match.id}`, children: /* @__PURE__ */ jsx("div", { className: "p-3 sm:p-4", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[70px_1fr_240px_130px] items-center gap-4", children: [
    /* @__PURE__ */ jsxs("div", { className: "text-[11px] font-bold text-gray-400 dark:text-gray-500 flex flex-col items-center border-r dark:border-slate-800 pr-4", children: [
      /* @__PURE__ */ jsx("div", { className: "text-slate-500 dark:text-slate-400 font-bold", children: displayDate }),
      /* @__PURE__ */ jsx("div", { className: "text-slate-900 dark:text-white font-black text-sm", children: match.time })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pr-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("img", { src: match.homeTeam.logo, alt: "", className: "w-6 h-6 object-contain", onError: (e) => e.target.style.display = "none" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-green-600 transition-colors", children: match.homeTeam.name })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsx("img", { src: match.awayTeam.logo, alt: "", className: "w-6 h-6 object-contain", onError: (e) => e.target.style.display = "none" }),
          /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-800 dark:text-slate-200 group-hover:text-green-600 transition-colors", children: match.awayTeam.name })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3 items-end", children: [
        /* @__PURE__ */ jsx("span", { className: "text-xl font-black text-slate-900 dark:text-white leading-none", children: match.homeTeam.score ?? 0 }),
        /* @__PURE__ */ jsx("span", { className: "text-xl font-black text-slate-900 dark:text-white leading-none", children: match.awayTeam.score ?? 0 })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: `flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg border transition-colors ${isHomePrediction ? "bg-yellow-300 dark:bg-yellow-500 border-yellow-400" : "bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700"}`, children: [
        /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold ${isHomePrediction ? "text-slate-700 dark:text-slate-900" : "text-gray-400 dark:text-gray-500"}`, children: match.odds.home.toFixed(2) }),
        /* @__PURE__ */ jsxs("span", { className: `text-sm font-black ${isHomePrediction ? "text-slate-900" : "text-slate-800 dark:text-slate-200"}`, children: [
          p1,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg border transition-colors ${isDrawPrediction ? "bg-yellow-300 dark:bg-yellow-500 border-yellow-400" : "bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700"}`, children: [
        /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold ${isDrawPrediction ? "text-slate-700 dark:text-slate-900" : "text-gray-400 dark:text-gray-500"}`, children: match.odds.draw.toFixed(2) }),
        /* @__PURE__ */ jsxs("span", { className: `text-sm font-black ${isDrawPrediction ? "text-slate-900" : "text-slate-800 dark:text-slate-200"}`, children: [
          pX,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: `flex-1 flex flex-col items-center justify-center py-1.5 rounded-lg border transition-colors ${isAwayPrediction ? "bg-yellow-300 dark:bg-yellow-500 border-yellow-400" : "bg-gray-50 dark:bg-slate-800/50 border-gray-100 dark:border-slate-700"}`, children: [
        /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold ${isAwayPrediction ? "text-slate-700 dark:text-slate-900" : "text-gray-400 dark:text-gray-500"}`, children: match.odds.away.toFixed(2) }),
        /* @__PURE__ */ jsxs("span", { className: `text-sm font-black ${isAwayPrediction ? "text-slate-900" : "text-slate-800 dark:text-slate-200"}`, children: [
          p2,
          "%"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-3 p-2 rounded-xl border ${isCorrect ? "bg-green-50 dark:bg-green-950/20 border-green-100 dark:border-green-900/40" : "bg-red-50 dark:bg-red-950/20 border-red-100 dark:border-red-900/40"}`, children: [
      /* @__PURE__ */ jsx("div", { className: `w-6 h-6 rounded-md flex items-center justify-center ${isCorrect ? "text-green-500" : "text-red-500"}`, children: isCorrect ? /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M5 13l4 4L19 7" }) }) : /* @__PURE__ */ jsx("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M6 18L18 6M6 6l12 12" }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "flex-1 text-right", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight", children: match.prediction }),
        /* @__PURE__ */ jsx("div", { className: "text-sm font-black text-slate-900 dark:text-white", children: match.predictionOdds })
      ] })
    ] })
  ] }) }) }) });
};
class LeagueService {
  getPopularLeagues() {
    return getSupercatItems();
  }
}
const leagueService = new LeagueService();
const Sidebar = () => {
  const popularLeagues = leagueService.getPopularLeagues();
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-6 sticky top-20 transition-all duration-300", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-black text-lg mb-6 text-slate-900 dark:text-white", children: "Popular" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-4", children: popularLeagues.map((league, idx) => /* @__PURE__ */ jsxs(
      Link,
      {
        to: `/league/${league.country}/${league.name}`,
        className: "flex items-center justify-between group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800 p-2 rounded-xl transition-all",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ jsx(
              "img",
              {
                src: league.logo,
                alt: league.name,
                className: "w-5 h-5 object-contain",
                onError: (e) => e.target.src = "https://www.footballstreams.com/Casino/images/icon.png"
              }
            ),
            /* @__PURE__ */ jsx("span", { className: "text-[13px] font-bold text-slate-700 dark:text-slate-300 group-hover:text-green-500 transition-colors", children: league.name })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsx("span", { className: `text-[10px] font-bold px-2 py-1 rounded min-w-[45px] text-center border dark:border-slate-800 transition-colors ${league.status === "Live" ? "bg-green-500 text-black animate-pulse border-green-500" : "bg-white dark:bg-slate-900 text-gray-400 dark:text-gray-500"}`, children: league.time || league.status }) })
        ]
      },
      idx
    )) })
  ] });
};
const SSRDataContext = createContext(null);
const SSRDataProvider = ({ data, children }) => {
  return /* @__PURE__ */ jsx(SSRDataContext.Provider, { value: data, children });
};
const useSSRData = () => useContext(SSRDataContext);
const Home = () => {
  const ssr = useSSRData();
  const [matches, setMatches] = useState((ssr == null ? void 0 : ssr.matches) ?? []);
  const [loading, setLoading] = useState(ssr ? false : true);
  const [dateFilter, setDateFilter] = useState("ALL");
  const todayStr = useMemo(() => (/* @__PURE__ */ new Date()).toISOString().split("T")[0], []);
  const yesterdayStr = useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().split("T")[0];
  }, []);
  const tomorrowStr = useMemo(() => {
    const d = /* @__PURE__ */ new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split("T")[0];
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      if (ssr && ssr.page === "home" && dateFilter === "ALL") {
        setMatches(ssr.matches || []);
        setLoading(false);
        return;
      }
      setLoading(true);
      let data = [];
      if (dateFilter === "LIVE") {
        data = await matchService.getLiveMatches();
      } else if (dateFilter === "ALL") {
        data = await matchService.getAllMatches();
      } else {
        const targetDate = dateFilter === "YESTERDAY" ? yesterdayStr : dateFilter === "TODAY" ? todayStr : tomorrowStr;
        data = await matchService.getMatchesByDate(targetDate);
      }
      setMatches(data);
      setLoading(false);
    };
    fetchData();
  }, [dateFilter, yesterdayStr, todayStr, tomorrowStr, ssr]);
  const groupedMatches = useMemo(() => matchService.groupMatches(matches), [matches]);
  const [allMatchesForCount, setAllMatchesForCount] = useState((ssr == null ? void 0 : ssr.page) === "home" ? ssr.matches || [] : []);
  useEffect(() => {
    if (ssr && ssr.page === "home") return;
    matchService.getAllMatches().then((data) => setAllMatchesForCount(data));
  }, [ssr]);
  const liveCount = useMemo(() => allMatchesForCount.filter((m) => m.status === "LIVE").length, [allMatchesForCount]);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 w-full transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-slate-900 dark:text-white mb-8", children: "Football Leagues" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3 mb-8", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("select", { className: "appearance-none bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl px-4 py-2 text-xs font-bold pr-10 hover:border-gray-400 dark:hover:border-slate-600 cursor-pointer shadow-sm text-slate-900 dark:text-white", children: /* @__PURE__ */ jsx("option", { children: "Upcoming" }) }),
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center bg-white dark:bg-slate-900 border dark:border-slate-800 rounded-xl p-1 shadow-sm overflow-x-auto", children: ["LIVE", "YESTERDAY", "TODAY", "TOMORROW", "ALL"].map((filter) => /* @__PURE__ */ jsx(
            "button",
            {
              onClick: () => setDateFilter(filter),
              className: `px-4 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${dateFilter === filter ? "bg-slate-900 dark:bg-slate-700 text-white" : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"}`,
              children: filter === "LIVE" ? `Live (${liveCount})` : filter.charAt(0) + filter.slice(1).toLowerCase()
            },
            filter
          )) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-wrap items-center gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide", children: ["Over/Under", "Correct Score", "BTTS", "Half Time/Full Time", "Asian Handicap", "Double Chance"].map((tab) => /* @__PURE__ */ jsx("button", { className: `px-4 py-2 border dark:border-slate-800 rounded-xl text-xs font-bold whitespace-nowrap transition-all shadow-sm bg-white dark:bg-slate-900 hover:text-slate-900 dark:hover:text-white hover:border-gray-400 dark:hover:border-slate-600 text-gray-400`, children: tab }, tab)) }),
        loading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900 rounded-xl h-24 animate-pulse border dark:border-slate-800 shadow-sm" }, i)) }) : Object.keys(groupedMatches).length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-12", children: Object.entries(groupedMatches).map(([key, data]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [
            /* @__PURE__ */ jsx("img", { src: data.flag, alt: "", className: "w-5 h-5 object-contain", onError: (e) => e.target.style.display = "none" }),
            /* @__PURE__ */ jsxs("h2", { className: "text-sm font-black text-slate-900 dark:text-white flex items-center", children: [
              /* @__PURE__ */ jsx(Link, { to: `/country/${data.country}`, className: "text-gray-400 dark:text-gray-500 font-bold hover:text-green-500 transition-colors", children: data.country }),
              /* @__PURE__ */ jsx("span", { className: "mx-1 text-gray-300 dark:text-slate-700", children: ":" }),
              /* @__PURE__ */ jsx(Link, { to: `/league/${data.country}/${data.league}`, className: "uppercase tracking-tight hover:text-green-500 transition-colors", children: data.league })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[70px_1fr_240px_130px] gap-4 px-4 mb-2 text-[10px] font-black uppercase text-gray-300 dark:text-slate-600", children: [
            /* @__PURE__ */ jsx("span", { children: "Time" }),
            /* @__PURE__ */ jsx("span", { children: "Game" }),
            /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 text-center", children: [
              /* @__PURE__ */ jsx("span", { children: "1" }),
              /* @__PURE__ */ jsx("span", { children: "X" }),
              /* @__PURE__ */ jsx("span", { children: "2" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-right", children: "Prediction" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.matches.map((match) => /* @__PURE__ */ jsx(MatchCard, { match }, match.id)) })
        ] }, key)) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-12 text-center shadow-sm", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-slate-900 dark:text-white mb-1", children: "No matches found" }),
          /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm font-medium", children: "Try another date or category." })
        ] })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "w-full lg:w-80", children: /* @__PURE__ */ jsx(Sidebar, {}) })
    ] })
  ] });
};
const Breadcrumbs = ({ match }) => /* @__PURE__ */ jsx("div", { className: "bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-900", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400", children: [
  /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-green-500 transition-colors", children: "Home" }),
  /* @__PURE__ */ jsx("span", { children: "»" }),
  /* @__PURE__ */ jsx("span", { className: "hover:text-green-500 cursor-pointer", children: match.country }),
  /* @__PURE__ */ jsx("span", { children: "»" }),
  /* @__PURE__ */ jsx("span", { className: "hover:text-green-500 cursor-pointer", children: match.league }),
  /* @__PURE__ */ jsx("span", { children: "»" }),
  /* @__PURE__ */ jsxs("span", { className: "text-white", children: [
    match.homeTeam.name,
    " vs ",
    match.awayTeam.name
  ] })
] }) }) });
const MatchHero = ({ match }) => /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 dark:bg-black text-white py-12 border-b border-gray-800 dark:border-slate-900 relative overflow-hidden transition-colors duration-300", children: [
  /* @__PURE__ */ jsx("div", { className: "absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" }),
  /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 relative z-10 text-center", children: [
    /* @__PURE__ */ jsxs("h1", { className: "text-2xl sm:text-3xl font-black mb-12", children: [
      match.homeTeam.name,
      " vs ",
      match.awayTeam.name,
      " Live Stream - Stats and Predictions"
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-center justify-center sm:space-x-16 space-y-8 sm:space-y-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white rounded-full p-2 shadow-2xl mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: match.homeTeam.logo, alt: match.homeTeam.name, className: "w-full h-full object-contain" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: match.homeTeam.name })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-sm font-bold text-green-500 mb-2", children: [
          match.date,
          " • ",
          match.league
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "text-5xl font-black tracking-tighter mb-2", children: [
          match.time,
          " GMT"
        ] }),
        /* @__PURE__ */ jsx("p", { className: "max-w-md text-xs text-gray-400 font-medium leading-relaxed", children: match.description })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "w-24 h-24 bg-white rounded-full p-2 shadow-2xl mb-4 flex items-center justify-center", children: /* @__PURE__ */ jsx("img", { src: match.awayTeam.logo, alt: match.awayTeam.name, className: "w-full h-full object-contain" }) }),
        /* @__PURE__ */ jsx("h2", { className: "text-xl font-black", children: match.awayTeam.name })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex flex-wrap justify-center gap-2 mt-16", children: ["Verdict", "Stream", "Prediction", "Odds", "Head-to-Head", "Team Form", "Match Info"].map((tab, i) => /* @__PURE__ */ jsx("button", { className: `px-5 py-2 rounded-full text-xs font-bold transition-all ${i === 0 ? "bg-green-500 text-black shadow-lg shadow-green-500/20" : "bg-gray-800 dark:bg-slate-800 text-white hover:bg-gray-700 dark:hover:bg-slate-700"}`, children: tab }, tab)) })
  ] })
] });
const VerdictCard = ({ analysis }) => /* @__PURE__ */ jsx("div", { className: "bg-slate-900 dark:bg-slate-800/50 text-white rounded-2xl overflow-hidden mb-8 shadow-xl transition-colors duration-300", children: /* @__PURE__ */ jsxs("div", { className: "p-6 sm:p-8", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-4 mb-6", children: [
    /* @__PURE__ */ jsx("img", { src: analysis.editor.avatar, alt: "", className: "w-14 h-14 rounded-full border-2 border-green-500 shadow-lg shadow-green-500/20" }),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black", children: [
        analysis.editor.name,
        "'s Verdict"
      ] }),
      /* @__PURE__ */ jsx("p", { className: "text-xs text-gray-400 font-bold uppercase", children: analysis.editor.role })
    ] })
  ] }),
  /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6", children: [
    /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-300 leading-relaxed font-medium flex-1", children: analysis.verdict }),
    /* @__PURE__ */ jsxs("button", { className: "whitespace-nowrap bg-green-500 text-black px-8 py-3 rounded-xl font-black text-sm flex items-center gap-2 hover:bg-green-400 transition-colors shadow-lg shadow-green-500/20", children: [
      "Place Bet",
      /* @__PURE__ */ jsx("svg", { className: "w-4 h-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 3, d: "M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" }) })
    ] })
  ] })
] }) });
const PredictionTable = ({ match }) => /* @__PURE__ */ jsxs("div", { className: "mb-12", children: [
  /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black mb-6 text-slate-900 dark:text-white", children: [
    "1X2 prediction for ",
    match.homeTeam.name,
    " vs ",
    match.awayTeam.name,
    " match"
  ] }),
  /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 overflow-hidden shadow-sm transition-colors duration-300", children: /* @__PURE__ */ jsxs("table", { className: "w-full text-xs font-bold", children: [
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "bg-gray-50 dark:bg-slate-800 text-gray-400 dark:text-gray-500 border-b dark:border-slate-800", children: [
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-left", children: "Game" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "1" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "X" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "2" }),
      /* @__PURE__ */ jsx("th", { className: "py-3 px-4 text-center", children: "Prediction" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { className: "divide-y dark:divide-slate-800", children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { className: "py-4 px-4", children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-700 dark:text-slate-300", children: [
          /* @__PURE__ */ jsx("img", { src: match.homeTeam.logo, alt: "", className: "w-4 h-4 object-contain" }),
          " ",
          match.homeTeam.name,
          /* @__PURE__ */ jsx("span", { className: "text-slate-900 dark:text-white ml-auto", children: "0" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-slate-700 dark:text-slate-300", children: [
          /* @__PURE__ */ jsx("img", { src: match.awayTeam.logo, alt: "", className: "w-4 h-4 object-contain" }),
          " ",
          match.awayTeam.name,
          /* @__PURE__ */ jsx("span", { className: "text-slate-900 dark:text-white ml-auto", children: "0" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-slate-800/50 p-2 rounded text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-gray-400 dark:text-gray-500", children: "3.89" }),
        /* @__PURE__ */ jsx("div", { className: "text-slate-900 dark:text-white", children: "26%" })
      ] }) }),
      /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-gray-50 dark:bg-slate-800/50 p-2 rounded text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-gray-400 dark:text-gray-500", children: "3.75" }),
        /* @__PURE__ */ jsx("div", { className: "text-slate-900 dark:text-white", children: "27%" })
      ] }) }),
      /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-green-100 dark:bg-green-950/30 p-2 rounded text-center border border-green-200 dark:border-green-900/50", children: [
        /* @__PURE__ */ jsxs("div", { className: "text-green-700 dark:text-green-400 flex items-center justify-center gap-1", children: [
          /* @__PURE__ */ jsx("svg", { className: "w-3 h-3", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ jsx("path", { d: "M2 10.5a1.5 1.5 0 113 0v6a1.5 1.5 0 01-3 0v-6zM6 10.333v5.43a2 2 0 001.106 1.79l.05.025A4 4 0 008.943 18h5.416a2 2 0 001.962-1.608l1.2-6A2 2 0 0015.56 8H12V4a2 2 0 00-2-2 1 1 0 00-1 1v.667a4 4 0 01-.8 2.4L6.8 7.933a4 4 0 00-.8 2.4z" }) }),
          "1.95"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "text-green-800 dark:text-green-300", children: "51%" })
      ] }) }),
      /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 dark:bg-slate-800 text-white p-2 rounded text-center", children: [
        /* @__PURE__ */ jsx("div", { children: "W2" }),
        /* @__PURE__ */ jsx("div", { children: "1.95" })
      ] }) })
    ] }) })
  ] }) })
] });
const BettingOfferCard = ({ offer }) => /* @__PURE__ */ jsxs("div", { className: "border dark:border-slate-800 rounded-xl p-4 bg-white dark:bg-slate-900 shadow-sm flex flex-col gap-3 group hover:border-green-500 transition-all", children: [
  /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
    /* @__PURE__ */ jsx("img", { src: offer.logo, alt: offer.bookmaker, className: "h-6 object-contain" }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-end", children: [
      /* @__PURE__ */ jsx("span", { className: "text-xs font-black text-slate-900 dark:text-white", children: offer.bonus }),
      offer.promoCode && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase", children: [
        "Code: ",
        offer.promoCode
      ] })
    ] }),
    /* @__PURE__ */ jsx("button", { className: "bg-green-500 text-black px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-400 transition-colors shadow-sm", children: "Claim" })
  ] }),
  /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-500 leading-tight", children: offer.description })
] });
const MatchDetail = () => {
  const ssr = useSSRData();
  const { id } = useParams();
  const [match, setMatch] = useState((ssr == null ? void 0 : ssr.page) === "match" && ssr.match ? ssr.match : null);
  const [analysis, setAnalysis] = useState((ssr == null ? void 0 : ssr.page) === "match" && ssr.analysis ? ssr.analysis : null);
  const [loading, setLoading] = useState(ssr && ssr.page === "match" ? false : true);
  useEffect(() => {
    if (ssr && ssr.page === "match" && ssr.match && ssr.match.id === id) return;
    const fetchData = async () => {
      setLoading(true);
      if (id) {
        const found = await matchService.getMatchById(id);
        if (found) {
          setMatch(found);
          const analysisData = await matchService.getMatchAnalysis(found);
          setAnalysis(analysisData);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [id, ssr]);
  if (loading) return /* @__PURE__ */ jsx("div", { className: "flex-1 flex items-center justify-center py-20 bg-gray-100 dark:bg-slate-950 transition-colors duration-300", children: /* @__PURE__ */ jsx("div", { className: "animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500" }) });
  if (!match || !analysis) return /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col items-center justify-center py-20 bg-gray-100 dark:bg-slate-950 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mb-4 text-slate-900 dark:text-white", children: "Match Analysis Missing" }),
    /* @__PURE__ */ jsx(Link, { to: "/", className: "bg-green-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-green-400 transition-colors", children: "Back to Fixtures" })
  ] });
  return /* @__PURE__ */ jsxs("div", { className: "w-full flex-1 bg-gray-100 dark:bg-slate-950 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx(Breadcrumbs, { match }),
    /* @__PURE__ */ jsx(MatchHero, { match }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsx(VerdictCard, { analysis }),
        /* @__PURE__ */ jsx(PredictionTable, { match }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-xl border dark:border-slate-800 p-8 mb-8 text-center transition-colors duration-300", children: [
          /* @__PURE__ */ jsxs("h3", { className: "text-lg font-black mb-4 text-slate-900 dark:text-white", children: [
            match.homeTeam.name,
            " vs ",
            match.awayTeam.name,
            " Football Score"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-12 border-t dark:border-slate-800 pt-8", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("img", { src: match.homeTeam.logo, alt: "", className: "w-10 h-10 object-contain" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase text-slate-700 dark:text-slate-300", children: match.homeTeam.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase mb-2", children: match.status === "LIVE" ? "In Progress" : "Not started" }),
              /* @__PURE__ */ jsx("div", { className: "text-2xl font-black text-slate-900 dark:text-white", children: match.status === "LIVE" ? `${match.homeTeam.score} - ${match.awayTeam.score}` : "VS" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center gap-2", children: [
              /* @__PURE__ */ jsx("img", { src: match.awayTeam.logo, alt: "", className: "w-10 h-10 object-contain" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold uppercase text-slate-700 dark:text-slate-300", children: match.awayTeam.name })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "w-full lg:w-80 space-y-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-sm p-6 transition-colors duration-300", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-4", children: "Related Videos" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-6", children: analysis.relatedVideos.map((video) => /* @__PURE__ */ jsxs("div", { className: "group cursor-pointer", children: [
            /* @__PURE__ */ jsxs("div", { className: "relative mb-2 rounded-xl overflow-hidden shadow-sm", children: [
              /* @__PURE__ */ jsx("img", { src: video.thumbnail, alt: "", className: "w-full aspect-video object-cover group-hover:scale-105 transition-transform" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity", children: /* @__PURE__ */ jsx("svg", { className: "w-10 h-10 text-white", fill: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { d: "M8 5v14l11-7z" }) }) })
            ] }),
            /* @__PURE__ */ jsx("h4", { className: "text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-2 leading-snug group-hover:text-green-500 transition-colors", children: video.title }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center mt-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase", children: video.team }),
              /* @__PURE__ */ jsx("span", { className: "text-[10px] text-gray-400 dark:text-gray-500", children: video.date })
            ] })
          ] }, video.id)) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 shadow-sm p-6 transition-colors duration-300", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white mb-6 border-b dark:border-slate-800 pb-4", children: "Offers" }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: analysis.bettingOffers.map((offer, idx) => /* @__PURE__ */ jsx(BettingOfferCard, { offer }, idx)) })
        ] })
      ] })
    ] }) })
  ] });
};
const OffersSidebar = () => {
  const offers = matchService.getOffers();
  return /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-6 sticky top-20 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("h3", { className: "font-black text-lg mb-6 text-slate-900 dark:text-white", children: "Offers" }),
    /* @__PURE__ */ jsx("div", { className: "space-y-6", children: offers.map((offer, idx) => /* @__PURE__ */ jsxs("div", { className: "border dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900 shadow-sm flex flex-col group hover:border-green-500 transition-all", children: [
      /* @__PURE__ */ jsxs("div", { className: "bg-slate-900 dark:bg-slate-800 p-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("img", { src: offer.logo, alt: offer.bookmaker, className: "h-6 object-contain" }),
        /* @__PURE__ */ jsx("button", { className: "bg-green-500 text-black px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-green-400", children: "Claim" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "p-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col mb-3", children: [
          /* @__PURE__ */ jsx("span", { className: "text-sm font-black text-slate-900 dark:text-white", children: offer.bonus }),
          offer.promoCode && /* @__PURE__ */ jsxs("span", { className: "text-[10px] text-gray-400 dark:text-gray-500 font-bold uppercase", children: [
            "with promo code ",
            offer.promoCode
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[10px] text-gray-400 dark:text-gray-400 leading-tight", children: offer.description })
      ] })
    ] }, idx)) })
  ] });
};
const CountryLeagues = () => {
  const ssr = useSSRData();
  const { countryName } = useParams();
  const [matches, setMatches] = useState((ssr == null ? void 0 : ssr.page) === "country" && ssr.country === countryName ? ssr.matches || [] : []);
  const [loading, setLoading] = useState(ssr && ssr.page === "country" ? false : true);
  useEffect(() => {
    if (ssr && ssr.page === "country" && ssr.country === countryName) return;
    const fetchData = async () => {
      setLoading(true);
      if (countryName) {
        const data = await matchService.getMatchesByCountry(countryName);
        setMatches(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [countryName, ssr]);
  const groupedByLeague = useMemo(() => {
    const groups = {};
    matches.forEach((m) => {
      if (!groups[m.league]) groups[m.league] = [];
      groups[m.league].push(m);
    });
    return groups;
  }, [matches]);
  const availableLeagues = useMemo(() => Object.keys(groupedByLeague), [groupedByLeague]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full bg-gray-100 dark:bg-slate-950 flex-1 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-800", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-green-500 transition-colors", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "»" }),
      /* @__PURE__ */ jsx("span", { className: "text-white", children: countryName })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-8 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-black text-slate-900 dark:text-white", children: [
            countryName,
            " Leagues"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxs("select", { className: "appearance-none bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-xs font-bold pr-10 hover:border-gray-400 dark:hover:border-slate-600 cursor-pointer shadow-sm min-w-[180px] text-slate-900 dark:text-white", children: [
              /* @__PURE__ */ jsx("option", { children: "Select League" }),
              availableLeagues.map((l) => /* @__PURE__ */ jsx("option", { value: l, children: l }, l))
            ] }),
            /* @__PURE__ */ jsx("svg", { className: "w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) })
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-24 bg-gray-50 dark:bg-slate-800/50 rounded-xl animate-pulse" }, i)) }) : availableLeagues.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-12", children: Object.entries(groupedByLeague).map(([leagueName, leagueMatches]) => /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-6", children: [
            /* @__PURE__ */ jsx("img", { src: leagueMatches[0].countryFlag, alt: "", className: "w-5 h-5 object-contain" }),
            /* @__PURE__ */ jsx("h2", { className: "text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight", children: leagueName })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[80px_1fr_60px_60px_60px_80px] gap-4 px-4 mb-2 text-[10px] font-black uppercase text-gray-300 dark:text-slate-600", children: [
            /* @__PURE__ */ jsx("span", { children: "Time" }),
            /* @__PURE__ */ jsx("span", { children: "Game" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "-" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "1" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "X" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "2" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "Prediction" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: leagueMatches.map((match) => /* @__PURE__ */ jsx(MatchCard, { match }, match.id)) })
        ] }, leagueName)) }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 dark:text-gray-500 font-bold", children: "No matches found for this country." }) })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "w-full lg:w-80", children: /* @__PURE__ */ jsx(OffersSidebar, {}) })
    ] }) })
  ] });
};
const LeagueDetail = () => {
  const ssr = useSSRData();
  const { countryName, leagueName } = useParams();
  const [matches, setMatches] = useState((ssr == null ? void 0 : ssr.page) === "league" && ssr.country === countryName && ssr.leagueName === leagueName ? ssr.matches || [] : []);
  const [loading, setLoading] = useState(ssr && ssr.page === "league" ? false : true);
  useEffect(() => {
    if (ssr && ssr.page === "league" && ssr.country === countryName && ssr.leagueName === leagueName) return;
    const fetchData = async () => {
      setLoading(true);
      if (countryName && leagueName) {
        const data = await matchService.getMatchesByLeague(countryName, leagueName);
        setMatches(data);
      }
      setLoading(false);
    };
    fetchData();
  }, [countryName, leagueName, ssr]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full bg-gray-100 dark:bg-slate-950 flex-1 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-800", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-green-500 transition-colors", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "»" }),
      /* @__PURE__ */ jsx(Link, { to: `/country/${countryName}`, className: "hover:text-green-500 transition-colors", children: countryName }),
      /* @__PURE__ */ jsx("span", { children: "»" }),
      /* @__PURE__ */ jsx("span", { className: "text-white", children: leagueName })
    ] }) }) }),
    /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4 py-8", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border dark:border-slate-800 p-8 transition-colors duration-300", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-10", children: [
          matches.length > 0 && /* @__PURE__ */ jsx("img", { src: matches[0].countryFlag, alt: "", className: "w-6 h-6 object-contain" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-2xl font-black text-slate-900 dark:text-white", children: [
            leagueName,
            " Fixtures"
          ] })
        ] }),
        loading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "h-24 bg-gray-50 dark:bg-slate-800/50 rounded-xl animate-pulse" }, i)) }) : matches.length > 0 ? /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[80px_1fr_60px_60px_60px_80px] gap-4 px-4 mb-2 text-[10px] font-black uppercase text-gray-300 dark:text-slate-600", children: [
            /* @__PURE__ */ jsx("span", { children: "Time" }),
            /* @__PURE__ */ jsx("span", { children: "Game" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "-" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "1" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "X" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "2" }),
            /* @__PURE__ */ jsx("span", { className: "text-center", children: "Prediction" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-4", children: matches.map((match) => /* @__PURE__ */ jsx(MatchCard, { match }, match.id)) })
        ] }) : /* @__PURE__ */ jsx("div", { className: "text-center py-20", children: /* @__PURE__ */ jsx("p", { className: "text-gray-400 dark:text-gray-500 font-bold", children: "No matches found for this league." }) })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "w-full lg:w-80", children: /* @__PURE__ */ jsx(OffersSidebar, {}) })
    ] }) })
  ] });
};
const Live = () => {
  const ssr = useSSRData();
  const [matches, setMatches] = useState((ssr == null ? void 0 : ssr.matches) ?? []);
  const [loading, setLoading] = useState(ssr ? false : true);
  useEffect(() => {
    if (ssr && ssr.page === "live") return;
    const fetchData = async () => {
      setLoading(true);
      const data = await matchService.getLiveMatches();
      setMatches(data);
      setLoading(false);
    };
    fetchData();
  }, [ssr]);
  const groupedMatches = useMemo(() => matchService.groupMatches(matches), [matches]);
  return /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto px-4 py-8 w-full transition-colors duration-300", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-3 mb-8", children: [
      /* @__PURE__ */ jsx("div", { className: "w-3 h-3 bg-red-500 rounded-full animate-pulse shadow-lg shadow-red-500/50" }),
      /* @__PURE__ */ jsx("h1", { className: "text-3xl font-black text-slate-900 dark:text-white", children: "Live Matches" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col lg:flex-row gap-8", children: [
      /* @__PURE__ */ jsx("div", { className: "flex-1 min-w-0", children: loading ? /* @__PURE__ */ jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-slate-900 rounded-xl h-24 animate-pulse border dark:border-slate-800 shadow-sm" }, i)) }) : matches.length > 0 ? /* @__PURE__ */ jsx("div", { className: "space-y-12", children: Object.entries(groupedMatches).map(([key, data]) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 mb-4", children: [
          /* @__PURE__ */ jsx("img", { src: data.flag, alt: "", className: "w-5 h-5 object-contain" }),
          /* @__PURE__ */ jsxs("h2", { className: "text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight", children: [
            data.country,
            " : ",
            data.league
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "space-y-4", children: data.matches.map((match) => /* @__PURE__ */ jsx(MatchCard, { match }, match.id)) })
      ] }, key)) }) : /* @__PURE__ */ jsxs("div", { className: "bg-white dark:bg-slate-900 rounded-2xl border dark:border-slate-800 p-12 text-center shadow-sm transition-colors duration-300", children: [
        /* @__PURE__ */ jsx("h3", { className: "text-lg font-black text-slate-900 dark:text-white mb-1", children: "No live matches currently" }),
        /* @__PURE__ */ jsx("p", { className: "text-gray-500 dark:text-gray-400 text-sm font-medium", children: "Check back later or view upcoming fixtures." })
      ] }) }),
      /* @__PURE__ */ jsx("aside", { className: "w-full lg:w-80", children: /* @__PURE__ */ jsx(Sidebar, {}) })
    ] })
  ] });
};
const FooterDetails = () => {
  const location = useLocation();
  const path = location.pathname;
  const content = useMemo(() => {
    switch (path) {
      case "/privacy-policy":
        return {
          title: "Privacy Policy",
          body: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { children: "Last updated: June 2024" }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3 text-slate-900 dark:text-white", children: "1. Information We Collect" }),
              /* @__PURE__ */ jsx("p", { children: "We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us for support. This may include your name, email address, and any other information you choose to provide." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3 text-slate-900 dark:text-white", children: "2. Use of Information" }),
              /* @__PURE__ */ jsx("p", { children: "We use the information we collect to provide, maintain, and improve our services, to communicate with you, and to personalize your experience on Football Streams." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3 text-slate-900 dark:text-white", children: "3. Cookies" }),
              /* @__PURE__ */ jsx("p", { children: "We use cookies and similar technologies to track activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent." })
            ] })
          ] })
        };
      case "/terms-of-use":
        return {
          title: "Terms of Use",
          body: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsx("p", { children: "Last updated: June 2024" }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3 text-slate-900 dark:text-white", children: "1. Agreement to Terms" }),
              /* @__PURE__ */ jsx("p", { children: "By accessing or using Football Streams, you agree to be bound by these Terms of Use and our Privacy Policy. If you do not agree to these terms, please do not use our services." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3 text-slate-900 dark:text-white", children: "2. Intellectual Property" }),
              /* @__PURE__ */ jsx("p", { children: "The content, features, and functionality of Football Streams are owned by us and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws." })
            ] }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold mb-3 text-slate-900 dark:text-white", children: "3. User Conduct" }),
              /* @__PURE__ */ jsx("p", { children: "You agree not to use Football Streams for any unlawful purpose or in any way that interrupts, damages, or impairs our service." })
            ] })
          ] })
        };
      case "/contact-us":
        return {
          title: "Contact US",
          body: /* @__PURE__ */ jsxs("div", { className: "space-y-8", children: [
            /* @__PURE__ */ jsx("p", { children: "Have questions or feedback? We'd love to hear from you. Fill out the form below or reach out to our team directly." }),
            /* @__PURE__ */ jsxs("form", { className: "space-y-4 max-w-lg", onSubmit: (e) => e.preventDefault(), children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300", children: "Name" }),
                /* @__PURE__ */ jsx("input", { type: "text", className: "w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors dark:text-white", placeholder: "Your Name" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300", children: "Email" }),
                /* @__PURE__ */ jsx("input", { type: "email", className: "w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors dark:text-white", placeholder: "Your Email" })
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("label", { className: "block text-sm font-bold mb-1 text-slate-700 dark:text-slate-300", children: "Message" }),
                /* @__PURE__ */ jsx("textarea", { rows: 4, className: "w-full bg-white dark:bg-slate-800 border dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-green-500 transition-colors dark:text-white", placeholder: "How can we help?" })
              ] }),
              /* @__PURE__ */ jsx("button", { type: "submit", className: "bg-green-500 hover:bg-green-600 text-black font-black px-8 py-3 rounded-xl text-sm transition-all shadow-lg", children: "Send Message" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "pt-8 border-t dark:border-slate-800", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-slate-900 dark:text-white mb-2", children: "Other ways to connect:" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Email: support@footballstreams.com" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm", children: "Twitter: @FootballStreams" })
            ] })
          ] })
        };
      case "/faq":
        return {
          title: "Frequently Asked Questions",
          body: /* @__PURE__ */ jsxs("div", { className: "space-y-6", children: [
            /* @__PURE__ */ jsxs("section", { className: "bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-2 text-slate-900 dark:text-white", children: "Is Football Streams free to use?" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Yes, our platform is free for all users. We provide schedules, scores, and analysis without requiring a subscription." })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-2 text-slate-900 dark:text-white", children: "Do you host the live streams?" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "No, Football Streams does not host any video content. We provide a guide to official and legal streaming sources where you can watch the matches." })
            ] }),
            /* @__PURE__ */ jsxs("section", { className: "bg-white dark:bg-slate-900 p-6 rounded-2xl border dark:border-slate-800 shadow-sm", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-2 text-slate-900 dark:text-white", children: "How often are scores updated?" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: "Live scores are updated in real-time. Our data feeds are refreshed constantly to ensure you never miss a goal." })
            ] })
          ] })
        };
      default:
        return { title: "Not Found", body: /* @__PURE__ */ jsx("p", { children: "The page you are looking for does not exist." }) };
    }
  }, [path]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full flex-1 bg-gray-100 dark:bg-slate-950 transition-colors duration-300", children: [
    /* @__PURE__ */ jsx("div", { className: "bg-slate-900 dark:bg-black text-white py-4 border-b border-gray-800 dark:border-slate-900", children: /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto px-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 text-[11px] font-bold uppercase tracking-wider text-gray-400", children: [
      /* @__PURE__ */ jsx(Link, { to: "/", className: "hover:text-green-500 transition-colors", children: "Home" }),
      /* @__PURE__ */ jsx("span", { children: "»" }),
      /* @__PURE__ */ jsx("span", { className: "text-white", children: content.title })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "max-w-4xl mx-auto px-4 py-16", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-4xl font-black text-slate-900 dark:text-white mb-12", children: content.title }),
      /* @__PURE__ */ jsx("div", { className: "prose prose-slate dark:prose-invert max-w-none text-gray-600 dark:text-gray-400", children: content.body })
    ] })
  ] });
};
const App = () => {
  return /* @__PURE__ */ jsx(ThemeProvider, { children: /* @__PURE__ */ jsxs("div", { className: "min-h-screen flex flex-col bg-gray-100 dark:bg-slate-950 w-full transition-colors duration-300", children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx("main", { className: "flex-grow flex flex-col w-full", children: /* @__PURE__ */ jsxs(Routes, { children: [
      /* @__PURE__ */ jsx(Route, { path: "/", element: /* @__PURE__ */ jsx(Home, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/match/:id", element: /* @__PURE__ */ jsx(MatchDetail, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/country/:countryName", element: /* @__PURE__ */ jsx(CountryLeagues, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/league/:countryName/:leagueName", element: /* @__PURE__ */ jsx(LeagueDetail, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/live", element: /* @__PURE__ */ jsx(Live, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/privacy-policy", element: /* @__PURE__ */ jsx(FooterDetails, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/terms-of-use", element: /* @__PURE__ */ jsx(FooterDetails, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/contact-us", element: /* @__PURE__ */ jsx(FooterDetails, {}) }),
      /* @__PURE__ */ jsx(Route, { path: "/faq", element: /* @__PURE__ */ jsx(FooterDetails, {}) })
    ] }) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] }) });
};
async function fetchDataForUrl(url) {
  try {
    const u = new URL(url, "http://localhost");
    const pathname = u.pathname;
    if (pathname === "/" || pathname === "") {
      const matches = await matchService.getAllMatches();
      const all = await matchService.getAllMatches();
      const liveCount = all.filter((m) => m.status === "LIVE").length;
      return { page: "home", matches, liveCount };
    }
    if (pathname === "/live") {
      const matches = await matchService.getLiveMatches();
      return { page: "live", matches };
    }
    if (pathname.startsWith("/league/")) {
      const parts = pathname.split("/").filter(Boolean);
      const country = parts[1] || "";
      const leagueName = parts[2] || "";
      const matches = await matchService.getMatchesBySubCategory(country, leagueName);
      return { page: "league", matches, country, leagueName };
    }
    if (pathname.startsWith("/country/")) {
      const parts = pathname.split("/").filter(Boolean);
      const country = parts[1] || "";
      const matches = await matchService.getMatchesByCategory(country);
      return { page: "country", matches, country };
    }
    if (pathname.startsWith("/match/")) {
      const parts = pathname.split("/").filter(Boolean);
      const id = parts[1];
      const match = await matchService.getMatchById(id);
      const analysis = match ? await matchService.getMatchAnalysis(match) : null;
      return { page: "match", match, analysis };
    }
    return { page: "notfound" };
  } catch (err) {
    console.error("fetchDataForUrl error", err);
    return { page: "error" };
  }
}
async function render(url) {
  const data = await fetchDataForUrl(url);
  const appHtml = renderToString(
    /* @__PURE__ */ jsx(SSRDataProvider, { data, children: /* @__PURE__ */ jsx(MemoryRouter, { initialEntries: [url], children: /* @__PURE__ */ jsx(App, {}) }) })
  );
  return { html: appHtml, data };
}
export {
  render as default,
  render
};
