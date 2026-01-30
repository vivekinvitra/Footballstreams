
import * as dataStore from '../Lib/dataStore';

class LeagueService {
  getPopularLeagues() {
    return dataStore.getSupercatItems();
  }

  getFooterQuickLinks() {
    return [
      { name: 'Premier League', path: '/league/England/English Premier League' },
      { name: 'La Liga', path: '/league/Spain/Spanish La Liga' },
      { name: 'Bundesliga', path: '/league/Germany/Bundesliga' },
      { name: 'Champions League', path: '/league/International/UEFA Champions League' }
    ];
  }
}

export const leagueService = new LeagueService();
