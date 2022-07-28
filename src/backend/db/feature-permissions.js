const {google} = require('googleapis');
const { OAuth2Client } = require('google-auth-library');

/**
 * Translate Group Keys to Group Ids
 * 
 * @param {*} db: The database interface object 
 * @param {Array[String]} groupKeys 
 * 
 * @returns Array of Group Ids
 */
const keysToIds = async (db, groupKeys) => {
  let groupIds = [];
  if (groupKeys && groupKeys.length > 0) {
    try {
      let query = 'SELECT id FROM groups WHERE group_key IN (' + groupKeys.map(_ => '?').join(',') + ');'
      groupIds = ( await db.raw(query, [...groupKeys] )).rows.map(row => row.id);
    } catch(e) {
      console.log(e);
      groupIds = [];
    }
  } 
  return groupIds;
}

/**
 * Return Group Ids and Group Keys, given a set of Group Ids as input
 * 
 * @param {*} db: The database interface object 
 * @param {Array[String]} groupIds
 */
const appendKeysToIds = async (db, groupIds) => {
  // Translate Group Keys into Group IDs
  let groupObjs = [];
  if (groupIds && groupIds.length > 0) {
    try {
      // Reference: For array bindings syntax, please see: https://knexjs.org/#Raw-Bindings 
      let query = 'SELECT id, group_key FROM groups WHERE id IN (' + groupIds.map(_ => '?').join(',') + ');';
      groupObjs = ( await db.raw(query, [...groupIds] )).rows;
    } catch(e) {
      console.log(e);
      groupObjs = [];
    }
  }
  return groupObjs;
}

/**
 * Get the up-to-date list of groups that the user is part of in GSuite (waterloop domain)
 * 
 * @param {*} gAdminClient: Google Admin API client object
 * @param {String} userId
 */
const getGroupKeys = async (gAdminClient, userId) => {
  try {
    let res = await gAdminClient.groups.list({
      userKey: userId
    })
    const groupKeys = res.data.groups.map(g => g.id); // These are group_keys
    return groupKeys;
  } catch (err) {
    console.log('Error: Google Admin API groups.list() call returned an error: ', err);   // TODO: handle error properly
    console.log(gAdminClient);
    return [];
  };
}

const getGAdminClient = (accessToken) => {
  const client = new OAuth2Client(process.env.client_id);
  client.setCredentials({
      access_token: accessToken
  });
  const gAdminClient = google.admin({
    version : "directory_v1",
    auth: client
  });
  return gAdminClient;
}

/**
 * Return an array of actions the user is allowed to execute
 * 
 * @param {String} userId
 * @returns {Array[String]} Array of actions the user is allowed to execute
 */
const getAllowedActions = (db) => async (userId, accessToken) => {
  try {
    const gAdminClient = getGAdminClient(accessToken);
    if (process.env.NODE_ENV == 'development' || 'production') { //Note: In the future, this should be reverted, please check task: https://app.clickup.com/t/2659xb1 
      let allowedActions = ['Edit Content'];
      let groupIds = [];
      return {
        allowedActions,
        groupIds
      };
    } else {
      let groupKeys = await getGroupKeys(gAdminClient, userId);  // Fetch all groups that the user is a member of in Google Groups
      let groupIds = await keysToIds(db, groupKeys);  // Translate group keys into groups ids 

      let allowedActions = [];
      if (groupIds && groupIds.length > 0) {
        let query = 'SELECT DISTINCT feature_name FROM feature_permissions WHERE group_id IN (' + groupIds.map(_ => '?').join(',') + ');';
        allowedActions = (await db.raw(query, [...groupIds])).rows.map(row => row.feature_name);
      }
      return {
        allowedActions,
        groupIds,
      };
    }
  } catch (err) {
    console.log("[getAllowedActions] ERROR: Could not fetch up-to-data from Google Groups.");
    console.log(err);
    console.log("UserID: ", userId);
    console.log("accessToken: ", accessToken);
  }

  // If fetching data from Google Groups failed, then use locally-stored data.
  try {
    let query = `
      SELECT DISTINCT perms.feature_name, group_ids.group_id FROM feature_permissions AS perms 
        INNER JOIN (
          SELECT group_id	
          FROM group_users
          WHERE group_users.user_id = :userId
        ) AS group_ids 
        ON perms.group_id = group_ids.group_id;
    `;

    let resp = (await db.raw(query, {userId: userId})).rows;
    let allowedActions = resp.map(row => row.feature_name);
    let groupIds = resp.map(row => row.group_id);
    return {
      allowedActions: [...new Set(allowedActions)], // return only unique values (remove duplicates). See https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
      groupIds: [...new Set(groupIds)], // return only unique values (remove duplicates)
    };
  } catch (err) {
    console.log('[getAllowedActions] ERROR: ', err);
    throw err;
  }
};

/**
 * Sync the locally-stored user/group data with up-to-date data from Google Groups
 * 
 * @param {Array[String]} groupIds
 * @param {String} accessToken: Oauth2 Access token
 * 
 * @return [nothing]
 */
const updateUserGroups = (db) => async (userId, groupIds, accessToken) => {

  let gAdminClient;
  let newGroups;
  try {
    gAdminClient = getGAdminClient(accessToken);

    // Remove user from old groups
    await db.raw(`DELETE FROM group_users WHERE user_id = :userId;`, {userId: userId});
    // Convert a list of group ids to a list of {group ids & group keys}
    newGroups = await appendKeysToIds(db, groupIds);
    // console.log("newGroups")
    // console.log(newGroups)
  } catch(err) {
    console.error(err);
    throw err;
  }
    
  for (let g = 0; g < newGroups.length; g++) {
    const {id: groupId, group_key: groupKey} = newGroups[g];
    try {
      // Get up-to-date information for the current group (membership information) from Google Groups
      let resultList = await gAdminClient.members.list({ 
          groupKey: groupKey
      });

      db.transaction(function(trx) {
        db('group_users')
          .where('group_id', groupId)  
          .del()
          .transacting(trx)
          .then(function() {
            // Fill the group_users table with up-to-date membership info.
            const memberIds = resultList.data.members.map(member => member.id);
            // console.log("memberIds");
            // console.log(memberIds);

            if (memberIds && memberIds.length > 0) {
              return db('group_users')
                .insert(memberIds.map(m_Id => { return {user_id: m_Id, group_id: groupId}} ))
                .transacting(trx);
            }
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .then(function() {
        console.log("Successfully updated Google Groups membership info for group: " + groupKey);
      })
      .catch(async function(error) {
        console.error(`Error: Failed to update group_users table for group: ${groupKey}. `, error); 
        console.log('Skipping Group: ' + groupKey);
        try {
          await db.raw(`INSERT INTO group_users (user_id, group_id) VALUES (:userId, :groupId);`, {userId: userId, groupId: groupId});
        } catch (e) {
          console.error(e);
        }
      });
    } catch(err) {
      console.error(err);
      console.log('Skipping update for Group: ' + groupKey);
    }
  }
  return {groupIds: groupIds};
}

export default (db) => ({
  getAllowedActions: getAllowedActions(db),
  updateUserGroups: updateUserGroups(db),
});