// Configuration
const getConfiguration = (server) => () => server.get('/api/configuration');

export default (server) => ({
  getConfiguration: getConfiguration(server),
});
