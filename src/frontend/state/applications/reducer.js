import * as actionTypes from '../actionTypes';

const initialState = {
  allApplications: [],
  appsByEmail: {},
  appStatuses: [],
};

export default (state = initialState, { type, payload }) => {
  let emailEntry;
  switch (type) {
    case actionTypes.APPLICATIONS_SET_APPLICATIONS:
      return {
        ...state,
        allApplications: payload.applications,
      };
    case actionTypes.APPLICATIONS_UPDATE_APPLICATION:
      return {
        ...state,
        allApplications: [
          ...state.allApplications.filter(
            (app) => app.id !== payload.application.id,
          ),
          payload.application,
        ],
      };
    case actionTypes.APPLICATIONS_SET_APPLICATIONS_BY_EMAIL:
      return {
        ...state,
        appsByEmail: {
          ...state.appsByEmail,
          [payload.email]: payload.applications,
        },
      };
    case actionTypes.APPLICATIONS_SET_APPLICATION_STATUSES:
      return {
        ...state,
        appStatuses: payload.appStatuses,
      };

    case actionTypes.APPLICATIONS_UPDATE_APP_STATUS:
      emailEntry = state.appsByEmail[payload.newApp.email_address];
      return {
        ...state,
        allApplications: [
          ...state.allApplications.filter(
            (app) => app.id !== payload.newApp.id,
          ),
          payload.newApp,
        ],
        appsByEmail: {
          ...state.appsByEmail,
          [payload.newApp.email_address]: [
            ...(emailEntry
              ? emailEntry.filter((app) => app.id !== payload.newApp.id)
              : []),
            payload.newApp,
          ],
        },
      };
    default:
      return { ...state };
  }
};
