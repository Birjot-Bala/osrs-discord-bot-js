const path = require('path');
const { AWSLambdaServer, SlashCreator } = require('slash-create');

const creator = new SlashCreator({
    applicationID: process.env.DISCORD_APP_ID,
    publicKey: process.env.DISCORD_PUBLIC_KEY,
    token: process.env.DISCORD_BOT_TOKEN
});

creator
    .withServer(new AWSLambdaServer(module.exports, 'interactions'))
    .registerCommandsIn(path.join(__dirname, 'commands'))