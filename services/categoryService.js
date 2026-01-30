
import * as dataStore from '../Lib/dataStore';

class CategoryService {
  getSuperCategories() {
    return dataStore.getSuperCategories();
  }

  getPopularCategories() {
    return dataStore.getPopularCategories();
  }

  getAllCategories() {
    const popularNames = this.getPopularCategories().map(c => c.categoryName.toLowerCase());
    const allCountries = dataStore.getAllCountries();
    return allCountries.filter(country => !popularNames.includes(country.toLowerCase()));
  }

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
}

export const categoryService = new CategoryService();
