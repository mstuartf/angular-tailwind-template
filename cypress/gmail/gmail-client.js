const fs = require('fs');
const path = require('path');
const { google } = require('googleapis');

const wait = s => new Promise(r => setTimeout(r, s * 1000));

const sa = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'service-account.json')).toString());
const scopes = ['https://www.googleapis.com/auth/gmail.readonly'];
const sub = 'mike@paynut.io';

const jwtClient = new google.auth.JWT(sa['client_email'], null, sa['private_key'], scopes, sub);
const gmClient = google.gmail({version: 'v1', auth: jwtClient});

const checkEmailReceived = (partialSubj, nbRetries, waitSeconds) => queryBySubj(partialSubj).catch(function() {
    if (nbRetries === 1) {
        console.log(`Max number of retries reached`);
        return null;
    }
    console.log(`Retrying in ${waitSeconds} seconds...`);
    return wait(waitSeconds).then(() => checkEmailReceived(partialSubj, nbRetries - 1, waitSeconds));
});

function queryBySubj (partialSubj) {
    return jwtClient.authorize().then(() => {
        return gmClient.users.messages.list({userId: sub, q: `subject:${partialSubj}`}).then((res) => {
            if (!res.data.messages) {
                console.log(`No emails found for query 'subject:${partialSubj}'`);
                throw Error()
            } else {
                return fetchById(res.data.messages[0].id);
            }
        });
    });
}

function fetchById (emailId) {
    return jwtClient.authorize().then(() => {
        return gmClient.users.messages.get({userId: sub, id: emailId, format: 'full'}).then((res) => {
            return parseEmail(res.data);
        });
    });
}

function parseEmail(email) {
    return {
        to: email.payload.headers.find(h => h.name === 'Delivered-To').value,
        from: email.payload.headers.find(h => h.name === 'From').value,
        subject: email.payload.headers.find(h => h.name === 'Subject').value,
        body: {
            html: Buffer.from(email.payload.body.data, 'base64').toString('utf8')
        }
    }
}

module.exports = {checkEmailReceived};
