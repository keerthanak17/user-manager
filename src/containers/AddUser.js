import React from "react";

import { connect } from "react-redux";
import { addUser, addToUser, addGroup, addToGroup } from "../actions";

class AddUser extends React.Component {
  constructor(props) {
    super(props);

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

  handleUserName = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  handleUserMembers = (e) => {
    const { value } = e.target;
    this.setState({ members: value.split(",") });
  };

  validateUser = () => {
    const name = this.state.name;
    const allUsers = this.props.groups.find(
      (group) => group.groupName === "General"
    ).groupMembers;
    if (allUsers.indexOf(name) !== -1) {
      alert("This user already exists!");
      this.cleanNewGroup();
    } else if (this.state.name === "") {
      alert("Please give a user name");
    } else {
      this.processUser();
    }
  };

  processUser = () => {
    const values = this.state.members;
    const allGroups = this.props.users.find((user) => user.userName === "Admin")
      .userGroups;

    values.map((val) =>
      allGroups.indexOf(val.trim()) === -1
        ? this.addNewGroup(val)
        : this.props.addToGroup(val, this.state.name)
    );
    if (values.indexOf("General") === -1) {
      values.push("General");
    }
    this.setState({ members: values });
    this.addUser();
  };

  addUser = () => {
    this.props.addUser(this.state.name, this.state.members);
    this.props.addToGroup("General", this.state.name);
    this.cleanNewGroup();
  };

  addNewGroup = (newGroupName) => {
    const name = this.state.name;
    this.props.addGroup(newGroupName, ["Admin", name]);
    this.props.addToUser("Admin", newGroupName);
  };

  render() {
    return (
      <section className="AddUser Block">
        <button onClick={() => this.validateUser()}>+</button>
        <div className="Headline">Add a new user</div>
        {"Name   : "}
        <input
          className="userName"
          onChange={this.handleUserName}
          value={this.state.name}
        />{" "}
        <br />
        {"Groups : (Separated by commas) "}
        <input
          onChange={this.handleUserMembers}
          value={this.state.members}
        />{" "}
        <br />
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
  groups: state.groups,
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

export default connect(mapStateToProps, mapDispatchToProps)(AddUser);
