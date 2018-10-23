import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { habitDays, getHabits,toggleDetailed } from "../../ducks/habitReducer";
import "../CSS/HabitDash.scss";
import NewHabit from "./NewHabit";
import EditHabits from "./EditHabits";
import HabitDisplay from "./HabitDisplay";
import DateChange from "../DateChange/DateChange";

class Habits extends Component {
  componentDidMount() {
    const { auth } = this.props.firebase;
    const { startDate, endDate } = this.props.moodReducer;
    if (auth.uid) {
      this.props.habitDays(auth.uid, startDate, endDate);
      this.props.getHabits(auth.uid);
    }
  }
  componentDidUpdate(prevProps) {
    const { auth } = this.props.firebase;
    const { startDate, endDate } = this.props.moodReducer;
    if (auth !== prevProps.firebase.auth) {
      if (auth.uid) {
        this.props.habitDays(auth.uid, startDate, endDate);
        this.props.getHabits(auth.uid);
      }
    }
  }
  render() {
    return (
      <div className="habitDash">
        <div className="dashboardHeader">
          <Link className="Link" to="/">
            Dashboard
          </Link>
          <Link className="Link" to="/moods">
            Moods
          </Link>
          <Link className="Link" to="/habits">
            Habits
          </Link>
        </div>
        <div className="habitDashCard">
          <h1>Habits</h1>
          <div className="DateChange">
            <DateChange />
            <h4>Detailed view: </h4>
            <input id="details" type="checkbox" onChange={this.props.toggleDetailed} checked = {this.props.habitReducer.detailed}/>          
          </div>
          <HabitDisplay />
        </div>
        <NewHabit />
        <EditHabits />
      </div>
    );
  }
}
export default connect(state=>state,{habitDays,getHabits,toggleDetailed})(Habits)