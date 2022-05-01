const connection = require('../../knexfile')[process.env.NODE_ENV || 'test'];
export const db = require('knex')(connection);

import applications from './applications';
import interviews from './interviews';
import applicationStatus from './application-status';
import configuration from './configuration';

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