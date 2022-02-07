const axios = require('axios');
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
    const wikiClient = axios.create({
      baseURL: WIKI_URL,
      timeout: 2000
    });
    return wikiClient.get('/api.php', {
        params: {
        action: 'opensearch',
        search: ctx.options.search,
        format: 'json',
        limit: 3
      }})
      .then(resp => {
        console.log(resp.config.baseURL, resp.config.url, resp.config.params);
        return `Here's what I found on the wiki for '${ctx.options.search}':${resp.data[1].map((e, i) => `<[${e}]>(${resp.data[3][i]})`).join('\n')})`
      })
      .catch(err => {
        console.error(err);
        return "Oh no... looks like somethings not working with the /wiki command."
    });
  }
}