const { SlashCommand, CommandOptionType } = require('slash-create');

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
    return ctx.options.search ? `Searching for ${ctx.options.search}` : `Hello, ${ctx.user.username}!`;
  }
}