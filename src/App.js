import React from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';
// import { useSelector } from 'react-redux';

import GlobalStyle from './globalStyles';
import TopBar from './components/TopBar';
import LandingPage from './pages/landing/LandingPage';
import NotFoundPage from './pages/notFound/NotFoundPage';

const App = () => {
  const token = true;

  return (
    <BrowserRouter>
      <GlobalStyle />
      <Switch>
        <Route path="/sign-in" exact>
          {/* <SignInPage /> */}
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
          {/* <RecruitmentLanding /> */}
          <h1>Recruitment</h1>
        </Route>
        <Route path="/analytics" exact>
          {!token && <Redirect to="/sign-in" />}
          <TopBar />
          {/* <AnalyticsLanding /> */}
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
