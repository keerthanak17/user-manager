import React from "react";
import UserGroup from "./UserGroup";
import { connect } from "react-redux";
import { addToUser, addToGroup } from "../actions";

class User extends React.Component {
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

  validateUserGroup = () => {
    const { users } = this.props;
    const name = this.state.name.trim();
    const allGroups = users.find((user) => user.userName === "Admin")
      .userGroups;
    const userGroups = users.find(
      (user) => user.userName === this.props.userName
    ).userGroups;
    if (name === "") {
      alert("User name is blank");
    } else if (userGroups.indexOf(name) !== -1) {
      alert("This user is already a part of this group!");
    } else if (allGroups.indexOf(name) === -1) {
      alert("Please add this new group!");
    } else {
      this.addToUserGroup();
    }
  };

  addToUserGroup = () => {
    this.props.addToUser(this.props.userName, this.state.name);
    this.props.addToGroup(this.state.name, this.props.userName);
    this.setState({ name: "" });
  };

  render() {
    return (
      <div className="User Block">
        <div className="UserPersonal Unit">
          {!(this.props.userName === "Admin") && (
            <button onClick={this.props.deleteUser} value={this.props.userName}>
              -
            </button>
          )}
          <div className="UserName">{this.props.userName}</div>
          <div className="UserGroups Listname">Groups </div>
          {this.props.userGroups.map((name, i) => (
            <UserGroup
              key={i}
              name={name}
              user={this.props.userName}
              removeFromUser={this.props.removeFromUser}
            />
          ))}
          {!(this.props.userName === "Admin") && (
            <section className="AddToUser AddTo">
              <input
                className={"addToUserGroup"}
                value={this.state.name}
                onChange={this.handleName}
              />
              <button onClick={() => this.validateUserGroup()}>+</button>
            </section>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  addToUser: (userName, newGroupName) =>
    dispatch(addToUser(userName, newGroupName)),
  addToGroup: (groupName, newUserName) =>
    dispatch(addToGroup(groupName, newUserName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(User);
