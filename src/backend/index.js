import express from 'express';
import http from 'http';
import cors from 'cors';

import api from './api';

import googleAuth from './google-auth';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 9001;
const host = process.env.HOST || '127.0.0.1';

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
      'http://localhost:3000', // CLIENT_URI should hold the cms client uri
      'https://teamwaterloop.ca', // Always allow the main site -> replace with hosted url of dashboard frontend
    ],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('This works?');
});

app.use('/google', googleAuth);
app.use('/api', api);

// app.get('*', (req, res) => {
//   res.sendFile('index.html', { root: path.join(__dirname, '../frontend/build') });
// })

if (process.env.NODE_ENV === 'production') {
  app.listen(port);
} else {
  app.listen(port, host);
  console.log(`HOST: ${host}`);
}

console.log(`ENV: ${process.env.NODE_ENV}`);
console.log(`PORT: ${port}`);

export default server;
