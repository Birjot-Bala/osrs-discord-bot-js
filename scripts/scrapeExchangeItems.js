const axios = require('axios');
const fs = require('fs');
const { WIKI_URL, USER_AGENT } = require('../src/constants.js');



const _GEIDParser = (data) => {
    const objectResp = {}
    const re = /\["(.*)"\] = (\d+)/g

    const matchIter = data.matchAll(re);

    for (const match of matchIter) {
        objectResp[match[1]] = match[2];
    }
    
    fs.writeFileSync('data/tradeable_items.json', JSON.stringify(objectResp, null, 2));
}

const wikiClient = axios.create({
    baseURL: WIKI_URL,
    timeout: 2000,
    headers: {'User-Agent': USER_AGENT}
});

wikiClient.get('/w/Module:GEIDs/data', {
    params: {
        action: 'raw'
    }
})
.then(resp => {
    console.log(resp.config.baseURL, resp.config.url, resp.config.headers, resp.config.params);
    _GEIDParser(resp.data);
    console.log('Tradeable item list updated')
})
.catch(err => {
    console.log(err)
});