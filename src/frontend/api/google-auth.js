const authenticate = (server) => (socket) =>
    server.get(`/google?socketId=${socket.id}`);
const getPicture = (server) => (userId) =>
    server.get(`/google/picture/${userId}`);

const checkToken = (server) => (tokenId, accessToken) =>
    server.post(
        `/google?tokenId=${tokenId}`,
        {},
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );

const updateUserGroups = (server) => (userId, groupIds, accessToken) => {
    if (!groupIds) {
        groupIds = [];
    }
    return server.post(
        '/google/groups?userId=' + userId + '&groupIds=' + groupIds.join(','),
        {},
        {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${accessToken}`,
            },
        },
    );
};

export default (server) => ({
    authenticate: authenticate(server),
    getPicture: getPicture(server),
    checkToken: checkToken(server),
    updateUserGroups: updateUserGroups(server),
});
