const { getTimeseriesChart } = require("../src/handlers/chartHandler");
const { getTimeseries } = require("../src/handlers/priceHandler");


getTimeseries(565,"1h").then(resp => {return getTimeseriesChart(resp)}).then(chart => console.log(chart));
