import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import LandingContent from './Landing/LandingContent';
import NotFoundPage from '../general/NotFound';
import useInterviews from '../../hooks/interviews';
import useInterviewByAppId from '../../hooks/interviewByAppId';

/**
 * Controls routes based off recruitment page route (i.e. /recruitment).
 */
const LandingPage = () => {
  const match = useRouteMatch();

  // const apps = useApplications('WINTER-2022');
  const { interviews } = useInterviews('WINTER-2022');
  console.log(interviews);
  const interviewData = useInterviewByAppId(0);
  console.log(interviewData);

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
