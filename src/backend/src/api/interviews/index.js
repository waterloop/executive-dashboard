import express from 'express';
import updateOrAddInterview from './update-or-add-interview';
import getInterviewsByTerm from './get-interview';
import getInterviewById from './get-interview-by-application-id';
import validationCheck from '../../utils/validation-check';
import { body, param, query } from 'express-validator';

const router = express.Router();

router.get(
  '/',
  [
    query('term')
      .isString()
      .matches(/^(FALL|WINTER|SPRING)-2\d{3}$/),
  ],
  validationCheck,
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
  updateOrAddInterview,
);

export default router;
