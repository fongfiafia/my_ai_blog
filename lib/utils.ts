/**
 * 格式化日期为易读格式
 * @param date - 日期字符串或Date对象
 * @returns 格式化后的日期字符串，格式如：2024年3月21日
 */
export function formatDate(date: string | Date): string {
  const d = new Date(date);
  return d.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

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

export function stringToDate(dateString: string): Date {
  return new Date(dateString);
}
