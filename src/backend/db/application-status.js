const getApplicationStatuses = (db) => () =>
  db('application_status')
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.error(`Error in getApplicationStatuses: ${err}`);
      throw err;
    });

export default (db) => ({
  getApplicationStatuses: getApplicationStatuses(db),
});
