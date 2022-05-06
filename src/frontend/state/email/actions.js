import * as actionTypes from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const setEmailData = (emailData) => ({
  type: actionTypes.EMAIL_SET_DATA,
  payload: {
    emailData,
  },
});
