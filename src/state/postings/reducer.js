import * as actionTypes from '../actionTypes';

const initialState = {
  all: [],
  byId: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.POSTINGS_SET_POSTINGS:
      return {
        ...state,
        all: payload.postings,
      };

    case actionTypes.POSTINGS_SET_POSTING_BY_ID:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: payload.posting,
        },
      };
    default:
      return { ...state };
  }
};
