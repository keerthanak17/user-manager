import React from "react";
import { connect } from "react-redux";
import { deleteFromGroup, deleteFromUser, removeUser } from "../actions";

import User from "./User.js";
import AddUser from "../containers/AddUser";

class Users extends React.Component {
  removeFromUser = (e) => {
    const { value } = e.target;
    const { user } = e.target.dataset;
    this.props.deleteFromUser(value, user);
    this.props.deleteFromGroup(user, value);
  };

  deleteUser = (e) => {
    const { value } = e.target;
    const userGroups = this.props.users.find((user) => user.userName === value)
      .userGroups;
    userGroups.forEach((group) => {
      this.props.deleteFromGroup(value, group);
    });
    this.props.removeUser(value);
  };

  render() {
    return (
      <div className="Users">
        <div className="MainHeader">User List</div>
        {this.props.users.map((user) => (
          <User
            key={user.userId}
            userName={user.userName}
            userGroups={user.userGroups}
            removeFromUser={this.removeFromUser}
            deleteUser={this.deleteUser}
          />
        ))}
        <AddUser />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFromUser: (groupName, userName) =>
    dispatch(deleteFromUser(groupName, userName)),
  deleteFromGroup: (userName, groupName) =>
    dispatch(deleteFromGroup(userName, groupName)),
  removeUser: (userName) => dispatch(removeUser(userName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
