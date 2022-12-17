import express from 'express';
import addApplication from './add-application';
import getApplications from './get-application';
import getApplicationByEmail from './get-application-by-email';
import getApplicationStatuses from '../application-status/get-application-statuses';
import updateApplicationStatus from './update-application-status';
// import addRow from './spreadsheet/add-row';
import validationCheck from 'backend/utils/validation-check';
import { body, param, query } from 'express-validator';
import { validateRequest } from 'backend/google-auth';

import { STATUSES } from 'backend/utils/constants';

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
  getApplications,
);

router.get(
  '/applicant/:email',
  [param('email').isEmail()],
  validationCheck,
  validateRequest,
  getApplicationByEmail,
);

router.get('/statuses', getApplicationStatuses);

// Route is used by main site, so we don't need a validateRequest middleware.
router.post(
  '/',
  [
    body('first_name').isString(),
    body('last_name').isString(),
    body('email_address').isEmail(),
    body('current_year')
      .isString()
      .matches(/^([1-4][AB])|(5A)$/),
    body('program').isString(),
    body('application_term')
      .isString()
      .matches(/^(FALL|WINTER|SPRING)-2\d{3}$/),
    body('in_school').isBoolean(),
    body('in_person_available').isBoolean(),
    body('posting_id').isInt(),
    body('reason_to_join').isString().isLength({ min: 0, max: 2500 }),
    body('resume_link').isString(), // TODO: url links must start with 'http://' or 'https://'. Use isUrl() call.
    body('additional_information').isString(),
  ],
  validationCheck,
  addApplication,
);

router.patch(
  '/applicant/status',
  [body('id').isInt(), body('status').isString().isIn(STATUSES)],
  validationCheck,
  validateRequest,
  updateApplicationStatus,
);

// router.post('/spreadsheet/addentry', validationCheck, validateRequest, addRow);

export default router;
