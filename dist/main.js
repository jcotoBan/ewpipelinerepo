import { logger } from 'log';
import URLSearchParams from 'url-search-params';
import { SetCookie } from 'cookies';

function onClientResponse (request, response) {
  logger.log('[ClientResponse] executed');

  const parameters = new URLSearchParams(request.query);
  const campaignId = parameters.get('campaign');
  const referer = request.getHeader('Referer');
  logger.log(`query: ${campaignId}, referer: ${referer}`);

  const cookie = new SetCookie();
  cookie.name = 'campaign';
  cookie.maxAge = 30 * 24 * 60 * 60;
  cookie.httpOnly = true;

  if (campaignId) {
    logger.log(`set campaign cookie using query parameter`);
    cookie.value = campaignId;
    response.addHeader('Set-Cookie', cookie.toHeader());
    return cookie;
  }

  if (referer) {
    logger.log(`set campaign cookie using referer header`);
    if (referer.includes('google')) { cookie.value = 'se001'; }
    if (referer.includes('yahoo') ) { cookie.value = 'se002'; }

    if (cookie.value) {
      response.addHeader('Set-Cookie', cookie.toHeader());
      return cookie;
    }
  }
}

export { onClientResponse };
