const moment = require('moment'); // require so that this file can be imported into seeds

exports.parseTimeForResponse = (time) => moment(time).toDate().getTime();
exports.parseTimeFromRequest = (time) => (new Date(time)).toISOString().replace('T', ' ').replace('Z', '');
