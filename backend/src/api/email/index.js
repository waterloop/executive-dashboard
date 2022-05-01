import express from 'express';

import updateEmailSent from './update-email-sent';
import validationCheck from '../../utils/validation-check';
import { body } from 'express-validator';

const router = express.Router();

// NOTE: status checks will be done on DB end.
router.patch('/', [body('id').isInt()], validationCheck, updateEmailSent);

export default router;
