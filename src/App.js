import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import GlobalStyle from './globalStyles';

import TopBar from './components/TopBar';

import SignInPage from './pages/general/SignIn';
import LandingPage from './pages/general/Landing';
import NotFoundPage from './pages/general/NotFound';
/* TODO: Create the folllowing pages and include them for their corresponding routes */
import RecruitmentLandingPage from './pages/recruitment';
/*
import AnalyticsLandingPage from './pages/analytics/...';
*/

const App = () => {
  const token = true;

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/sign-in" exact>
          <SignInPage />
          <h1>Sign In</h1>
        </Route>
        <Route path="/" exact>
          <div>
            {!token && <Redirect to="/sign-in" />}
            <TopBar />
            <LandingPage />
          </div>
        </Route>
        <Route path="/recruitment" exact>
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
        <Route path="*">
          <NotFoundPage />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
