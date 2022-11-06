// NOTE: This sign-in page implementation follows an alternative UI design (which doesn't follow CMS styling).
// It is kept here in case we decide to switch back to that alternative design.

import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useGoogleAuth from '../../../hooks/google-auth';
import CookiesHelper from '../../../hooks/cookies';

import WaterloopWLogoSVG from './assets/waterloop-w-logo.svg';
import BackgroundShapesSVG from './assets/background-shapes.svg';
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
  width: max(57vw, 760px);
  border-radius: 0px 70px 70px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignInBox = styled(UnstyledSignInBox)`
  max-width: 90%;
  box-shadow: 0px 5px 10px #cad0e4;
  border-radius: 30px;
`;

const Container = styled.div`
  background: linear-gradient(91.05deg, #cad4ff 0%, #feeded 99.9%);
  background-image: url(${BackgroundShapesSVG});
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-position: right center;
  background-size: auto 100%;
`;

const SignInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errMsgVisible, showErrorMsg] = useState(false);
  const {setTokenId} = CookiesHelper;

  const onAuthComplete = useCallback(
    (err, authPayload) => {
      if (err) {
        console.log('auth error:', err);
        showErrorMsg(true);
        return;
      }
      const { userId, tokenId, groupIds, accessToken } = authPayload;
      dispatch(userActions.setUserAuth({ userId, tokenId }));
      setTokenId(tokenId);
      addAuthTokenToRequests(tokenId);
      api.google
        .updateUserGroups(userId, groupIds, accessToken)
        .then((resp) => {
          if (resp.data && resp.data.groupIds) {
            console.log(
              `Successfully updated membership info. for groups with IDs: ${resp.data.groupIds.join(
                ', ',
              )}`,
            );
          }
        })
        .catch((e) => {
          console.log('Error: Failed to sync group membership info.');
          console.log(e);
        });
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
