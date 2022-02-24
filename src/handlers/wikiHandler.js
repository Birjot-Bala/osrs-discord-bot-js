const axios = require('axios');
const { WIKI_URL, USER_AGENT } = require('../constants.js');

const wikiClient = axios.create({
  baseURL: WIKI_URL,
  timeout: 2000,
  headers: {'User-Agent': USER_AGENT}
});

async function searchWiki(query) {
  return wikiClient.get('/api.php', {
    params: {
      action: 'query',
      generator: 'prefixsearch',
      gpssearch: query,
      gpslimit: 3,
      prop: 'info',
      inprop: 'url',
      format: 'json',
    }
  })
  .then(resp => {
    console.log(`${resp.status} ${resp.statusText} ${resp.config.baseURL}${resp.config.url}\n${JSON.stringify(resp.config.headers)}\n${JSON.stringify(resp.config.params)}`);
    return resp.data.query.pages
  })
}

module.exports = {
  searchWiki
}