require('dotenv').config();
import express from 'express';
import db from './db';
import { OAuth2Client, JWT } from 'google-auth-library';
import { google } from 'googleapis';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

const groupName = process.env.NODE_ENV === 'production' ? 'Leads' : 'Web';

router.post('/', async (req, res) => {
  const { tokenId } = req.query;
  if (!tokenId) {
    res.send('Missing Token ID').status(400);
    return;
  }
  try {
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const {
      hd, // host domain
      sub: userId,
      email,
      family_name,
      given_name,
    } = payload;

    // check if user is a member of waterloop
    if (hd !== 'waterloop.ca') {
      throw {
        status: 403,
        msg: 'Attempted Sign in from not waterloop.ca account',
      };
    }

    // check if user is a lead
    const lead = await isLead(email);
    if (!lead) {
      throw {
        status: 403,
        msg: `User email ${email} is not a member of the Leads group`,
      };
    }

    // get user info
    const userQueryResp = await db.users.getById(userId);

    if (userQueryResp === -1) {
      // No user found so make one
      await db.users.createUser(email, given_name, family_name, userId);
    }

    // Check that the access token was sent along in the request
    const authHeader = req.get('Authorization');
    if (!authHeader) {
      res
        .status(401)
        .set('WWW-Authenticate', 'Bearer')
        .send('No auth header found.')
        .end();
      return;
    }
    const [type, accessToken] = authHeader.split(' ');
    if (type !== 'Bearer' || !accessToken) {
      res
        .status(401)
        .set('WWW-Authenticate', 'Bearer')
        .send('No bearer token found.')
        .end();
      return;
    }
    // Check whether the user has admin priveleges (admins can edit content using the executive dashboard)
    const resp = await db.featurePermissions.getAllowedActions(
      userId,
      accessToken,
    );
    const { allowedActions, groupIds } = resp;
    if (allowedActions.includes('Edit Content')) {
      // The user has permission to log in to the executive dashboard
      res.send({ userId, groupIds, accessToken }).status(200);
    } else {
      res.statusMessage =
        'ERROR: User does not have permission to edit website content.';
      res.status(403).end();
    }
  } catch (err) {
    console.error(`${err.status}: ${err.msg}`);
    res.sendStatus(err.status || 400);
  }
});

router.post('/groups', (req, res) => {
  const { userId, groupIds } = req.query;
  const groupIdsArray = groupIds.split(',');

  // Check that the access token was sent along in the request
  const authHeader = req.get('Authorization');
  if (!authHeader) {
    res
      .status(401)
      .set('WWW-Authenticate', 'Bearer')
      .send('No auth header found.')
      .end();
    return;
  }

  const [type, accessToken] = authHeader.split(' ');
  if (type !== 'Bearer' || !accessToken) {
    res
      .status(401)
      .set('WWW-Authenticate', 'Bearer')
      .send('No bearer token found.')
      .end();
    return;
  }

  db.featurePermissions
    .updateUserGroups(userId, groupIdsArray, accessToken)
    .then((resp) => {
      res.send(resp).status(200);
    })
    .catch((err) => {
      console.error(
        'Error: Failed to sync group membership info. with data from Google Groups.',
      );
      res.sendStatus(err.status || 400);
    });
});

router.get('/picture/:userId', (req, res) => {
  const { userId } = req.params;
  db.users.getProfilePicture(userId).then((picture) =>
    res.send({
      picture,
    }),
  );
});

// isLead takes a user's email and returns true/false whether they are a 'Lead'
async function isLead(userEmail) {
  // code borrowed from teamhub `google-auth.js`
  // we will need to replace the teamhubbackend service account with
  //  an executive-dashboard service account once we find someone who
  //  can enable domain-wide delegation for it

  // ideally, service account is changed to executive-dashboard and subject is changed
  //  to jeff.m@waterloop.ca
  const jwtClient = new JWT({
    scopes: ['https://www.googleapis.com/auth/admin.directory.group'],
    email: 'teamhubbackend@teamhub-257722.iam.gserviceaccount.com',
    key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    subject: 'steven.x@waterloop.ca',
  });

  const adminClient = google.admin({
    version: 'directory_v1',
    auth: jwtClient,
  });
  const groups = await adminClient.groups.list({ userKey: userEmail });

  return groups.data.groups.some((g) => g.name === groupName);
}

export default router;
