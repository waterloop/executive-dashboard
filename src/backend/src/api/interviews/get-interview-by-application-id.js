import db from '../../db';

export default (req, res) => {
  const application_id = req.params.id;
  db.interviews
    .getInterviewByApplicationId(application_id)
    .then((response) => {
      if (response.length === 1) {
        res.send(response[0]);
      } else if (response.length === 0) {
        res.sendStatus(404);
      } else {
        // Somehow have multiple interview entries for one application!!! Error:
        throw new Error(
          'Multiple interview entries detected for single application! Please sanitize the database.',
        );
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
