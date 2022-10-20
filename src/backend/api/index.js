import express from 'express';
import applications from './applications';
import interviews from './interviews';
import configuration from './configuration';
import email from './email';
import upload from './upload';

const router = express.Router();
router.use('/applications', applications);
router.use('/interviews', interviews);
router.use('/configuration', configuration);
router.use('/email', email);
router.use('/upload/resume', upload);

export default router;

