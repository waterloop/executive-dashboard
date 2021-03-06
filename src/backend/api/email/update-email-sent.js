import db from '../../db';

export default (req, res) => {
  const appID = req.body.id;
  // Try applications db first:
  db.applications
    .updateEmailSent(appID)
    .then((response) => {
      if (Array.isArray(response) && response.length !== 0) {
        res.send(response[0]);
      } else {
        // If no entries matched criteria in db, then attempt to update interview table email_sent column
        db.interviews.updateEmailSent(appID).then((resp2) => {
          if (typeof resp2 === 'number') {
            let errMsg;
            switch (resp2) {
              // TODO: We should have an error struct in the future to distinguish between these 2 errors more easily.
              case -1:
                errMsg = `Could not find application (and corresponding interview entry) with ID ${appID}.`;
                break;
              case -2:
                errMsg = `Cannot modify application/interview entry with ID ${appID}: invalid status.`;
                break;
              default:
                break;
            }
            console.error(errMsg);
            res.status(403).send(errMsg);
          } else if (Array.isArray(resp2) && resp2.length === 1) {
            res.send(resp2[0]);
          } else {
            // We should never have more than 1 interview entry:
            throw new Error(
              'Multiple interview entries detected for single application! Please sanitize the database.',
            );
          }
        });
      }
    })
    .catch((err) => {
      const errMsg = `Could not modify email-sent status: ${err}`;
      console.error(errMsg);
      res.status(500).send(errMsg);
    });
};
