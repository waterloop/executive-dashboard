const updateApplicationEmailSent = (server) => (emailData) =>
  server.patch('/api/email', emailData);

export default (server) => ({
  updateApplicationEmailSent: updateApplicationEmailSent(server),
});
