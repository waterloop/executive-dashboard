import * as actionTypes from '../actionTypes';

export const setUserAuth = (authPayload) => ({
  type: actionTypes.USER_SET_AUTH,
  payload: {
    id: authPayload.userId,
    token: authPayload.tokenId,
  },
});

export const setUserPicture = (picture) => ({
  type: actionTypes.USER_SET_PICTURE,
  payload: {
    picture,
  },
});

export const setUserProfile = (profile) => ({
  type: actionTypes.USER_SET_PROFILE,
  payload: {
    profile,
  },
});
