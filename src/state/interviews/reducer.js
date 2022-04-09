import * as actionTypes from '../actionTypes';

const initialState = {
  allInterviews: [],
  interviewsById: {}, // Interviews by APP_ID
};

export default (state = initialState, { type, payload }) => {
  let interviewEntry;
  switch (type) {
    case actionTypes.INTERVIEWS_SET_INTERVIEWS:
      return {
        ...state,
        allInterviews: payload.interviews,
      };
    case actionTypes.INTERVIEWS_SET_INTERVIEW_BY_ID: // Should correspond to app id, not interview id.
      return {
        ...state,
        interviewsById: {
          ...state.interviewsById,
          [payload.interview.application_id]: payload.interview,
        },
      };
    case actionTypes.INTERVIEWS_UPDATE_INTERVIEW_NOTE:
      interviewEntry =
        state.interviewsById[payload.newInterview.application_id];
      return {
        ...state,
        allInterviews: [
          ...state.allInterviews.filter(
            (interview) => interview.id !== payload.newInterview.id,
          ),
          payload.newInterview,
        ],
        interviewsById: {
          ...state.interviewsById,
          [payload.newInterview.application_id]: [
            ...(interviewEntry
              ? interviewEntry.filter(
                  (interview) => interview.id !== payload.newInterview.id,
                )
              : []),
            payload.newInterview,
          ],
        },
      };
    default:
      return { ...state };
  }
};
