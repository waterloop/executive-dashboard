const getConfiguration = (db) => () => db('configuration').then((data) => data);

// NOTE: not supporting adding/deleting configuration as we should be able to do that by
// updating our seed file for prod.
const updateConfiguration = (db) => (label, value) =>
  db('configuration')
    .where({ label })
    .update({ value }, ['id', 'label', 'value'])
    .then((response) => response)
    .catch((err) => {
      console.error(`Error in updateConfiguration: ${err}`);
      throw err;
    });

export default (db) => ({
  getConfiguration: getConfiguration(db),
  updateConfiguration: updateConfiguration(db),
});
