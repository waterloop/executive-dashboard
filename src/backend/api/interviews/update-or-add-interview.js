import db from '../../db';

export default (req, res) => {
  const interviewData = req.body; // Should be a JSON object. Only one entry is allowed to be added at a time.
  db.interviews
    .updateOrAddInterview(interviewData)
    .then((response) => {
      if (response.length === 0) {
        const warnMsg =
          "Could not add/update interview entry. Somehow the query didn't do its job but it still passed.";
        console.warn(warnMsg);
        res.status(500).send(warnMsg);
      } else if (response.length === 1) {
        res.send(response[0]);
      } else {
        // We should never have more than 1 entry:
        throw new Error(
          'Multiple interview entries detected for single application! Please sanitize the database.',
        );
      }
    })
    .catch((err) => {
      let errMsg;
      if (err.code === '23503') {
        // FOREIGN KEY VIOLATION
        // Client-side error, application ID supplied doesn't exist.
        errMsg = `Error - Unknown application ID supplied: ${interviewData.application_id}`;
        console.error(errMsg);
        res.status(403).send(errMsg);
      } else {
        // Server-side error
        errMsg = `Error - Could not update/add interview: ${err}`;
        console.error(errMsg);
        res.status(500).send(errMsg);
      }
    });
};
