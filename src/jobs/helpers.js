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
    
    try {
      await updatePlayer(body.username);
    } catch (err) {
      console.error(err);
      if (err.code === 'ECCONNABORTED') {
        return await editOriginal(body.interactionToken, `Sorry! The request timed out.`);
      } else if (!err.response || (err.response && err.response.status != 429)) {
        return await editOriginal(body.interactionToken, `Hmm... I am unable to retrieve records for ${body.username}.`);
      } 
    }

    const message = await getPlayerGains(body.username, body.period)
      .then(skills => {
        return `${body.username} gains in the past ${body.period}:\n\`\`\`${Object.keys(skills).map((skill) => `${skills[skill].metric.padEnd(15,' ')}${skills[skill].experience.gained}`).join('\n')}\`\`\``
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