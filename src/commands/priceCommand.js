const { SlashCommand, CommandOptionType } = require('slash-create');
const { searchByID } = require('../utils/itemSearch');
const { getPrice } = require('../handlers/priceHandler.js');

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

    if (!Object.keys(itemMatch).length) {
      return `Hmm... I couldn't find any tradeable items with an ID of ${ctx.options.item}`
    }

    return getPrice(ctx.options.item)
      .then(prices => {
        return `Here are the latest prices for '${itemMatch[0]}':\n\`\`\`\n${'High'.padEnd(10,' ')}${prices['high']}gp\n${'Low'.padEnd(10, ' ')}${prices['low']}gp\`\`\``
      })
      .catch(err => {
        console.error(err);
        return 'Oh no... looks like something went wrong with the /price command.'
      });
  }
}