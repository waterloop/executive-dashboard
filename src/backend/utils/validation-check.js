import { validationResult } from 'express-validator';

const validationCheck = (req, res, next) => {
  try {
    validationResult(req).throw();
    next();
  } catch (err) {
    console.error('Validation Error', err);
    res.sendStatus(400);
  }
};

export default validationCheck;
