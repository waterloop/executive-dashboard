const addApplication = (server) => (formData) =>
  server.post('/api/applications/', formData);

const getApplicationByEmail = (server) => (email) =>
  server.get(`/api/applications/applicant/${email}`);

const getApplications = (server) => (term) =>
  server.get(`/api/applications?term=${term}`);

const updateApplicationStatus = (server) => (id, status) =>
  server.patch('/api/applications/applicant/status', { id, status });

export default (server) => ({
  addApplication: addApplication(server),
  getApplicationByEmail: getApplicationByEmail(server),
  getApplications: getApplications(server),
  updateApplicationStatus: updateApplicationStatus(server),
});
