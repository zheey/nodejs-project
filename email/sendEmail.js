'use strict'
const rp = require('request-promise');

async function sendEmail (email, message) {
    const options = {
        method: 'POST',
        uri: 'https://aggregatoremail.herokuapp.com/api/notification/email',
        body: {
            to: [
                email
            ],
            content: message,
        },
        json: true
    };

    let response;

   response = await rp(options).then(function (parsedBody) {
                     return true
                    }).catch(function (err) {
                   return false
                })

    return response
}

module.exports = sendEmail;
