const addApplication = (server) => (formData) => {
  server.post('/api/applications/', formData);
};

const getApplicationByEmail = (server) => (email) => {
  server.get(`/api/applications?email=${email}`);
};

const getApplication = (server) => (term) => {
  server.get(`/api/applications?term=${term}`);
};

const updateApplicationStatus = (server) => (id, status) => {
  server.patch('/api/applications', { id, status });
};

export default (server) => ({
  addApplication: addApplication(server),
  getApplicationByEmail: getApplicationByEmail(server),
  getApplication: getApplication(server),
  updateApplicationStatus: updateApplicationStatus(server),
});
