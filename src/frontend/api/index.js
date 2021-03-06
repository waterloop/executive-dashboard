import { serverDashboard, serverCMS } from './server';
import applications from './applications';
import email from './email';
import interviews from './interviews';
import postings from './postings';
import teams from './teams';

export default {
  applications: applications(serverDashboard),
  interviews: interviews(serverDashboard),
  email: email(serverDashboard),
  postings: postings(serverCMS),
  teams: teams(serverCMS),
};
