const { SlashCommand, CommandOptionType } = require('slash-create');
const { getTimeseries } = require('../handlers/priceHandler.js');
const { getTimeseriesChart } = require('../handlers/chartHandler.js');
const { searchByID } = require('../utils/itemSearch');

module.exports = class TrendCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'trend',
      description: 'Shows the item price timeseries for the last 300 timesteps',
      options: [{
        type: CommandOptionType.STRING,
        required: true,
        name: 'item',
        description: 'What is the item ID?'
      }, {
        type: CommandOptionType.STRING,
        required: true,
        name: 'timestep',
        description: 'What is the timestep?',
        choices: [{
          name: '1 hour',
          value: '1h'
        }, {
          name: '6 hour',
          value: '6h'
        }]
      }]
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    const item = searchByID(ctx.options.item);
    const { highPrices, lowPrices } = await getTimeseries(ctx.options.item, ctx.options.timestep);
    const chart = await getTimeseriesChart(highPrices, lowPrices);

    await ctx.send({
      content: `${item.name} (ID: ${item.id})`,
      file: {
        name: "chart.png",
        file: chart
      }
    });
  }
}