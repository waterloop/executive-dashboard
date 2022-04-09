import * as actionTypes from '../actionTypes';

export const setInterviews = (interviews) => ({
  type: actionTypes.INTERVIEWS_SET_INTERVIEWS,
  payload: {
    interviews,
  },
});
export const setInterviewById = (interview) => ({
  type: actionTypes.INTERVIEWS_SET_INTERVIEW_BY_ID,
  payload: {
    interview,
  },
});
export const updateInterviewNote = (newInterview) => ({
  type: actionTypes.INTERVIEWS_UPDATE_INTERVIEW_NOTE,
  payload: {
    newInterview,
  },
});
