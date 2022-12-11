import express from 'express';
import getConfiguration from './get-configuration';
import changeConfiguration from './update-configuration';
import validationCheck from '../../utils/validation-check';
import { body } from 'express-validator';
import { validateRequest } from '../../google-auth';

const router = express.Router();

router.get('/', getConfiguration);

// NOTE: label itself shouldn't be modified by user. If we need to add / remove label entries, we should do so by manually inserting new data
// through a seed file.

// Body should be a list of {label:..., value:...}
router.patch(
  '/',
  [
    body('', 'expected body to be array').isArray(),
    body('*.label', 'expected label to be string').isString().notEmpty(),
    body('*.value', 'expected value to be string').isString().notEmpty(),
  ],
  validationCheck,
  validateRequest,
  changeConfiguration,
);

export default router;
