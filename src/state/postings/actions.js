import * as actionTypes from '../actionTypes';

export const setPostings = (postings) => ({
  type: actionTypes.POSTINGS_SET_POSTINGS,
  payload: {
    postings,
  },
});

export const setPostingById = (id, posting) => ({
  type: actionTypes.POSTINGS_SET_POSTING_BY_ID,
  payload: {
    id,
    posting,
  },
});
