const { SlashCommand, CommandOptionType } = require('slash-create');
const { WIKI_URL } = require('../constants.js');

module.exports = class WikiCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'wiki',
      description: 'Pulls up OSRS wiki link.',
      options: [{
        type: CommandOptionType.STRING,
        name: 'search',
        description: 'What do you want to search the wiki for?'
      }],
      guildIDs: ['656445531396112394']
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    return ctx.options.search ? `Searching for ${ctx.options.search} in ${WIKI_URL}` : `Hello, ${ctx.user.username}!`;
  }
}