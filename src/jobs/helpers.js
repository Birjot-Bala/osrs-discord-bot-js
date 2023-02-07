const axios = require('axios');
const { getPlayerGains, updatePlayer } = require('../handlers/trackerHandler.js');
const { DISCORD_URL, USER_AGENT } = require('../constants.js');

const discordClient = axios.create({
    baseURL: DISCORD_URL,
    timeout: 3000, 
    headers: {'User-Agent': USER_AGENT}
});

async function editOriginal(interactionToken, content) {
    return discordClient.patch(`/webhooks/${process.env.DISCORD_APP_ID}/${interactionToken}/messages/@original`, {
        content: content
    });
}

async function updateTrackerMessage(body) {
    await updatePlayer(body.options.username);

    const message = await getPlayerGains(body.options.username, body.options.period)
      .then(skills => {
        return `${body.options.username} gains in the past ${body.options.period}:\n\`\`\`${Object.keys(skills).map((skill) => `${skills[skill].metric.padEnd(15,' ')}${skills[skill].experience.gained}`).join('\n')}\`\`\``
      })
      .catch(err => {
        console.error(err);
        return "Oh no... looks like something went wrong with the /tracker command."
    });
    
    await editOriginal(body.interactionToken, message)
}

module.exports = {
    updateTrackerMessage
}