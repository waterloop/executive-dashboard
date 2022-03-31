import * as actionTypes from '../actionTypes';

export const setApplications = (applications) => ({
  type: actionTypes.APPLICATIONS_SET_APPLICATIONS,
  payload: {
    applications,
  },
});
export const setApplicationStatuses = (appStatuses) => ({
  type: actionTypes.APPLICATIONS_SET_APPLICATION_STATUSES,
  payload: {
    appStatuses,
  },
});

export const updateAppStatus = (newApp) => ({
  type: actionTypes.APPLICATIONS_UPDATE_APP_STATUS,
  payload: {
    newApp,
  },
});
