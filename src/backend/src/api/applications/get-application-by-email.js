import db from '../../db';

export default (req, res) => {
  const email = req.params.email;
  db.applications
    .getApplicationByEmail(email)
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.error(`Could not get application by this email: ${err}`);
      res.sendStatus(404);
    });
};
