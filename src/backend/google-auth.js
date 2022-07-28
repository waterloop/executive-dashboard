require('dotenv').config();
import express from 'express';
import db from './db';
import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

export const validateRequest = (req, res, next) => {
  if (process.env.NODE_ENV === 'test') {
    next();
    return;
  }
  const { authorization } = req.headers;
  if (typeof authorization !== 'string') {
    console.log("Auth Error, (typeof authorization !== 'string')", req.headers);
    res.sendStatus(403);
    return;
  }
  const [type, token] = authorization.split(' ');
  if (type !== 'Bearer') {
    console.log("Auth Error, (not a bearer token)", authorization, type, token);
    res.sendStatus(403);
    return;
  }
  client
    .verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((ticket) => {
      const payload = ticket.getPayload();
      const {
        hd, // host domain
      } = payload;
      if (hd !== 'waterloop.ca') {
        res.sendStatus(403);
      }
      next();
    })
    .catch((err) => {
      res.sendStatus(403);
    });
};

router.post('/', (req, res) => {
  const { tokenId } = req.query;
  if (!tokenId) {
    res.send('Missing Token ID').status(400);
    return;
  }
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((ticket) => {
      const payload = ticket.getPayload();
      const {
        hd, // host domain
        sub: userId,
        email,
        family_name,
        given_name,
      } = payload;
      if (hd !== 'waterloop.ca') {
        throw {
          status: 403,
          msg: 'Attempted Sign in from not waterloop.ca account',
        };
      }
      return db.users.getById(userId).then((userQueryResp) => {
        if (userQueryResp === -1) {
          // No user found so make one
          return db.users
            .createUser(email, given_name, family_name, userId)
            .then(() => db.users.getById(userId));
        }

        // Check that the access token was sent along in the request
        const authHeader = req.get("Authorization");
        if (!authHeader) {
          res.status(401).set('WWW-Authenticate', 'Bearer').send('No auth header found.').end();
          return;
        }
        const [type, accessToken] = authHeader.split(' ');
        if (type !== "Bearer" || !accessToken) {
          res.status(401).set('WWW-Authenticate', 'Bearer').send('No bearer token found.').end();
          return;
        }
        console.log("successfully sent");
        return res.send({ userId, accessToken }).status(200);
        // Check whether the user has admin priveleges (admins can edit content using the CMS)
        // db.featurePermissions
        //   .getAllowedActions(userId, accessToken)
        //   .then((resp) => {
        //       console.log(resp);
        //       const {allowedActions, groupIds} = resp;
        //       if (allowedActions.includes('Edit Content')) {  // The user has permission to log in to the CMS
        //         res.send({ userId, groupIds, accessToken }).status(200);
        //       } else {
        //         res.statusMessage = "ERROR: User does not have permission to edit website content.";
        //         res.status(403).end();
        //       }            
        //   });
    })
    .catch((err) => {
      console.log(err);
      console.log(`${err.status}: ${err.msg}`);
      res.sendStatus(err.status || 400);
    });
  })
});

router.post('/groups', (req, res) => {
  const {userId, groupIds} = req.query;
  const groupIdsArray = groupIds.split(',');

  // Check that the access token was sent along in the request
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    res.status(401).set('WWW-Authenticate', 'Bearer').send('No auth header found.').end();
    return;
  }

  const [type, accessToken] = authHeader.split(' ');
  if (type !== "Bearer" || !accessToken) {
    res.status(401).set('WWW-Authenticate', 'Bearer').send('No bearer token found.').end();
    return;
  }

  db.featurePermissions.
    updateUserGroups(userId, groupIdsArray, accessToken)
    .then((resp) => {
      res.send(resp).status(200);
    }).catch(err => {
      console.log("Error: Failed to sync group membership info. with data from Google Groups.");
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

export default router;
