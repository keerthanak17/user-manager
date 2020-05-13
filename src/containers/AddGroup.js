import React from "react";

import { connect } from "react-redux";
import { addUser, addToUser, addGroup, addToGroup } from "../actions";

class AddGroup extends React.Component {
  constructor() {
    super();

    this.state = {
      name: "",
      members: [],
    };
  }

  cleanNewGroup = () => {
    this.setState({
      name: "",
      members: [],
    });
  };

  handleGroupName = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  handleGroupMembers = (e) => {
    const { value } = e.target;
    this.setState({ members: value.split(",") });
  };

  validateGroup = () => {
    const name = this.state.name;
    const allGroups = this.props.users.find((user) => user.userName === "Admin")
      .userGroups;
    if (allGroups.indexOf(name) !== -1) {
      alert("This group already exists!");
      this.cleanNewGroup();
    } else if (this.state.name === "") {
      alert("Please give a group name");
    } else {
      this.processGroup();
    }
  };

  processGroup = () => {
    const values = this.state.members;
    const allUsers = this.props.groups.find(
      (group) => group.groupName === "General"
    ).groupMembers;
    values.map((val) =>
      allUsers.indexOf(val.trim()) === -1
        ? this.addNewUser(val)
        : this.props.addToUser(val, this.state.name)
    );
    if (values.indexOf("Admin") === -1) {
      values.push("Admin");
    }
    this.setState({ members: values });
    this.addGroup();
  };

  addGroup = () => {
    this.props.addGroup(this.state.name, this.state.members);
    this.props.addToUser("Admin", this.state.name);
    this.cleanNewGroup();
  };

  addNewUser = (newUserName) => {
    const name = this.state.name;
    this.props.addUser(newUserName, ["General", name]);
    this.props.addToGroup("General", newUserName);
  };

  render() {
    return (
      <section className="AddGroup Block">
        <button onClick={() => this.validateGroup()}>+</button>
        <div className="Headline">Add a new group</div>
        {"Name   : "}
        <input
          className="groupName"
          onChange={this.handleGroupName}
          value={this.state.name}
        />{" "}
        <br />
        {"Members : (Separated by commas) "}
        <input
          className="memberNames List"
          onChange={this.handleGroupMembers}
          value={this.state.members}
        />{" "}
        <br />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups,
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  addUser: (userName, userGroups) => dispatch(addUser(userName, userGroups)),
  addToUser: (userName, newGroupName) =>
    dispatch(addToUser(userName, newGroupName)),
  addGroup: (groupName, groupMembers) =>
    dispatch(addGroup(groupName, groupMembers)),
  addToGroup: (groupName, newUserName) =>
    dispatch(addToGroup(groupName, newUserName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddGroup);
