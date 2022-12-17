import db from 'backend/db';

export default (req, res) => {
  db.applicationStatus
    .getApplicationStatuses()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(`Could not get application status: ${err}`);
      res.sendStatus(404);
    });
};
