import { toUser, fromUser } from '../models/users';

const getById = (db) => (id) => db('users')
  .where({
    id
  })
  .then((data) => {
    if (data.length == 0) {
      return -1;
    }
    if (data.length > 1) {
      return new Error(`Multiple Users with id: ${id}`);
    }
    return toUser(data[0]);
  });

const updateProfilePicture = (db) => async (picture, id) => {
  return db('users').where({
    id
  }).update({ picture });
};

const getProfilePicture = (db) => async (userId) => {
  const users = await db('users').where({
    id: userId
  });
  console.log(users)
  return users.length > 0 ? users[0].picture : '';
}

const createUser = (db) => (email, givenName, familyName, userId) => db('users')
  .insert(fromUser({ id: userId, email, givenName, familyName, picture: '', admin: false }));

export default (db) => ({
  getById: getById(db),
  getProfilePicture: getProfilePicture(db),
  updateProfilePicture: updateProfilePicture(db),
  createUser: createUser(db),
});
