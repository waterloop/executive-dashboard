import db from '../../db';

export default (req, res) => {
  const appID = req.body.id;
  const newStatus = req.body.status;

  db.applications
    .updateApplicationStatus(appID, newStatus)
    .then((response) => {
      // TODO: Change so it should send only one entry as response. (i.e. check for more than 1 and invalidate if that's the case.)
      if (response.length === 0) {
        // Warn user of nonexistent application.
        console.warn(`Application with ID ${appID} does not exist`);
        res.sendStatus(404);
      } else if (response.length === 1) {
        res.send(response[0]);
      } else {
        // We should never have more than 1 entry:
        throw new Error(
          `Multiple application entries detected for appID ${appID}! Please sanitize the database.`,
        );
      }
    })
    .catch((err) => {
      console.error(`Could not update application with status: ${err}`);
      res.sendStatus(500);
    });
};
