const axios = require('axios');
const { QUICKCHART_URL, USER_AGENT } = require('../constants.js');
const { Buffer } = require('node:buffer')

const chartClient = axios.create({
  baseURL: QUICKCHART_URL,
  timeout: 2000,
  headers: {'User-Agent': USER_AGENT}
});

async function getTimeseriesChart(highPrices, lowPrices) {
  return chartClient.post('/chart', {
    backgroundColor: "rgba(255, 255, 255, 1)",
    width: 500,
    height: 300,
    format: "png",
    chart: {
      type: 'scatter',
      data: {
        datasets: [{
          label: 'High Prices',
          data: highPrices,
          showLine: true,
          fill: false,
          pointRadius: 0
        }, {
          label: 'Low Prices',
          data: lowPrices,
          showLine: true,
          fill: false,
          pointRadius: 0
        }]
      },
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            position: 'bottom',
            scaleLabel: {
              display: true,
              labelString: 'Timestamp'
            }
          }],
          yAxes: [{
            display: true,
            beginAtZero: true,
            scaleLabel: {
              display: true,
              labelString: 'GP'
            }
          }]
        }
      }
    }
  }, {responseType: 'arraybuffer'})
  .then(resp => {
    console.log(`${resp.status} ${resp.statusText} ${resp.config.baseURL}${resp.config.url}\n${JSON.stringify(resp.config.headers, null, 2)}`);
    return Buffer.from(resp.data);
  })
}

module.exports = {
  getTimeseriesChart
}