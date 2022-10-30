import express from 'express';
import fs from 'fs';
import { validateRequest } from '../../google-auth';
import { uploadImage as productionUploadImage } from './google_storage/helper';

const router = express.Router();

const uploadImage = process.env.NODE_ENV === "production"
  ? productionUploadImage
  : (file) => new Promise((resolve, reject) => {
    fs.writeFile(`${fileStorageDirectory}/${file.originalname.replaceAll(' ', '-')}`, file.buffer, function cb(err) {
      if (err) {
        reject(err);
      } else {
        resolve(`/waterloop/tmp/${file.originalname.replaceAll(' ', '-')}`);
      }
    });
  });

router.post('/', validateRequest, (req, res) => {
  const { files } = req;
  const ticket = res.locals.ticket;

  try {
    console.log(files)
    const imageUrlPromises = files.map((file) => uploadImage(file));

    Promise.all(imageUrlPromises).then((images) => {
      res.status(200).json({
        message: 'Upload was Successful',
        data: images,
      });
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: err,
      message: 'Problem uploading images',
    });
  }
});

export default router;
