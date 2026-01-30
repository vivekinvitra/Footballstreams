
import * as dataStore from './dataStore';

class MatchService {
  async getAllMatches() {
    try {
      return await dataStore.getMatches();
    } catch (error) {
      console.error('Failed to fetch matches:', error);
      return [];
    }
  }

  async getLiveMatches() {
    const matches = await this.getAllMatches();
    return matches.filter(m => m.status === 'LIVE');
  }

  async getMatchesByDate(date) {
    const matches = await this.getAllMatches();
    if (!date || date === 'ALL') return matches;
    return matches.filter(m => m.date === date);
  }

  async getMatchesByCategory(categoryName) {
    const matches = await this.getAllMatches();
    return matches.filter(m => m.country.toLowerCase() === categoryName.toLowerCase());
  }

  async getMatchesBySubCategory(categoryName, subCategoryName) {
    const matches = await this.getAllMatches();
    return matches.filter(m => 
      m.country.toLowerCase() === categoryName.toLowerCase() && 
      m.league.toLowerCase() === subCategoryName.toLowerCase()
    );
  }

  // Aliases for better readability
  async getMatchesByCountry(countryName) { return this.getMatchesByCategory(countryName); }
  async getMatchesByLeague(country, league) { return this.getMatchesBySubCategory(country, league); }

  async getMatchById(id) {
    const matches = await this.getAllMatches();
    return matches.find(m => m.id === id);
  }

  async getMatchAnalysis(match) {
    if (!match) return null;
    return dataStore.getMatchAnalysis(match);
  }

  getOffers() {
    return dataStore.getOffers();
  }

  async search(query, type = 'All') {
    const data = dataStore.getSearchData();
    return data.filter(item => {
      const matchesQuery = item.name.toLowerCase().includes(query.toLowerCase()) || 
                           item.country.toLowerCase().includes(query.toLowerCase());
      const matchesType = type === 'All' || item.type === type;
      return matchesQuery && matchesType;
    });
  }

  calculateOddsPercentages(odds) {
    if (!odds) return { p1: 0, pX: 0, p2: 0 };
    const total = (1 / odds.home) + (1 / odds.draw) + (1 / odds.away);
    return {
      p1: Math.round(((1 / odds.home) / total) * 100),
      pX: Math.round(((1 / odds.draw) / total) * 100),
      p2: Math.round(((1 / odds.away) / total) * 100)
    };
  }

  groupMatches(matches) {
    const groups = {};
    matches.forEach(m => {
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

export const matchService = new MatchService();
