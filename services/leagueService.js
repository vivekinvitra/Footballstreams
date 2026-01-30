
import * as dataStore from '../Lib/dataStore';

class LeagueService {
  getPopularLeagues() {
    return dataStore.getSupercatItems();
  }
}

export const leagueService = new LeagueService();
