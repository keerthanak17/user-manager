import { initialUsers } from "./initialData";

const users = (state = initialUsers, action) => {
  switch (action.type) {
    case "ADD_USER": {
      return [
        ...state,
        {
          userName: action.userName,
          userId: action.userId,
          userGroups: action.groupNames,
        },
      ];
    }

    case "ADD_TO_USER": {
      return addToUser(state, action.userName, action.newGroupName);
    }

    case "DELETE_FROM_USER": {
      return deleteFromUser(state, action.userName, action.groupName);
    }

    case "REMOVE_USER": {
      return state.filter((user) => user.userName !== action.userName);
    }

    default:
      return state;
  }
};

export default users;

export const addToUser = (currentState, userName, newGroupName) => {
  currentState
    .find((a) => a.userName === userName)
    .userGroups.push(newGroupName);
  return currentState;
};

export const deleteFromUser = (currentState, userName, groupName) => {
  const updatedUser = currentState
    .find((a) => a.userName === userName)
    .userGroups.filter((a) => a !== groupName);
  currentState.find((a) => a.userName === userName).userGroups = updatedUser;
  return currentState;
};
