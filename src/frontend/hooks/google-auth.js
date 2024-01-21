import { useCallback, useEffect } from 'react';
import { useGoogleLogin } from 'react-google-login';
import * as userActions from '../state/user/actions';
import { useDispatch } from 'react-redux';
import api from '../api';
import { useGoogleLogout } from 'react-google-login';
import CookiesHelper from '../hooks/cookies';
import { gapi } from 'gapi-script';

const scopes = [
  'profile',
  'email',
  'https://www.googleapis.com/auth/admin.directory.group.readonly',
  'https://www.googleapis.com/auth/gmail.send',
];

const useGoogleAuth = (onAuthComplete) => {
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_PUBLIC_GOOGLE_CLIENT_ID,
        scope: 'email',
      });
    }

    gapi.load('client:auth2', start);
  }, []);

  const dispatch = useDispatch();
  const { removeAllCookies, setProfilePic, setUserEmail, setUserName } =
    CookiesHelper;
  const onSuccess = useCallback(
    (response) => {
      // https://github.com/anthonyjgrove/react-google-login/blob/7db5b9686a70ded6b090a9c01906ca978b00a54d/index.d.ts#L29
      const { tokenId, profileObj, accessToken } = response;
      api.google
        .checkToken(tokenId, accessToken)
        .then((checkTokenResponse) => {
          if (checkTokenResponse.status === 200) {
            const { userId, groupIds, accessToken } = checkTokenResponse.data;
            console.log(checkTokenResponse);
            onAuthComplete(null, {
              userId,
              tokenId,
              groupIds,
              accessToken,
            });
          } else {
            throw new Error(
              `Could not authenticate user, HTTP status code: ${checkTokenResponse.status}`,
            );
          }
        })
        .catch((err) => onAuthComplete(err));
      dispatch(userActions.setUserPicture(profileObj.imageUrl));
      dispatch(userActions.setUserProfile(profileObj));
      setProfilePic(profileObj.imageUrl);
      setUserName(profileObj.name);
      setUserEmail(profileObj.email);
    },
    [onAuthComplete, dispatch, setProfilePic, setUserName, setUserEmail],
  );

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure: (err) => {
      console.error('Failed to authenticate user! Reason: ', err);
    },
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    scope: scopes.join(' '),
    prompt: 'consent',
  });

  const { signOut } = useGoogleLogout({
    clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    onLogoutSuccess: () => {
      removeAllCookies();
      console.log('successful logout');
    },
    onFailure: () => {
      console.error('Failed to logout!');
    },
  });

  /**
   * signIn returns the access and refresh tokens needed to authenticate a user and use services on their behalf.
   */
  return {
    signIn,
    signOut,
  };
};

export default useGoogleAuth;
