import * as actionTypes from '../actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const setApplications = (applications) => ({
  type: actionTypes.APPLICATIONS_SET_APPLICATIONS,
  payload: {
    applications,
  },
});
