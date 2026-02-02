import { matchService } from '../../services/matchService';

export async function fetchDataForUrl(url: string) {
  try {
    const u = new URL(url, 'http://localhost');
    const pathname = u.pathname;

    if (pathname === '/' || pathname === '') {
      const matches = await matchService.getAllMatches();
      const all = await matchService.getAllMatches();
      const liveCount = all.filter(m => m.status === 'LIVE').length;
      return { page: 'home', matches, liveCount };
    }

    if (pathname === '/live') {
      const matches = await matchService.getLiveMatches();
      return { page: 'live', matches };
    }

    if (pathname.startsWith('/league/')) {
      const parts = pathname.split('/').filter(Boolean);
      // /league/:countryName/:leagueName
      const country = parts[1] || '';
      const leagueName = parts[2] || '';
      const matches = await matchService.getMatchesBySubCategory(country, leagueName);
      return { page: 'league', matches, country, leagueName };
    }

    if (pathname.startsWith('/country/')) {
      const parts = pathname.split('/').filter(Boolean);
      const country = parts[1] || '';
      const matches = await matchService.getMatchesByCategory(country);
      return { page: 'country', matches, country };
    }

    if (pathname.startsWith('/match/')) {
      const parts = pathname.split('/').filter(Boolean);
      const id = parts[1];
      const match = await matchService.getMatchById(id);
      const analysis = match ? await matchService.getMatchAnalysis(match) : null;
      return { page: 'match', match, analysis };
    }

    // default fallback
    return { page: 'notfound' };
  } catch (err) {
    console.error('fetchDataForUrl error', err);
    return { page: 'error' };
  }
}
