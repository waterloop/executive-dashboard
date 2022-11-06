// Configuration
const getConfiguration = (server) => () => server.get('/api/configuration');

const updateConfiguration = (server) => (configuration) =>
  server.patch('/api/configuration', configuration);

export default (server) => ({
  getConfiguration: getConfiguration(server),
  updateConfiguration: updateConfiguration(server),
});
