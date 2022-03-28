import * as actionTypes from '../actionTypes';

export const setInterviews = (interviews) => ({
  type: actionTypes.INTERVIEWS_SET_INTERVIEWS,
  payload: {
    interviews,
  },
});
export const setInterviewById = (id, interview) => ({
  type: actionTypes.INTERVIEWS_SET_INTERVIEW_BY_ID,
  payload: {
    id,
    interview,
  },
});
