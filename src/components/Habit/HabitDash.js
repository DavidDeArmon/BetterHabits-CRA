import React, { Component } from "react";
import { connect } from "react-redux";
import { habitDays, getHabits,toggleDetailed } from "../../ducks/habitReducer";
import "../CSS/HabitDash.scss";
import Header from '../Header/Header'
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
      <Header/>
        <div className="habitDashCard">
          <h1>Habits</h1>
          <div className="DateChange">
            <DateChange />
            <div className='pretty p-default'>
              <input id="details" type="checkbox" onChange={this.props.toggleDetailed} checked = {this.props.habitReducer.detailed}/>
              <div className='state'>
                <label>Detailed view: </label>
              </div>
            </div>    
          </div>
          <HabitDisplay />
        </div>
        <div className='habitcontainer'>
          <NewHabit />
          <EditHabits />
        </div>
      </div>
    );
  }
}
export default connect(state=>state,{habitDays,getHabits,toggleDetailed})(Habits)