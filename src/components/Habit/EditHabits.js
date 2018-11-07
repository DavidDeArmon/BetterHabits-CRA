import React,{Component} from 'react'
import { connect } from 'react-redux';
import {updateHabit,deleteHabit} from '../../ducks/habitReducer'
import '../CSS/HabitDash.scss'


class EditHabit extends Component{
    constructor(){
        super()
        this.state={
            name:'',
            desc:'',
        }
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        const {habits} = this.props.habitReducer
        const {uid} = this.props.firebase.auth
        let displayHabits = habits.map((habit,idx)=>{
         return(   <div key={idx}>
                <h3>{habit.habit_name}</h3>
                <h4>{habit.habit_desc}</h4>
                <input placeholder={habit.habit_name} name='name'onChange={this.handleChange} ></input>
                <input placeholder={habit.habit_desc} name='desc'onChange={this.handleChange} ></input>
                <div>
                <button onClick={()=>this.props.updateHabit(habit.id,this.state.name,this.state.desc,uid)}>Submit Change</button>
                <button onClick={()=>this.props.deleteHabit(uid,habit.id)}>Delete Habit</button>

                </div>
            </div>)
        })
        return(            
                <div className='habitDashCard' id='editHabit'>
                  <h1>Edit Habits</h1>
                  {displayHabits}
                </div>
        )
    }
}

export default connect(state=>state,{updateHabit,deleteHabit})(EditHabit)