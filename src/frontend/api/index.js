import { serverDashboard, serverCMS } from './server';
import applications from './applications';
import interviews from './interviews';
import teams from './teams';
import postings from './postings';

export default {
  applications: applications(serverDashboard),
  interviews: interviews(serverDashboard),
  teams: teams(serverCMS),
  postings: postings(serverCMS),
};
