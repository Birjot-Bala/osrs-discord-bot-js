const axios = require('slash-create');
const { TRACKER_URL, USER_AGENT } = require('../constants.js')

const trackerClient = axios.create({
    baseURL: TRACKER_URL,
    timeout: 2000,
    headers: {'User-Agent': USER_AGENT}
  });

async function getPlayerGains(username, period) {
  return trackerClient.get(`/players/${username}/gained`, {
    params: {
        period: period
    }
  }).then(resp => {
    console.log(`${resp.status} ${resp.statusText} ${resp.config.baseURL}${resp.config.url}\n${JSON.stringify(resp.config.headers)}\n${JSON.stringify(resp.config.params)}`);
    return resp.data.data.skills
  })
}

module.exports = {
  getPlayerGains
}