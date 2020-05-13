import React from "react";
import { connect } from "react-redux";
import { deleteFromGroup, deleteFromUser, removeGroup } from "../actions";

import Group from "./Group.js";
import AddGroup from "../containers/AddGroup.js";

class Groups extends React.Component {
  removeFromGroup = (e) => {
    const { value } = e.target;
    const { group } = e.target.dataset;
    this.props.deleteFromGroup(value, group);
    this.props.deleteFromUser(group, value);
  };

  deleteGroup = (e) => {
    const { value } = e.target;
    const groupMembers = this.props.groups.find(
      (group) => group.groupName === value
    ).groupMembers;
    groupMembers.forEach((user) => {
      this.props.deleteFromUser(value, user);
    });
    this.props.removeGroup(value);
  };

  render() {
    return (
      <div className="Groups">
        <div className="MainHeader">Group List</div>
        {this.props.groups.map((group) => (
          <Group
            key={group.groupId}
            groupName={group.groupName}
            groupMembers={group.groupMembers}
            removeFromGroup={this.removeFromGroup}
            deleteGroup={this.deleteGroup}
          />
        ))}
        <AddGroup />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups,
});

const mapDispatchToProps = (dispatch) => ({
  deleteFromUser: (groupName, userName) =>
    dispatch(deleteFromUser(groupName, userName)),
  deleteFromGroup: (userName, groupName) =>
    dispatch(deleteFromGroup(userName, groupName)),
  removeGroup: (userName) => dispatch(removeGroup(userName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
