const { SlashCommand, CommandOptionType } = require('slash-create');
const { getPlayerGains } = require('../handlers/trackerHandler.js');

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
    return getPlayerGains(ctx.options.username, ctx.options.period)
      .then(skills => {
        return `${ctx.options.username} gains in the past ${ctx.options.period}:\n\`\`\`${Object.keys(skills).map((skill) => `${skill.metric.padEnd(10,' ')}${skill.experience.gained}`).join('\n')}\`\`\``
      })
      .catch(err => {
        console.error(err);
        return "Oh no... looks like something went wrong with the /tracker command."
      });
  }
}