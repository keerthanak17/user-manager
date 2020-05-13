import React from "react";

class UserGroup extends React.Component {
  render() {
    return (
      <div className="UserGroup">
        {"  -  " + this.props.name + " "}
        {!(this.props.name === "General") && !(this.props.user === "Admin") && (
          <button
            onClick={this.props.removeFromUser}
            value={this.props.name}
            data-user={this.props.user}
          >
            -
          </button>
        )}
      </div>
    );
  }
}

export default UserGroup;
