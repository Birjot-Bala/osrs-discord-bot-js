const axios = require('axios');
const { SlashCommand, CommandOptionType } = require('slash-create');
const { WIKI_URL, USER_AGENT } = require('../constants.js');

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
    const wikiClient = axios.create({
      baseURL: WIKI_URL,
      timeout: 2000,
      headers: {'User-Agent': USER_AGENT}
    });
    return wikiClient.get('/api.php', {
        params: {
          action: 'query',
          generator: 'prefixsearch',
          gpssearch: ctx.options.search,
          gpslimit: 3,
          prop: 'info',
          inprop: 'url',
          format: 'json',
        }
      })
      .then(resp => {
        console.log(resp.config.baseURL, resp.config.url, resp.config.headers, resp.config.params);
        const pages = resp.data.query.pages;
        return `Here's what I found on the wiki for '${ctx.options.search}':\n${Object.keys(pages).map((pg) => `[${pages[pg].title}](<${pages[pg].fullurl}>)`).join('\n')}`
      })
      .catch(err => {
        console.error(err);
        return "Oh no... looks like something went wrong with the /wiki command."
    });
  }
}