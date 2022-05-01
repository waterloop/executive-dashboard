import db from '../../db';

export default (req, res) => {
  db.configuration
    .getConfiguration()
    .then((response) => {
      res.send(response);
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(404);
    });
};
