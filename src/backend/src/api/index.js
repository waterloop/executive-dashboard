import express from 'express';
import applications from './applications';
import interviews from './interviews';
import configuration from './configuration';
import email from './email';

const router = express.Router();
router.use('/applications', applications);
router.use('/interviews', interviews);
router.use('/configuration', configuration);
router.use('/email', email);

export default router;
