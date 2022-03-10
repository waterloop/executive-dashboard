import * as actionTypes from '../actionTypes';

const initialState = {
  allApplications: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.APPLICATIONS_SET_APPLICATIONS:
      return {
        ...state,
        allApplications: payload.applications,
      };

    default:
      return { ...state };
  }
};
