import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {habitDays,getHabits} from '../ducks/habitReducer'


class Habits extends Component{
    componentDidMount(){
        this.props.habitDays('2018-10-01','2018-10-30')
        this.props.getHabits()
    }
    render(){
        var {habitDays,habits} = this.props.habitReducer
        var habitDisplay=[];
        console.log(habits)
        console.log(habitDays)
        //establish 30 days of divs
         var thirtyDays = [];
        for(let i = 0;i<31;i++){
            thirtyDays.push(<div key={i}>{i}</div>)
        }
        //establish array of subscribed habits and include 30 days
       habits.forEach((habit,idx)=>{
              habitDisplay.push(<div key = {idx}>
              {habit.habit_name}
              {thirtyDays}
              </div>)
            })
           
                
        return(
            <div className = 'habitDash'>
            <h1>Habits</h1>
            <Link to ='/'>Back</Link>
            {habitDisplay}
            </div>
        )
    }
}

export default connect(state=>state,{habitDays,getHabits})(Habits)