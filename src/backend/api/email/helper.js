// import util from 'util';
// import gc from './storage';
import { OAuth2Client } from 'google-auth-library';

const bucketName = 'waterloop_cms_image_upload';
// const bucket = gc.bucket(bucketName);

const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');
// const credentials = require('./credentials.json');

// const tokens = {
//     "access_token": "ya29.A0ARrdaM_AaAL3mdEpVZshT-cFfpLkxeMOJz_d1Ok",
//     "refresh_token": "1//0gdubhqQhx89VVNBR45_4eipxlYc4Nf5A9J67B8M",
//     "scope": "https://www.googleapis.com/auth/gmail.send",
//     "token_type": "Bearer",
//     "expiry_date": 1649574729833
// };

/*
  Parameters:
  1. bucketName - name of the google cloud bucket one wishes to upload a file too
  2. fileName - name of the file one wishes to upload and append to the image url
*/
const getPublicUrl = (userId) =>
    `https://gmail.googleapis.com/gmail/v1/users/${userId}/messages/send`;

/*
  Parameters:
  1. originalname - name given to the image being uploaded
  2. buffer - an object that represents an image's unique fixed-length sequence of bytes
  3. mimetype - an attribute used to classify the type of an image based upon its unique nature and format
*/

// const getGmailService = () => {
//     const { client_secret, client_id, redirect_uris } = credentials.installed;
//     const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
//     oAuth2Client.setCredentials(tokens);
//     const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
//     return gmail;
// };

const encodeMessage = (message) => Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

const createMail = async (options) => {
    const mailComposer = new MailComposer(options);
    const message = await mailComposer.compile().build();
    return encodeMessage(message);
};

// const sendMail = async (options) => {
//     const gmail = getGmailService();
//     const rawMessage = await createMail(options);
//     const { data: { id } = {} } = await gmail.users.messages.send({
//         userId: 'me',
//         resource: {
//             raw: rawMessage,
//         },
//     });
//     return id;
// };

export const sendEmail = async (message, token) => {
    try {
        console.log('env: ', process.env.GOOGLE_CLIENT_ID);
        // const auth = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        console.log('token: ', token);
        const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_CLIENT_SECRET);
        oAuth2Client.setCredentials({
            access_token: token,
            scope: 'https://www.googleapis.com/auth/gmail.send',
            token_type: 'Bearer',
        });
        const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });


        // const gmail = google.gmail({ version: 'v1', auth })

        const options = {
            // to: message.email_address, <- uncomment this after testing
            to: 'gordon.w@waterloop.ca',
            // cc: 'cc1@example.com, cc2@example.com',
            replyTo: 'amit@labnol.org',
            subject: 'Hello',
            text: 'This email is sent from the command line',
            // html: `<p>🙋🏻‍♀️  &mdash; This is a <b>test email</b> from <a href="https://digitalinspiration.com">Digital Inspiration</a>.</p>`,
            // attachments: fileAttachments,
            textEncoding: 'base64',
            headers: [
                { key: 'X-Application-Developer', value: 'Gordon Wang' },
                { key: 'X-Application-Version', value: 'v1.0.0.2' },
            ],
        };

        const rawMessage = await createMail(options);
        console.log('before send');
        const { data: { id } = {} } = await gmail.users.messages.send({
            userId: 'me',
            resource: {
                raw: rawMessage,
            },
        });
        return id;

        // const messageId = await sendMail(options);
        // return messageId;

        // TODO: Figure out how to import Message object, then configure it and set gmail.user.messages = new Message()
        // const res = await gmail.user.messages.send();


        // return new Promise((resolve, reject) => {
        //   const filename = `${Date.now()}-${originalname}`;
        //   const file = bucket.file(filename);

        //   const stream = file.createWriteStream({
        //     metadata: {
        //       contentType: mimetype,
        //     },
        //   });

        //   stream.on('error', (err) => {
        //     reject(err);
        //   });

        //   stream.on('finish', () => {
        //     file.makePublic().then(() => {
        //       resolve(getPublicUrl(bucketName, filename));
        //     });
        //   });

        //   stream.end(buffer);
        // });
    } catch (err) {
        console.log('sendMail error', err);
        return null;
    }
};
