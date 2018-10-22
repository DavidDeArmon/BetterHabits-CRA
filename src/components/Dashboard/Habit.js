import React,{Component} from 'react'
import {getHabits,recordHabit,checkHabit} from '../../ducks/habitReducer'
import {connect} from 'react-redux'

class Habit extends Component{
    componentDidUpdate(prevProps){
        const {auth} = this.props.firebase
        if(auth!==prevProps.firebase.auth){
            if(auth.uid){
                console.log('didUpdate: ',auth.uid)
                this.props.getHabits(auth.uid)
                this.props.checkHabit(auth.uid)
            }
        }
    }
render(){
        const {habits,checkedHabits} = this.props.habitReducer
        const habitIDs = checkedHabits.map(e=>e.habit_id)
        const displayHabits = habits.map((e,i)=>{
            var submitted;
            if(habitIDs.includes(e.id)){
                submitted = <h3>Done!</h3>
            }else{
                submitted=<button onClick={()=>this.props.recordHabit(e.id)}>Completed today?</button>
            }
          return(  <div key={i}>
                <h2>{e.habit_name}</h2>
                <h3>{e.habit_desc}</h3>
                {submitted}
            </div>
          )
        })
    return(
        <div className="Card">
            <h1 className="Header">Habits</h1>
            {displayHabits}
        </div>
    )
}
}

export default connect(state=>state,{getHabits,recordHabit,checkHabit})(Habit)
