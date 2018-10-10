import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {habitDays,getHabits} from '../ducks/habitReducer'


class Habits extends Component{
    componentDidMount(){
        this.props.habitDays('2018-09-10','2018-10-10')
        this.props.getHabits()
    }
    days(startDay,endDay,habitDays,habitID){
        var start = new Date(startDay)
        var end= new Date(endDay)
        var loop = new Date(start)
        let index = 0
        let newArr=[]
        let findHabitIndex = (element)=>{return element===`${loop}`}
        //creates array of dates from habits with applicable id
        let habitDates = habitDays.map(e=>{
            if(e.id===habitID){
                return `${new Date(e.date)}`
            }else{return null}
           })
           //loops through provided dates and fills in data found or not found
        while(loop<=end){
            var newDate = loop.setDate(loop.getDate()+1)
            loop= new Date(newDate)
            loop.setHours(0,0,0,0)
            let dateIndex = habitDates.findIndex(e=>findHabitIndex(e))
            if(dateIndex===-1){
                newArr.push(<div key = {index++}>{`NO DATA ${loop}`}</div>)
            }else{
                let date = new Date(habitDays[dateIndex].date)
                newArr.push(<div key = {index++}>{` DATA FOUND ${date}`}</div>)
            }
        }
        return newArr
    }

    render(){
        var {habitDays,habits} = this.props.habitReducer
        var habitDisplay=[];    
        //establish array of subscribed habits and include the result of days function
       habits.forEach((habit,idx)=>{
              habitDisplay.push(<div key = {idx}>
              <h2>{habit.habit_name}</h2>
              {this.days('2018-09-10','2018-10-10',habitDays.data,habit.id)}
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