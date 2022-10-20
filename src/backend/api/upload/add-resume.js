// taken from
//https://www.labnol.org/google-drive-api-upload-220412
import { OAuth2Client, JWT } from 'google-auth-library';
import {google} from 'googleapis';
import stream from 'stream';

const uploadFile = async (fileObject) => {
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    // try with teamhub service acc
    // permission error -> share file with service acc?
    const jwtClient = new JWT({
        scopes:["https://www.googleapis.com/auth/drive.file"],
        email:'teamhubbackend@teamhub-257722.iam.gserviceaccount.com',
        key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
        subject:"steven.x@waterloop.ca",
    })
    const { data } = await google.drive({ version: 'v3', auth: jwtClient }).files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        // hardcoded TEST folder
        parents: ['1AAY9G_8OxKJ_vUTZoXbmcUxcl3Rqazsv'],
      },
      fields: 'id,name',
    });
    console.log(`Uploaded file ${data.name} ${data.id}`);
  };

const add = async (req, res) => {
    try {
        const { body, files } = req;

        for (let f = 0; f < files.length; f += 1) {
            await uploadFile(files[f]);
        }

        console.log(body);
        res.status(200).send('Form Submitted');
        } catch (f) {
        res.send(f.message);
    }
}

export default add;
