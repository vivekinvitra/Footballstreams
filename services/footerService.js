
import * as dataStore from '../Lib/dataStore';

class FooterService {
  getSupportLinks() {
    return dataStore.getSupportLinks();
  }

  getQuickLinks() {
    return dataStore.getFooterQuickLinks();
  }
}

export const footerService = new FooterService();
