'use strict'
const rp = require('request-promise');

async function sendMessage(phone, message) {
    const options = {
        method: 'POST',
        uri: 'https://aggregatoremail.herokuapp.com/api/notification/sms',
        body: {
            to: [
                phone
            ],
            content: message,
            sender_id : "AfriEdu",
            network: "OUTBOUND",
        },
        json: true
    };
    let response;
    response = await rp(options).then(function (parsedBody) {
        return true
    }).catch(function (err) {
        console.log(err)
        return false
    })

    return response

}

module.exports = sendMessage;
