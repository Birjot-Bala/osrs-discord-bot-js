const axios = require('axios');
const fs = require('fs');
const { WIKI_URL, USER_AGENT } = require('../src/constants.js');


const writeToFile = (data) => {
  fs.writeFileSync('data/tradeable_items.json', JSON.stringify(data, null, 2))
}

const wikiClient = axios.create({
  baseURL: WIKI_URL,
  timeout: 2000,
  headers: {'User-Agent': USER_AGENT}
});

wikiClient.get('/w/Module:GEIDs/data.json', {
  params: {
    action: 'raw',
    ctype: 'application_json'
  }
})
.then(resp => {
  console.log(resp.config.baseURL, resp.config.url, resp.config.headers, resp.config.params);
  writeToFile(resp.data);
  console.log('Tradeable item list updated')
})
.catch(err => {
  console.log(err)
});