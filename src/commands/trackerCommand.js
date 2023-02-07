const { SlashCommand, CommandOptionType } = require('slash-create');
const { sendTrackerMessageToQueue } = require('../handlers/trackerHandler.js');

module.exports = class TrackerCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'tracker',
      description: 'XP tracker results from Wise Old Man',
      options: [{
        type: CommandOptionType.STRING,
        required: true,
        name: 'username',
        description: 'Whose progress do you want to look up?'
      }, {
        type: CommandOptionType.STRING,
        required: true,
        name: 'period',
        description: 'What period do you want to see?',
        choices: [{
          name: 'day',
          value: 'day'
        }, {
          name: 'week',
          value: 'week'
        }, {
          name: 'month',
          value: 'month'
        }, {
          name: 'year',
          value: 'year'
        }]
      }]
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    await ctx.defer();
    await sendTrackerMessageToQueue(ctx);
  }
}