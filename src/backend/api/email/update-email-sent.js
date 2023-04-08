import db from '~/backend/db';
import { sendEmail } from './helper';

export default async (req, res) => {
  const appID = req.body.id;

  const cookieHeader = req.headers?.cookie;
  if (cookieHeader) {
    const list = {};
    cookieHeader.split(';').forEach(cookie => {
      let [name, ...rest] = cookie.split('=');
      name = name?.trim();
      if (!name) return;
      const value = rest.join('=').trim();
      if (!value) return;
      list[name] = decodeURIComponent(value);
    });
    console.log('cookieHeader::', list)

    // send the actual email, then check if email sent correctly
    if (list.accessToken) {
      await sendEmail(req.body, list.accessToken); // TODO: check if accessToken sent securely.
    }
  }

  try {
    // if email sent correctly, proceed with code below, else abort procedure.
    const response = await db.applications.updateEmailStatus(appID);
    if (Array.isArray(response) && response.length !== 0) {
      res.send({ ...response[0] });
    } else {
      // invalid ID or cannot send email for application with the status:
      res.sendStatus(403);
    }
  } catch (err) {
    const errMsg = `Could not modify email-sent status: ${err}`;
    console.error(errMsg);
    res.status(500).send(errMsg);
  }
};
