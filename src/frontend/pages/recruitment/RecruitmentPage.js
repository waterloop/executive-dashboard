import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

import LandingContent from './Landing';
import ConfigurationPage from './Configuration';
import NotFoundPage from '../general/NotFound';
import ApplicationProfilePage from './ApplicationProfile/ApplicationProfilePage';
import InterviewProfilePage from './InterviewProfile/InterviewProfilePage';
import ApplicationPage from './ApplicationPage';
import InterviewPage from './InterviewPage';
import DecisionPage from './DecisionPage';

/**
 * Controls routes based off recruitment page route (i.e. /recruitment).
 */
const LandingPage = () => {
  const match = useRouteMatch();

  return (
    <Switch>
      <Route path={`${match.url}/application/:application_id`}>
        <ApplicationProfilePage />
      </Route>
      <Route path={`${match.url}/application`}>
        <ApplicationPage />
      </Route>
      <Route path={`${match.url}/interview/:interview_id`}>
        <InterviewProfilePage />
      </Route>
      <Route path={`${match.url}/interview`}>
        <InterviewPage />
      </Route>
      <Route path={`${match.url}/decision`}>
        <DecisionPage />
      </Route>
      <Route path={`${match.url}/config`}>
        <ConfigurationPage />
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
