const axios = require('axios');
const { QUICKCHART_URL, USER_AGENT } = require('../constants.js');

const chartClient = axios.create({
  baseURL: QUICKCHART_URL,
  timeout: 2000,
  headers: {'User-Agent': USER_AGENT}
});

async function getTimeseriesChart(highPrices, lowPrices) {
  return chartClient.post('/chart/create', {
    backgroundColor: "transparent",
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
  })
  .then(resp => {
    console.log(`${resp.status} ${resp.statusText} ${resp.config.baseURL}${resp.config.url}\n${JSON.stringify(resp.config.headers, null, 2)}`);
    return resp.data.url;
  })
}

module.exports = {
  getTimeseriesChart
}