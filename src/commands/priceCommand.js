const axios = require('axios');
const { SlashCommand, CommandOptionType } = require('slash-create');
const { searchByID } = require('../utils/itemSearch');
const { PRICES_URL, USER_AGENT } = require('../constants');

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'price',
      description: 'Retrieves the latest price for an item.',
      options: [{
        type: CommandOptionType.STRING,
        required: true,
        name: 'item',
        description: 'What is the item ID?'
      }]
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    const itemMatch = searchByID(ctx.options.item);

    if (!itemMatch.length) {
      return `Hmm... I couldn't find any tradeable items with an ID of ${ctx.options.item}`
    }
    
    const pricesClient = axios.create({
      baseURL: PRICES_URL,
      timeout: 2000,
      headers: {'User-Agent': USER_AGENT}
    });

    return pricesClient.get('/api/v1/osrs/latest', {
      params: {
        id: ctx.options.item
      }
    })
    .then(resp => {
      console.log(`${resp.status} ${resp.statusText} ${resp.config.baseURL}${resp.config.url}\n${JSON.stringify(resp.config.headers, null, 2)}\n${JSON.stringify(resp.config.params, null, 2)}`);
      return `Here are the latest prices for '${itemMatch[0]}':\n\`\`\`\n${'High'.padEnd(10,' ')}${resp.data.data[ctx.options.item]['high']}\n${'Low'.padEnd(10, ' ')}${resp.data.data[ctx.options.item]['low']}\`\`\``}
      )
    .catch(err => {
      console.error(err);
      return 'Oh no... looks like something went wrong with the /price command.'
    });
  }
}