/**
 * ImageFitly — Page View Counter (Cloudflare Worker + KV)
 * -------------------------------------------------------
 * Counts total + today's page views per site.
 * Each GET request increments and returns { total, today }.
 * Bots are skipped so crawler traffic does not inflate the count.
 *
 * KV binding name: COUNTER_KV
 * Deploy: paste this code into a Cloudflare Worker, then bind a KV namespace
 *         named COUNTER_KV to the worker (see COUNTER_SETUP steps in chat).
 */

const BOT_UA = /bot|crawler|spider|crawling|slurp|mediapartners|facebookexternalhit|preview|baiduspider|bingbot|googlebot|curl|wget|yandex/i;

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    const ua = request.headers.get('user-agent') || '';
    const site = (url.searchParams.get('site') || 'default').slice(0, 40);
    const today = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
    const totalKey = `v:${site}:total`;
    const todayKey = `v:${site}:${today}`;

    const isBot = BOT_UA.test(ua);

    let total = parseInt(await env.COUNTER_KV.get(totalKey)) || 0;
    let todayCount = parseInt(await env.COUNTER_KV.get(todayKey)) || 0;

    if (!isBot) {
      total += 1;
      todayCount += 1;
      await Promise.all([
        env.COUNTER_KV.put(totalKey, total.toString()),
        env.COUNTER_KV.put(todayKey, todayCount.toString()),
      ]);
    }

    return new Response(
      JSON.stringify({ total, today: todayCount, site }),
      {
        headers: {
          ...corsHeaders(),
          'Content-Type': 'application/json',
          'Cache-Control': 'no-store',
        },
      }
    );
  },
};
