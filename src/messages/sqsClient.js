const { SQSClient } = require("@aws-sdk/client-sqs");

const REGION = "us-east-1"

const sqsClient = new SQSClient({ region: REGION });

module.exports = {
    sqsClient
}