import { serverDashboard, serverCMS } from './server';
import applications from './applications';
import teams from './teams';
import postings from './postings';

export default {
  applications: applications(serverDashboard),
  teams: teams(serverCMS),
  postings: postings(serverCMS),
};
