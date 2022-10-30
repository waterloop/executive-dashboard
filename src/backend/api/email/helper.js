import util from 'util';
import gc from './storage';

const bucketName = 'waterloop_cms_image_upload';
const bucket = gc.bucket(bucketName);

const {google} = require('googleapis');

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
export const sendEmail = async (auth, message) => {
  
  const gmail = google.gmail({version: 'v1', auth})
  
  // TODO: Figure out how to import Message object, then configure it and set gmail.user.messages = new Message()
  const res = await gmail.user.messages.send();


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
};
