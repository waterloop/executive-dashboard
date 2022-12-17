require('dotenv').config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import path from 'path';

import api from './api';

import googleAuth from './google-auth';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 9001;
const host = process.env.HOST || '127.0.0.1';

app.disable('x-powered-by');  // they don't need to know the server tech stack.

/**
 * @brief express body handler Middleware:
 * This converts the body of POST and PUT requests to
 * json
 */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * @brief CORS:
 * CORS aka Cross Origin Resource Sharing
 * This enables us to tell browsers which
 * domains are allowed to request resources
 * from our server. These domains are indicated by the origin
 * array provided. This only applies to web browsers,
 * CORS will not block requests from places like CURL, postman, or other web servers.
 */

app.use(
  cors({
    origin: [
      /^http:\/\/localhost:[0-9]{4}$/, // CLIENT_URI should hold the executive-dashboard client uri
      'https://teamwaterloop.ca', // Always allow the main site -> replace with hosted url of dashboard frontend
    ],
    credentials: true,
  }),
);

app.use('/google', googleAuth);
app.use('/api', api);

// Dev environment doesn't use build folder:
let folder = process.env.NODE_ENV === 'production' ? 'build' : 'public';

/* These need to be the last routes */
app.use(express.static(`./${folder}`));
app.get('*', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, `../../${folder}`) });
});

if (process.env.NODE_ENV === 'production') {
  app.listen(port);
} else {
  app.listen(port, host);
  console.log(`HOST: ${host}`);
}

console.log(`ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${port}`);

export default server;
