import server from './server';
import applications from './applications';

export default {
  applications: applications(server),
};
