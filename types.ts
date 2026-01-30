
export enum MatchStatus {
  UPCOMING = 'UPCOMING',
  LIVE = 'LIVE',
  FINISHED = 'FINISHED'
}

export interface TeamFormMatch {
  date: string;
  league: string;
  country: string;
  homeTeam: string;
  homeLogo: string;
  awayTeam: string;
  awayLogo: string;
  htScore: string;
  ftScore: string;
  result: 'W' | 'D' | 'L';
}

export interface BookmakerOdds {
  name: string;
  logo: string;
  home: number;
  draw: number;
  away: number;
}

export interface BettingOffer {
  bookmaker: string;
  logo: string;
  bonus: string;
  promoCode?: string;
  description: string;
  claimUrl: string;
}

export interface RelatedVideo {
  id: string;
  title: string;
  thumbnail: string;
  team: string;
  date: string;
}

export interface MatchAnalysis {
  verdict: string;
  editor: {
    name: string;
    role: string;
    avatar: string;
  };
  matchInfo: {
    stadium: string;
    capacity: string;
    referee: string;
    weather: string;
  };
  bookmakerOdds: BookmakerOdds[];
  h2hStats: Array<{label: string, home: string, away: string}>;
  homeDetailedForm: TeamFormMatch[];
  awayDetailedForm: TeamFormMatch[];
  homeFormSummary: { w: number, d: number, l: number };
  awayFormSummary: { w: number, d: number, l: number };
  relatedVideos: RelatedVideo[];
  bettingOffers: BettingOffer[];
}

export interface Match {
  id: string;
  homeTeam: { name: string; logo: string; score?: number; };
  awayTeam: { name: string; logo: string; score?: number; };
  time: string;
  date: string; 
  league: string;
  country: string;
  countryFlag: string;
  status: MatchStatus;
  odds: { home: number; draw: number; away: number; };
  prediction?: string;
  predictionOdds?: string;
  description?: string;
  analysis?: MatchAnalysis;
}

/**
 * Interface for matches grouped by league/country
 */
export interface GroupedMatch {
  matches: Match[];
  country: string;
  flag: string;
  league: string;
}
