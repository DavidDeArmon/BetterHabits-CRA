import React,{Component} from 'react'
import {getHabits,recordHabit,checkHabit} from '../../ducks/habitReducer'
import {connect} from 'react-redux'

class Habit extends Component{
render(){
        const {habits,checkedHabits} = this.props
        const {uid} = this.props
        const habitIDs = checkedHabits.map(e=>e.habit_id)
        var display = undefined;
        const displayHabits = habits.map((e,i)=>{
            var submitted;
            if(habitIDs.includes(e.id)){
                submitted = <h3>Done!</h3>
            }else{
                submitted=<button onClick={()=>this.props.recordHabit(uid,e.id)}>Completed today?</button>
            }
          return(  <div key={i} className="habitCard">
                <h2>{e.habit_name}</h2>
                <h3>{e.habit_desc}</h3>
                {submitted}
            </div>
          )
        })
        const displayNone = <div>
            <h2>No Habits Found!</h2>
            <h4>If you want to add a new habit to track simply add one on the Habit tab.</h4>
            </div>;
        //if no habits then display None, if habits exist then display them.
        habits[0]?display=displayHabits:display=displayNone;
    return(
        <div className="Card">
            <h1 className="Header">Habits</h1>
            {display}
        </div>
    )
}
}
const mapStateToProps = props =>{
  return{
    habits:props.habitReducer.habits,
    checkedHabits:props.habitReducer.checkedHabits
  }
}
export default connect(mapStateToProps,{getHabits,recordHabit,checkHabit})(Habit)
