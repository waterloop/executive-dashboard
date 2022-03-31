import * as actionTypes from '../actionTypes';

const initialState = {
  allApplications: [],
  appStatuses: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.APPLICATIONS_SET_APPLICATIONS:
      return {
        ...state,
        allApplications: payload.applications,
      };
    case actionTypes.APPLICATIONS_SET_APPLICATION_STATUSES:
      return {
        ...state,
        appStatuses: payload.appStatuses,
      };

    case actionTypes.APPLICATIONS_UPDATE_APP_STATUS:
      return {
        appStatuses: state.appStatuses,
        allApplications: [
          ...state.allApplications.filter(
            (app) => app.id !== payload.newApp.id,
          ),
          payload.newApp,
        ],
      };
    default:
      return { ...state };
  }
};
