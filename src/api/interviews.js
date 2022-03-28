const getInterviews = (server) => (term) =>
  server.get(`/api/interviews?term=${term}`);

// Useful for detecting changes between old state and backend made by another user.
const getInterviewByAppId = (server) => (id) =>
  server.get(`/api/interviews/${id}`);

// NOTE: May not need addApplication here.
const updateOrAddInterview = (server) => (formData) =>
  server.post('/api/interviews', formData);

export default (server) => ({
  getInterviews: getInterviews(server),
  getInterviewByAppId: getInterviewByAppId(server),
  updateOrAddInterview: updateOrAddInterview(server),
});
