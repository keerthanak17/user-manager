let nextUserId = 3;
let nextGroupId = 3;

export const addUser = (userName, groupNames) => ({
  type: "ADD_USER",
  userId: "u" + nextUserId++,
  userName,
  groupNames,
});

export const addGroup = (groupName, memberNames) => ({
  type: "ADD_GROUP",
  groupId: "g" + nextGroupId++,
  groupName,
  memberNames,
});

export const removeUser = (userName) => ({
  type: "REMOVE_USER",
  userName,
});

export const removeGroup = (groupName) => ({
  type: "REMOVE_GROUP",
  groupName,
});

export const addToUser = (userName, newGroupName) => ({
  type: "ADD_TO_USER",
  userName,
  newGroupName,
});

export const addToGroup = (groupName, newUserName) => ({
  type: "ADD_TO_GROUP",
  groupName,
  newUserName,
});

export const deleteFromUser = (groupName, userName) => ({
  type: "DELETE_FROM_USER",
  groupName,
  userName,
});

export const deleteFromGroup = (userName, groupName) => ({
  type: "DELETE_FROM_GROUP",
  userName,
  groupName,
});
