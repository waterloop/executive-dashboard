import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useGoogleAuth from '../../../hooks/google-auth';
import Cookies from 'js-cookie';

import WaterloopWLogoSVG from './assets/waterloop-w-logo.svg';
import UnstyledSignInBox from './components/SignInBox';

import * as userActions from '../../../state/user/actions';
import { addAuthTokenToRequests } from '../../../api/server';
import api from '../../../api';

const WaterloopWLogo = styled.img.attrs({
  src: WaterloopWLogoSVG,
})`
  max-width: 96%;
  margin-bottom: 100px;
`;

const SignInContainer = styled.div`
  background-color: ${({ theme }) => theme.colours.white};
  height: 100vh;
  max-width: 760px;
  min-height 600px;
  border-radius: 0px 70px 70px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const SignInBox = styled(UnstyledSignInBox)`
  max-width: 90%;
  box-shadow: 0px 5px 10px #CAD0E4;
  border-radius: 30px;
`;

const Container = styled.div`
  background: linear-gradient(91.05deg, #CAD4FF 0%, #FEEDED 99.9%);
  height: 100vh;
  width: 100vw;
`;

/// TODO: Add browser memory storage:

// https://auth0.com/docs/secure/security-guidance/data-security/token-storage

const SignInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errMsgVisible, showErrorMsg] = useState(false);

  const onAuthComplete = useCallback(
    (err, authPayload) => {
      if (err) {
        console.log('auth error:', err);
        showErrorMsg(true);
        return;
      }
      const { userId, tokenId, groupIds, accessToken } = authPayload;
      dispatch(userActions.setUserAuth({ userId, tokenId }));
      Cookies.set(
        'tokenId',
        tokenId,
        { expires: 1 },
      );
      addAuthTokenToRequests(tokenId);
      console.log('Auth Complete');

      api.google
        .updateUserGroups(userId, groupIds, accessToken)
        .then((resp) => {
          if (resp.data && resp.data.groupIds) {
            console.log(
              `Successfully updated membership info. for groups with IDs: ${
                resp.data.groupIds.join(', ')}`,
            );
          }
        })
        .catch((e) => {
          console.log('Error: Failed to sync group membership info.');
          console.log(e);
        }); 
      // ^^ uncomment this if groupID is used again

      history.push('/');
    },
    [dispatch, history],
  );

  const { signIn } = useGoogleAuth(onAuthComplete);
  return (
    <Container>
      <SignInContainer>
        <WaterloopWLogo />
        <SignInBox
          errMsgVisible={errMsgVisible}
          onClick={() => {
            if (errMsgVisible) {
              showErrorMsg(false);
            }
            signIn();
          }}
        />
      </SignInContainer>
    </Container>
  );
};

export default SignInPage;
