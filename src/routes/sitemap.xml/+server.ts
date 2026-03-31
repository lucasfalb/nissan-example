// Node built-ins are available at runtime in this endpoint, but this workspace
// does not ship `@types/node`.
// @ts-ignore
import { statSync } from 'node:fs';
// @ts-ignore
import { join } from 'node:path';
import { pageDefinitions } from '$lib/content/page-definitions';
import { toAbsoluteUrl } from '$lib/config/site';

export const prerender = true;

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

function getLastModified(...relativePaths: string[]) {
  const timestamps = relativePaths.flatMap((relativePath) => {
    try {
      return [statSync(join(process.cwd(), relativePath)).mtime.getTime()];
    } catch {
      return [];
    }
  });

  return formatDate(
    timestamps.length > 0 ? new Date(Math.max(...timestamps)) : new Date(),
  );
}

function escapeXml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function GET() {
  const routes = [
    {
      path: '/',
      priority: '1.0',
      lastmod: getLastModified(
        'src/routes/+page.ts',
        'src/routes/+page.svelte',
        'src/lib/content/model-banners.ts',
      )
    },
    {
      path: '/modelos/',
      priority: '0.9',
      lastmod: getLastModified(
        'src/routes/modelos/+page.ts',
        'src/routes/modelos/+page.svelte',
        'src/lib/content/page-definitions.ts',
      )
    },
    ...Object.values(pageDefinitions).map((page) => ({
      path: page.seo.canonicalPath,
      lastmod: getLastModified(
        'src/lib/content/page-definitions.ts',
        'src/lib/components/pages/DetailLanding.svelte',
      ),
      priority:
        page.kind === 'campaign' || page.kind === 'standalone'
          ? '0.8'
          : page.kind === 'model'
            ? '0.7'
            : '0.6'
    }))
  ];

  const uniqueRoutes = [];
  const seenPaths = new Set<string>();

  for (const route of routes) {
    if (seenPaths.has(route.path)) {
      continue;
    }

    seenPaths.add(route.path);
    uniqueRoutes.push(route);
  }

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${uniqueRoutes
  .map(
    (route) =>
      `  <url><loc>${escapeXml(toAbsoluteUrl(route.path))}</loc><lastmod>${route.lastmod}</lastmod><priority>${route.priority}</priority></url>`,
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
