import { useCallback } from 'react';
import { useGoogleLogin } from 'react-google-login';
import * as userActions from '../state/user/actions';
import { useDispatch } from 'react-redux';
import api from '../api';

// TODO: store token in localStorage.
const useGoogleAuth = (onAuthComplete) => {
  const dispatch = useDispatch();
  const onSuccess = useCallback(
    (response) => {
      // https://github.com/anthonyjgrove/react-google-login/blob/7db5b9686a70ded6b090a9c01906ca978b00a54d/index.d.ts#L29
      const { tokenId, profileObj, accessToken } = response;
      console.log('Begin auth');
      api.google
        .checkToken(tokenId, accessToken)
        .then((checkTokenResponse) => {
          if (checkTokenResponse.status === 200) {
            const { userId, accessToken } = checkTokenResponse.data;
            onAuthComplete(null, {
              userId,
              tokenId,
              // groupIds,
              accessToken,
            });
          }
        })
        .catch((err) => onAuthComplete(err));

      dispatch(userActions.setUserPicture(profileObj.imageUrl));
    },
    [onAuthComplete],
  );

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: (err) => {
      console.error('Failed to authenticate user! Reason: ', err);
    },
    clientId:
      '538509890740-e3dai2feq6knjfdspqde5ogt2kme0chm.apps.googleusercontent.com',
    scope:
      'profile email https://www.googleapis.com/auth/admin.directory.group.readonly',
    prompt: 'consent',
  });

  /**
   * signIn returns the access and refresh tokens needed to authenticate a user and use services on their behalf.
   */
  return {
    signIn,
  };
};

export default useGoogleAuth;
