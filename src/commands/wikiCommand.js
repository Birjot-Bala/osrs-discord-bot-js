const { SlashCommand, CommandOptionType } = require('slash-create');
const { searchWiki } = require('../handlers/wikiHandler.js');

module.exports = class WikiCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'wiki',
      description: 'Pulls up OSRS wiki link.',
      options: [{
        type: CommandOptionType.STRING,
        required: true,
        name: 'search',
        description: 'What do you want to search the wiki for?'
      }]
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    return searchWiki(ctx.options.search)
      .then(pages => {
        return `Here's what I found on the wiki for '${ctx.options.search}':\n${Object.keys(pages).map((pg) => `[${pages[pg].title}](<${pages[pg].fullurl}>)`).join('\n')}`
      })
      .catch(err => {
        console.error(err);
        return "Oh no... looks like something went wrong with the /wiki command."
      });
  }
}