const { SlashCommand, CommandOptionType } = require('slash-create');
const { getTimeseries } = require('../handlers/priceHandler.js');
const { getTimeseriesChart } = require('../handlers/chartHandler.js');

module.exports = class HelloCommand extends SlashCommand {
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
    const { highPrices, lowPrices } = await getTimeseries(ctx.options.item, ctx.options.timestep);
    const chartMessage = await getTimeseriesChart(highPrices, lowPrices);
    console.log(chartMessage);
    await ctx.send(chartMessage);
  }
}