import db from '../../db';

export default (req, res) => {
  const term = req.query.term;
  db.interviews
    .getInterviewsByTerm(term)
    .then((response) => {
      if (response.length === 0) {
        res.sendStatus(404);
      } else {
        res.send(response);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};
