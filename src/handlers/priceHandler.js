const axios = require('axios');
const { PRICES_URL, USER_AGENT } = require('../constants.js');

const pricesClient = axios.create({
  baseURL: PRICES_URL,
  timeout: 2000,
  headers: {'User-Agent': USER_AGENT}
});

async function getPrice(itemID) {
  return pricesClient.get('/api/v1/osrs/latest', {
    params: {
      id: itemID
    }
  })
  .then(resp => {
    console.log(`${resp.status} ${resp.statusText} ${resp.config.baseURL}${resp.config.url}\n${JSON.stringify(resp.config.headers)}\n${JSON.stringify(resp.config.params)}`);
    return resp.data.data[itemID]
  })
}

async function getTimeseries(itemID, timestep) {
  return pricesClient.get('/api/v1/osrs/timeseries', {
    params: {
      id: itemID,
      timestep: timestep
    }
  })
  .then(resp => {
    console.log(`${resp.status} ${resp.statusText} ${resp.config.baseURL}${resp.config.url}\n${JSON.stringify(resp.config.headers, null, 2)}\n${JSON.stringify(resp.config.params, null, 2)}`);
    
    const highPrices = [];
    const lowPrices = [];
    
    resp.data.data.forEach(step => {
      highPrices.push({
        x: step.timestamp*1000,
        y: step.avgHighPrice
      });
      lowPrices.push({
        x: step.timestamp*1000,
        y: step.avgLowPrice
      });
    });
    return { highPrices, lowPrices };
  })
}

module.exports = {
  getPrice,
  getTimeseries
}