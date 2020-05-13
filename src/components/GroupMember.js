import React from "react";

class GroupMember extends React.Component {
  render() {
    return (
      <div className="GroupMember">
        {"  -  " + this.props.name + " "}
        {!(this.props.name === "Admin") && !(this.props.group === "General") && (
          <button
            onClick={this.props.removeFromGroup}
            value={this.props.name}
            data-group={this.props.group}
          >
            -
          </button>
        )}
      </div>
    );
  }
}

export default GroupMember;
