const updateApplicationEmailSent = (server) => (id) =>
  server.patch('/api/email', { id });

export default (server) => ({
  updateApplicationEmailSent: updateApplicationEmailSent(server),
});
