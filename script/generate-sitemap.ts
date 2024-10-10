import fs from 'fs';
import path from 'path';
import { ROUTES } from '../lib/routes-config';

function getAllRoutes(routes: typeof ROUTES, parentPath = ''): string[] {
    return routes.flatMap(route => {
        const fullPath = parentPath + route.href;
        if (route.noLink) {
            return route.items ? getAllRoutes(route.items, fullPath) : [];
        }
        const childRoutes = route.items ? getAllRoutes(route.items, fullPath) : [];
        return [fullPath, ...childRoutes];
    });
}

function generateSitemapXml(routes: string[]): string {
    const baseUrl = 'https://www.lookai.top';
    const today = new Date().toISOString().split('T')[0];

    const urlSet = routes.map(route => `
  <url>
    <loc>${baseUrl}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>${urlSet}
</urlset>`;
}

function main() {
    const routes = getAllRoutes(ROUTES);
    const sitemapContent = generateSitemapXml(routes);
    const sitemapPath = path.join(process.cwd(), 'public', 'sitemap.xml');

    fs.writeFileSync(sitemapPath, sitemapContent);
    console.log('Sitemap generated successfully at', sitemapPath);
}

main();