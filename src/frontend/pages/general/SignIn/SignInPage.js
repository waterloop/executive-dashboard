import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useGoogleAuth from 'frontend/hooks/google-auth';
import CookiesHelper from 'frontend/hooks/cookies';

import BuildingsSVG from './assets/buildings.svg';
import PodSVG from './assets/pod.svg';
import WaterloopCmsLogoSVG from './assets/waterloop-dashboard-logo.svg';
import UnstyledSignInBox from './components/SignInBox';

import * as userActions from 'frontend/state/user/actions';
import { addAuthTokenToRequests } from 'frontend/api/server';
import api from 'frontend/api';

const WaterloopCmsLogo = styled.img.attrs({
  src: WaterloopCmsLogoSVG,
})`
  position: absolute;
  top: 20px;
  right: calc(min(48px, 2%));
  max-width: 96%;
`;

const Buildings = styled.img.attrs({
  src: BuildingsSVG,
})`
  width: auto;
  height: 75%;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.lg}px) {
    display: none;
  }
`;

const Pod = styled.img.attrs({
  src: PodSVG,
})``;

const PodTrack = styled.div`
  background-color: ${({ theme }) => theme.colours.yellows.yellow1};
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
    justify-content: center;
  }

  @media screen and (max-height: 655px) {
    display: none;
  }

  ${Pod} {
    margin-left: 20%;
    @media screen and (max-width: ${({ theme }) => theme.breakpoints.md}px) {
      margin-left: 16px;
      margin-right: 16px;
    }
  }
`;

const SignInBox = styled(UnstyledSignInBox)`
  top: calc(min(20%, 267px));
  position: absolute;
  left: calc(min(84px, 5%));
  max-width: 90%;
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colours.blues.blue1};
  height: 100vh;
  width: 100vw;

  ${Buildings} {
    position: absolute;
    bottom: 32px;
    right: 48px;
  }

  ${PodTrack} {
    position: absolute;
    bottom: calc(min(120px, 10%));
  }
`;

const SignInPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errMsgVisible, showErrorMsg] = useState(false);
  const { setTokenId, setAccessToken } = CookiesHelper;

  const onAuthComplete = useCallback(
    (err, authPayload) => {
      if (err) {
        console.error('auth error:', err);
        showErrorMsg(true);
        return;
      }
      const { userId, tokenId, groupIds, accessToken } = authPayload;
      dispatch(userActions.setUserAuth({ userId, tokenId }));
      setTokenId(tokenId);
      setAccessToken(accessToken); // TODO: Send accessToken via Authorization header. Don't send tokenId through that!

      addAuthTokenToRequests(tokenId);
      console.log('Auth Complete');

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
          console.error('Error: Failed to sync group membership info.');
          console.error(e);
        });

      history.push('/');
    },
    [dispatch, history, setAccessToken, setTokenId],
  );

  const { signIn } = useGoogleAuth(onAuthComplete);
  return (
    <Container>
      <WaterloopCmsLogo />
      <SignInBox
        errMsgVisible={errMsgVisible}
        onClick={() => {
          if (errMsgVisible) {
            showErrorMsg(false);
          }
          signIn();
        }}
      />
      <PodTrack>
        <Pod />
      </PodTrack>
      <Buildings />
    </Container>
  );
};

export default SignInPage;
