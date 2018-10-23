import React, { Component } from "react";
import { connect } from "react-redux";
import { setDate } from "../../ducks/moodReducer";

class DateChange extends Component {
  constructor() {
    super();
    let today = new Date();
    this.state = {
      endDate: today.toISOString().slice(0, 10)
    };
  }
  handleDateChange = event => {
    this.setState({ endDate: event.target.value });
  };
  render() {
    return (
      <div className="DateChange">
        <h4>Filter Date:</h4>
        <input value={this.state.endDate} onChange={this.handleDateChange} />
        <button
          onClick={() => {
            this.props.setDate(this.state.endDate);
          }}
        >
          Update
        </button>
      </div>
    );
  }
}
export default connect(state=>state,{setDate})(DateChange)