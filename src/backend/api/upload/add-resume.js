// taken from
//https://www.labnol.org/google-drive-api-upload-220412
import { JWT } from 'google-auth-library';
import {google} from 'googleapis';
import stream from 'stream';

// get auth using the correct service account
const getAuth = async () => {
  return new JWT({
        scopes:[
          "https://www.googleapis.com/auth/drive",
        ],
        /*
            TODO: replace teamhub service account with executive-dashboard specific
        */
        email:'teamhubbackend@teamhub-257722.iam.gserviceaccount.com',
        key: process.env.SERVICE_ACCOUNT_PRIVATE_KEY,
    })
}

// create the folder if it does not exist
const putFolder = async (folderName, parentFolder, jwtClient) => {
  const res = await google.drive({ version: 'v3', auth: jwtClient }).files.list({
    q: `mimeType=\'application/vnd.google-apps.folder\' and \'${parentFolder}\' in parents and trashed=false`,
    fields: 'nextPageToken, files(id,name)',
    driveId:'0AAdrhjLJ8IiKUk9PVA',
    corpora:'drive',
    supportsAllDrives: true,
    includeItemsFromAllDrives: true,
  });
  
  let ret = res.data.files.find(f => f.name == folderName)

  if(ret == undefined) {
    // create new folder
    const fileMetadata = {
      name: folderName,
      mimeType: "application/vnd.google-apps.folder",
      parents: [parentFolder],
    };
    const { data } = await google.drive({ version: 'v3', auth: jwtClient }).files.create({
      resource: fileMetadata,
      fields:'id',
      supportsAllDrives: true,
    });
    ret = data.id
  } else {
    // extract id field
    ret = ret.id
  }
  return ret 
}

const uploadFile = async (fileObject, parentFolder, firstname, lastname, jwtClient) => {
    // check for correct mime type (pdf)
    // Serialize the file
    const bufferStream = new stream.PassThrough();
    bufferStream.end(fileObject.buffer);
    const { data } = await google.drive({ version: 'v3', auth: jwtClient }).files.create({
      media: {
        mimeType: fileObject.mimetype,
        body: bufferStream,
      },
      requestBody: {
        //name: fileObject.originalname,
        name: `${firstname}_${lastname}.pdf`,
        parents: [parentFolder],
      },
      fields: 'id,name',
      supportsAllDrives: true,
    });

    return data.id
  };

const add = async (req, res) => {
    try {
        const { body, files } = req;
        // do checks on body, files
        const expected = ['firstname', 'lastname', 'term_year', 'subteam', 'position']
        if(!expected.every(item => Object.prototype.hasOwnProperty.call(body, item)))
          throw `Expect ${expected} in body`
        if(!files.length == 1)
          throw `Expect 1 file, recieved ${files.length}`
        
        // get auth client
        const client = await getAuth()
        // Determine which base folder to use
        let parentFolder = '1BvULMQjVfhPw8cTCp3P80C7d6OKadpC_' // External/WEB DEV/TEST
        if(process.env.NODE_ENV === 'production'){
          parentFolder = '178nqXz6BCawIY09_o9JR0gI22EDJRujF' // External/Recruitment
        }

        // put year folder
        parentFolder = await putFolder(body.term_year, parentFolder, client)
        // put resume folder
        parentFolder = await putFolder("Resumes", parentFolder, client)
        // put subteam folder
        parentFolder = await putFolder(body.subteam, parentFolder, client)
        // put position folder
        parentFolder = await putFolder(body.position, parentFolder, client)
        // upload file
        let fileId = await uploadFile(files[0], parentFolder, body.firstname, body.lastname, client);
        res.status(200).send(`https://drive.google.com/file/d/${fileId}/view?usp=sharing`);
     } catch (f) {
        res.status(400).send(f);
    }
}

export default add;
