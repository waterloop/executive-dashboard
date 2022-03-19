const getPostings =
  (server) =>
  (joinTeamName = false) =>
    server.get(`/api/postings${joinTeamName ? '?joinTeamName=true' : ''}`); // is joinTeamName a part of the query?

const getPostingById =
  (server) =>
  (id, joinTeamName = false) =>
    server.get(
      `/api/postings/${id}${joinTeamName ? '?joinTeamName=true' : ''}`,
    );

export default (server) => ({
  getPostingById: getPostingById(server),
  getPostings: getPostings(server),
});
