// Script for use in Github Actions to register and sync commands

const { SlashCreator } = require('slash-create');
const path = require('path');
const creator = new SlashCreator({
  applicationID: process.env.DISCORD_APP_ID,
  publicKey: process.env.DISCORD_PUBLIC_KEY,
  token: process.env.DISCORD_BOT_TOKEN
});

creator
  .registerCommandsIn(path.join(__dirname, '../src/commands'))
  .syncCommands();