import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LandingContent from './Landing/LandingContent';
import NotFoundPage from '../general/NotFound';

/**
 * Controls routes based off recruitment page route (i.e. /recruitment).
 */
const LandingPage = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/application`}>
        <h1>Applications Page</h1>
      </Route>
      <Route path={`${match.url}/interview`}>
        <h1>Interview Page</h1>
      </Route>
      <Route path={`${match.url}/decision`}>
        <h1>Decision Page</h1>
      </Route>
      <Route path={`${match.url}`} exact>
        <LandingContent />
      </Route>
      <Route path="*">
        {/* Explicitly needed to capture invalid paths under /recruitment */}
        <NotFoundPage />
      </Route>
    </Switch>
  );
};

export default LandingPage;
