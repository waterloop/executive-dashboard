import db from '../../db';

export default (req, res) => {
  const term = req.query.term;
  db.applications
    .getApplicationsByTerm(term)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(404);
    });
};
