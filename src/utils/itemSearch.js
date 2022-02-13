const fs = require('fs');

const tradeableItems = JSON.parse(fs.readFileSync('./data/tradeable_items.json'));

const searchByName = (userItem, num = 3) => {
  const re =/[ \'\,\-\(\)]/g
  const cleanUp = (str) => str.toLowerCase().replace(re,  '');
  const cleanUserItem = cleanUp(userItem);

  const results = [];

  for (const [itemName, itemID] of Object.entries(tradeableItems)) {
    if (cleanUp(itemName).includes(cleanUserItem)) {
      if (results.push([itemName, itemID]) === num) {
        break;
      }
    }
  }

  return results;
}

const searchByID = (userItemID) => {

  for (const [itemName, itemID] of Object.entries(tradeableItems)) {
    if (userItemID == itemID) {
      return [itemName, itemID];
    }
  }
}

module.exports = {
  searchByName,
  searchByID
}