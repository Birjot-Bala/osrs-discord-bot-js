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
    wikiClient.get('/api.php', {
        params: {
        action: 'opensearch',
        search: ctx.options.search,
        format: 'json'
      }})
      .then(resp => {
        console.log(resp.config.baseURL, resp.config.url, resp.config.params);
        return `Here's what I found on the wiki for '${ctx.options.search}':\n${resp.data[3].map(e => `${e}`).join(`\n`)}`
      })
      .catch(err => {
        console.error(err);
        return "Oh no... looks like somethings not working with the /wiki command."
    });
  }
}