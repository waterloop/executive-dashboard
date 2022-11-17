import { Router } from 'express';
import add from './add-resume';
import multer from 'multer';

// file-upload middleware
const upload = multer();

const router = Router();

router.post('/',upload.any(), add);

export default router;