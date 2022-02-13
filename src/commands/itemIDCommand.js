const { SlashCommand, CommandOptionType } = require('slash-create');
const { searchForID } = require('../utils/itemSearch');

module.exports = class HelloCommand extends SlashCommand {
  constructor(creator) {
    super(creator, {
      name: 'itemid',
      description: 'Return the item ID for the item',
      options: [{
        type: CommandOptionType.STRING,
        required: true,
        name: 'item',
        description: 'What item to search the ID for?'
      }],
      guildIDs: ['656445531396112394']
    });

    this.filePath = __filename;
  }

  async run(ctx) {
    const matches = searchForID(ctx.options.item);
    if (matches.length) {
      return `Here are the item IDs I found for '${ctx.options.item}':\n\`\`\`${matches.map(([itemName, itemID]) => `${itemName.padEnd(40," ")}${itemID}`).join('\n')}\`\`\``;
    } else {
      return `Hmm... I couldn't find any item IDs for '${ctx.options.item}'`
    }
  }
}