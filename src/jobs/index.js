const { updateTrackerMessage } = require("./helpers");

exports.handler = async function(event, context) {
    event.Records.forEach(record => {
        const { messageAttributes: { CommandType } , body } = record;
        console.log(CommandType.stringValue, body);

        switch (CommandType.stringValue) {
            case 'tracker':
                updateTrackerMessage(JSON.parse(body));
                break;
            default: 
        }
    });
    return {};
  }