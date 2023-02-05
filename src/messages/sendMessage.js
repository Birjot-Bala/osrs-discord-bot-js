const { SendMessageCommand } = require("@aws-sdk/client-sqs")
const { sqsClient } = require("./sqsClient.js")

async function sendToQueue(params) {
    try {
        const data = await sqsClient.send(new SendMessageCommand(params));
        console.log("Success, message sent. MessageID:", data.MessageId);
        return data
    } catch (err) {
        console.log("Error", err);
    }
}

module.exports = {
    sendToQueue
}