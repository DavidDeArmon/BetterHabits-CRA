import React,{Component} from 'react'
import { connect } from 'react-redux';
import {createHabit} from '../../ducks/habitReducer'
import '../CSS/HabitDash.scss'


class NewHabit extends Component{
    constructor(){
        super()
        this.state={
        name:'',
        desc:''
        }
    }
    handleChange=(event)=>{
        this.setState({[event.target.name]:event.target.value})
    }
    render(){
        const {auth} = this.props.firebase
        return(            
                <div className='habitDashCard' id='newHabit'>
                    <h1>New Habit</h1>
                    <input onChange={this.handleChange} placeholder="Title..." name='name' value={this.state.name}></input>
                    <input onChange={this.handleChange} placeholder="Description" name='desc' value={this.state.desc}></input>
                    <button onClick={()=>this.props.createHabit(auth.uid,this.state.name,this.state.desc)}>Add</button>
                </div>
        )
    }
}

export default connect(state=>state,{createHabit})(NewHabit)