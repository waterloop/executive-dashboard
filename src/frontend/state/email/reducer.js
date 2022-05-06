import * as actionTypes from '../actionTypes';

const initialState = {
  emailData: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.EMAIL_SET_DATA:
      return {
        ...state,
        emailData: payload.emailData,
      };
    default:
      return { ...state };
  }
};
