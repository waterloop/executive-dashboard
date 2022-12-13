const { google } = require('googleapis');
const MailComposer = require('nodemailer/lib/mail-composer');

const encodeMessage = (message) =>
  Buffer.from(message)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

const createMail = async (options) => {
  const mailComposer = new MailComposer(options);
  const message = await mailComposer.compile().build();
  return encodeMessage(message);
};

export const sendEmail = async (message, token) => {
  try {
    const oAuth2Client = new google.auth.OAuth2(process.env.GOOGLE_CLIENT_ID);
    oAuth2Client.setCredentials({
      access_token: token,
      scope: 'https://www.googleapis.com/auth/gmail.send',
    });
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });
    const options = {
      to: message.to,
      subject: message.subject,
      html: message.body,
      textEncoding: 'base64',
      headers: [
        { key: 'X-Application-Developer', value: 'Gordon Wang' },
        { key: 'X-Application-Version', value: 'v1.0.0.2' },
      ],
    };

    const rawMessage = await createMail(options);
    const { data: { id } = {} } = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: rawMessage,
      },
    });
    return id;
  } catch (err) {
    console.error('sendMail error', err);
    return -1;
  }
};
