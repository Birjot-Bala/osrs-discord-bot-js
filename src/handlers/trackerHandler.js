const axios = require('axios');
const { TRACKER_URL, USER_AGENT, SQS_QUEUE_URL } = require('../constants.js');
const { sendToQueue } = require('../messages/sendMessage');

const trackerClient = axios.create({
    baseURL: TRACKER_URL,
    timeout: 2000,
    headers: {'User-Agent': USER_AGENT}
  });

async function updatePlayer(username) {
  return trackerClient.post(`/players/${username}`)
}

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

function sendTrackerMessageToQueue(ctx) {
  console.log('Sending tracker message to queue for processing.')
  const params = {
    MessageBody: JSON.stringify(ctx),
    QueueUrl: SQS_QUEUE_URL
  }

  return sendToQueue(params)
}

module.exports = {
  getPlayerGains,
  updatePlayer,
  sendTrackerMessageToQueue
}