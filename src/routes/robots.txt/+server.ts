import { toAbsoluteUrl } from '$lib/config/site';

export const prerender = true;

export function GET() {
  const body = `User-agent: *
Disallow:

Sitemap: ${toAbsoluteUrl('/sitemap.xml')}`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'max-age=0, s-maxage=3600'
    }
  });
}
