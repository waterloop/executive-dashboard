const getTeams = (server) => () => server.get('/api/team-descriptors');

const getTeamDesc = (server) => () =>
  server.get('/api/team-descriptors/description');

export default (server) => ({
  getTeams: getTeams(server),
  getTeamDesc: getTeamDesc(server),
});
