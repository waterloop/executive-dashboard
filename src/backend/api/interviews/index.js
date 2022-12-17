import express from 'express';
import updateOrAddInterview from './update-or-add-interview';
import getInterviewsByTerm from './get-interview';
import getInterviewById from './get-interview-by-application-id';
import validationCheck from 'backend/utils/validation-check';
import { body, param, query } from 'express-validator';
import { validateRequest } from 'backend/google-auth';

const router = express.Router();

router.get(
  '/',
  [
    query('term')
      .isString()
      .matches(/^(FALL|WINTER|SPRING)-2\d{3}$/),
  ],
  validationCheck,
  validateRequest,
  getInterviewsByTerm,
);

router.get('/:id', [param('id').isInt()], validationCheck, getInterviewById);

router.post(
  '/',
  [
    body('note').isString().isLength({ min: 0, max: 2500 }),
    body('application_id').isInt(),
  ],
  validationCheck,
  validateRequest,
  updateOrAddInterview,
);

export default router;
