import express from 'express';

import updateEmailStatus from './update-email-sent';
import validationCheck from '../../utils/validation-check';
import { validateRequest } from '../../google-auth';
import { body } from 'express-validator';

const router = express.Router();

// NOTE: status checks will be done on DB end.
router.patch(
  '/',
  [body('id').isInt()],
  validationCheck,
  validateRequest,
  updateEmailStatus,
);

export default router;
