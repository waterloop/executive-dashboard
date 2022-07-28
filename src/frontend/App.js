import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import GlobalStyle from './globalStyles';

import * as userSelectors from './state/user/selectors';
import TopBar from './components/TopBar';

import SignInPage from './pages/general/SignIn';
import LandingPage from './pages/general/Landing';
import NotFoundPage from './pages/general/NotFound';
import RecruitmentLandingPage from './pages/recruitment';

/* TODO: Create the folllowing pages and include them for their corresponding routes */
/*
import AnalyticsLandingPage from './pages/analytics/...';
*/

const App = () => {
  const token = useSelector(userSelectors.token);

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/sign-in" exact>
          <SignInPage />
          {/* <h1>Sign In</h1> */}
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