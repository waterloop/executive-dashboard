import applications from './applications';
import interviews from './interviews';
import applicationStatus from './application-status';
import configuration from './configuration';

const connection = require('../../../knexfile')[process.env.NODE_ENV || 'test'];
// eslint-disable-next-line global-require
export const db = require('knex')(connection);

export default {
  applications: {
    ...applications(db),
  },
  interviews: {
    ...interviews(db),
  },
  applicationStatus: {
    ...applicationStatus(db),
  },
  configuration: {
    ...configuration(db),
  },
};
