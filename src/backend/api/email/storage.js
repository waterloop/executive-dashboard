require('dotenv').config();
import { Storage } from '@google-cloud/storage';
import path from 'path';
const {google} = require('googleapis');


const storage = new Storage({
  keyFilename: path.join(__dirname, process.env.KEY_FILE_NAME),
  projectId: process.env.PROJECT_ID,

});

export default storage;
