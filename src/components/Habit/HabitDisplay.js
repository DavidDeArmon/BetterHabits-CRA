import React, { Component } from "react";
import { connect } from "react-redux";
import { habitDays, getHabits } from "../../ducks/habitReducer";

class HabitDisplay extends Component {
  days(startDay, endDay, habitDays, habitID) {
    var start = new Date(startDay);
    var end = new Date(endDay);
    var loop = new Date(start);
    let index = 0;
    let newArr = [];
    let findHabitIndex = element => {
      return element === `${loop}`;
    };
    //creates array of dates from habits with applicable id
    let habitDates = habitDays.map(e => {
      if (e.id === habitID) {
        return `${new Date(e.date)}`;
      } else {
        return null;
      }
    });
    //loops through provided dates and fills in data found or not found
    while (loop <= end) {
      var newDate = loop.setDate(loop.getDate() + 1);
      loop = new Date(newDate);
      loop.setHours(0, 0, 0, 0);
      let dateIndex = habitDates.findIndex(e => findHabitIndex(e));
      if (dateIndex === -1) {
          if(this.props.habitReducer.detailed){
            newArr.push(<div className="box" id="noData" key={index++}>{loop.getMonth()+1}/{loop.getDate()}</div>);
          }else{
            newArr.push(<div className="box" id="noData" key={index++}></div>);
          }
      } else {
          if(this.props.habitReducer.detailed){
            newArr.push(<div className="box" id="dataFound" key={index++}>{loop.getMonth()+1}/{loop.getDate()}</div>);
          }else{
             newArr.push(<div className="box" id="dataFound" key={index++}></div>);
          }
      }
    }
    return newArr;
  }
  render() {
    var { habitDays, habits} = this.props.habitReducer;
    var {startDate,endDate} = this.props.moodReducer
    var habitDisplay = [];
    //establish array of subscribed habits and include the result of days function
    habits.forEach((habit, idx) => {
      habitDisplay.push(
        <div className="habitCard" key={idx}>
          <h2>{habit.habit_name}</h2>
          {this.days(startDate, endDate, habitDays.data, habit.id)}
        </div>
      );
    });
    return <div className="habitDisplay">{habitDisplay}</div>;
  }
}
export default connect(state=>state,{habitDays,getHabits})(HabitDisplay)
