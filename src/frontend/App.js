import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CookiesHelper from './hooks/cookies.js';
import { addAuthTokenToRequests } from './api/server.js';

import GlobalStyle from './globalStyles';

import * as userSelectors from './state/user/selectors';
import TopBar from './components/TopBar';

import SignInPage from './pages/general/SignIn';
import LandingPage from './pages/general/Landing';
import NotFoundPage from './pages/general/NotFound';
import RecruitmentLandingPage from './pages/recruitment';

/* TODO: Create the following pages and include them for their corresponding routes */
/*
import AnalyticsLandingPage from './pages/analytics/...';
*/

const App = () => {
  let token = useSelector(userSelectors.token);
  const {getCookie, CookieTags} = CookiesHelper;
  if (!token){
    token = getCookie(CookieTags.tokenId);
    if (token) {
      addAuthTokenToRequests(token);
    }
  }

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/sign-in" exact>
          <SignInPage />
        </Route>
        <Route path="/recruitment">
          {!token && <Redirect to="/sign-in" />}
          <TopBar />
          <RecruitmentLandingPage />
        </Route>
        <Route path="/analytics" exact>
          {!token && <Redirect to="/sign-in" />}
          <TopBar />
          {/* <AnalyticsLandingPage /> */}
          <h1>Analytics</h1>
        </Route>
        <Route path="/" exact>
          <div>
            {!token && <Redirect to="/sign-in" />}
            <TopBar />
            <LandingPage />
          </div>
        </Route>
        <Route path="*">
          <TopBar />
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
