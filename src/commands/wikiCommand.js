const { SlashCommand, CommandOptionType } = require('slash-create');
import { WIKI_URL } from '../constants'

module.exports = class WikiCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'wiki',
      description: 'Pulls up OSRS wiki link.',
      options: [{
        type: CommandOptionType.STRING,
        name: 'search',
        description: 'What do you want to search the wiki for?'
      }]
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    return ctx.options.search ? `Searching for ${ctx.options.search}` : `Hello, ${ctx.user.username}!`;
  }
}