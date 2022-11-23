import { serverDashboard, serverCMS } from './server';
import google from './google-auth';
import applications from './applications';
import email from './email';
import interviews from './interviews';
import configuration from './configuration';
import postings from './postings';
import teams from './teams';

export default {
  google: google(serverDashboard),
  applications: applications(serverDashboard),
  interviews: interviews(serverDashboard),
  email: email(serverDashboard),
  configuration: configuration(serverDashboard),
  postings: postings(serverCMS),
  teams: teams(serverCMS),
};
