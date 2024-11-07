import { ROUTES } from './routes-config';

export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface SearchResult {
  title: string;
  href: string;
}

export function advanceSearch(searchTerm: string): SearchResult[] {
  if (!searchTerm) return [];

  const results: SearchResult[] = [];

  const searchTermLower = searchTerm.toLowerCase();

  function searchRoutes(routes: typeof ROUTES) {
    routes.forEach(route => {
      if (route.items) {
        searchRoutes(route.items);
      }

      const titleMatch = route.title.toLowerCase().includes(searchTermLower);
      if (titleMatch && !route.noLink) {
        results.push({
          title: route.title,
          href: route.href,
        });
      }
    });
  }

  searchRoutes(ROUTES);
  return results;
}
