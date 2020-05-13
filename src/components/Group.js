import React from "react";
import GroupMember from "./GroupMember";
import { connect } from "react-redux";
import { addToGroup, addToUser } from "../actions";

class Group extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
    };
  }

  handleName = (e) => {
    const { value } = e.target;
    this.setState({ name: value });
  };

  validateGroupMember = () => {
    const { groups } = this.props;
    const name = this.state.name.trim();
    const allUsers = groups.find((group) => group.groupName === "General")
      .groupMembers;
    const groupMembers = groups.find(
      (group) => group.groupName === this.props.groupName
    ).groupMembers;
    if (name === "") {
      alert("User name is blank");
    } else if (groupMembers.indexOf(name) !== -1) {
      alert("This group already has this user!");
    } else if (allUsers.indexOf(name) === -1) {
      alert("Please add this new user!");
    } else {
      this.addToGroupMember();
    }
  };

  addToGroupMember = () => {
    this.props.addToGroup(this.props.groupName, this.state.name);
    this.props.addToUser(this.state.name, this.props.groupName);
    this.setState({ name: "" });
  };

  removeFromGroup = (e) => {
    const { value } = e.target;
    debugger;
    this.props.deleteFromGroup(value, this.props.groupName);
    this.props.deleteFromUser(this.props.groupName, value);
  };

  render() {
    return (
      <div className="Group Block">
        <div className="GroupInfo Unit">
          {!(this.props.groupName === "General") && (
            <button
              onClick={this.props.deleteGroup}
              value={this.props.groupName}
            >
              -
            </button>
          )}
          <div className="GroupName">{this.props.groupName}</div>
          <div className="GroupMembers Listname">Members </div>
          {this.props.groupMembers.map((name, i) => (
            <GroupMember
              key={i}
              name={name}
              group={this.props.groupName}
              removeFromGroup={this.props.removeFromGroup}
            />
          ))}
          {!(this.props.groupName === "General") && (
            <section className="AddToGroup AddTo">
              <input
                className={"addToGroupMember"}
                value={this.state.name}
                onChange={this.handleName}
              />
              <button onClick={() => this.validateGroupMember()}>+</button>
            </section>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  groups: state.groups,
});

const mapDispatchToProps = (dispatch) => ({
  addToGroup: (groupName, newUserName) =>
    dispatch(addToGroup(groupName, newUserName)),
  addToUser: (userName, newGroupName) =>
    dispatch(addToUser(userName, newGroupName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Group);
