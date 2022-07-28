import renameProps from '../utils/rename-props';
export const toUser = user => renameProps(user, {
  given_name: 'givenName',
  family_name: 'familyName',
});

export const fromUser = user => renameProps(user, {
  givenName: 'given_name',
  familyName: 'family_name',
});
