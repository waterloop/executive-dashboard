import * as actionTypes from '../actionTypes';

const initialState = {
  allInterviews: [],
  interviewsById: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.INTERVIEWS_SET_INTERVIEWS:
      return {
        ...state,
        allInterviews: payload.interviews,
      };
    case actionTypes.INTERVIEWS_SET_INTERVIEW_BY_ID:
      return {
        ...state,
        interviewsById: {
          ...state.byId,
          [payload.id]: payload.interview,
        },
      };

    default:
      return { ...state };
  }
};
