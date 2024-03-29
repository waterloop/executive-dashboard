import * as actionTypes from '../actionTypes';

const initialState = {
  id: null,
  picture: '',
  profile: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actionTypes.USER_SET_AUTH:
      return {
        ...state,
        id: payload.id,
        token: payload.token,
      };

    case actionTypes.USER_SET_PICTURE:
      return {
        ...state,
        picture: payload.picture,
      };
    
    case actionTypes.USER_SET_PROFILE:
      return {
        ...state,
        profile: payload.profile,
      }

    default:
      return state;
  }
};
