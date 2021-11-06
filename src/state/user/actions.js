import * as actionTypes from '../action-types';

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
