import { initialGroups } from "./initialData";

const groups = (state = initialGroups, action) => {
  switch (action.type) {
    case "ADD_GROUP": {
      return [
        ...state,
        {
          groupId: action.groupId,
          groupName: action.groupName,
          groupMembers: action.memberNames,
        },
      ];
    }

    case "ADD_TO_GROUP": {
      return addToGroup(state, action.groupName, action.newUserName);
    }

    case "DELETE_FROM_GROUP": {
      return deleteFromGroup(state, action.groupName, action.userName);
    }

    case "REMOVE_GROUP": {
      return state.filter((group) => group.groupName !== action.groupName);
    }

    default:
      return state;
  }
};

export default groups;

export const addToGroup = (currentState, groupName, newUserName) => {
  currentState
    .find((a) => a.groupName === groupName)
    .groupMembers.push(newUserName);
  return currentState;
};

export const deleteFromGroup = (currentState, groupName, userName) => {
  const updatedGroup = currentState
    .find((a) => a.groupName === groupName)
    .groupMembers.filter((a) => a !== userName);
  currentState.find(
    (a) => a.groupName === groupName
  ).groupMembers = updatedGroup;
  return currentState;
};
