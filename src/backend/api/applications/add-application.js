import db from 'backend/db';

export default (req, res) => {
  const appData = req.body;

  // TODO: Call add-row endpoint.
  db.applications
    .addApplication(appData)
    .then((response) => {
      res.send(response[0]);
    })
    .catch((err) => {
      console.error(`Could not add application: ${err}`);
      res.sendStatus(500);
    });
};
