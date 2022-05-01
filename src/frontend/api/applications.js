// Applications
const getApplications = (server) => (term) =>
  server.get(`/api/applications?term=${term}`);

const getApplicationsByEmail = (server) => (email) =>
  server.get(`/api/applications/applicant/${email}`);

// NOTE: May not need addApplication here.
const addApplication = (server) => (formData) =>
  server.post('/api/applications/', formData);

const updateApplicationStatus = (server) => (id, status) =>
  server.patch('/api/applications/applicant/status', { id, status });

// Application statuses:
const getApplicationStatuses = (server) => () =>
  server.get('/api/applications/statuses');

export default (server) => ({
  getApplications: getApplications(server),
  getApplicationsByEmail: getApplicationsByEmail(server),
  addApplication: addApplication(server),
  updateApplicationStatus: updateApplicationStatus(server),
  getApplicationStatuses: getApplicationStatuses(server),
});
