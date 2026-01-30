
import * as dataStore from './dataStore';

/**
 * MatchService
 * Acts as the orchestration layer for the application's data needs.
 * Manages caching, filtering, and data transformation.
 */
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

  // Backwards compatibility aliases
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

  getSupercatItems() {
    return dataStore.getSupercatItems();
  }

  getPopularLeagues() {
    return this.getSupercatItems();
  }

  getOffers() {
    return dataStore.getOffers();
  }

  // --- New Header/Navigation methods ---
  getSuperCategories() {
    return dataStore.getSuperCategories();
  }

  getPopularCategories() {
    return dataStore.getPopularCategories();
  }

  getAllCategories() {
    // Get all countries and filter out those that are in Popular
    const popularNames = this.getPopularCategories().map(c => c.categoryName.toLowerCase());
    const allCountries = dataStore.getAllCountries();
    return allCountries.filter(country => !popularNames.includes(country.toLowerCase()));
  }

  getNavigationCategories() { return this.getPopularCategories(); }

  getInternationalLeagues() {
    return dataStore.getInternationalLeagues();
  }

  getNewsCategories() {
    return dataStore.getNewsCategories();
  }

  getMegaMenuOffers() {
    return dataStore.getMegaMenuOffers();
  }

  getBettingSitesLink() {
    return dataStore.getBettingSitesConfig();
  }

  getFooterQuickLinks() {
    return [
      { name: 'Premier League', path: '/league/England/English Premier League' },
      { name: 'La Liga', path: '/league/Spain/Spanish La Liga' },
      { name: 'Bundesliga', path: '/league/Germany/Bundesliga' },
      { name: 'Champions League', path: '/league/International/UEFA Champions League' }
    ];
  }

  getSupportLinks() {
    return dataStore.getSupportLinks();
  }

  // --- Business Logic Helpers ---
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
