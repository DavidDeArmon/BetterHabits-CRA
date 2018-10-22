import React,{Component} from 'react'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import {habitDays,getHabits} from '../../ducks/habitReducer'
import '../CSS/HabitDash.scss'
import NewHabit from './NewHabit';
import EditHabits from './EditHabits';


class Habits extends Component{
    componentDidMount(){
        const {auth} = this.props.firebase
        console.log('didMount',auth.uid,this.props.habitReducer.user_id)
        if(auth.uid){
            this.props.habitDays(auth.uid,'2018-09-11','2018-10-11')
            this.props.getHabits(auth.uid)
        }
    
    }
    componentDidUpdate(prevProps){
        const {auth} = this.props.firebase
        console.log('didUpdate',auth.uid,this.props.habitReducer.user_id)
        if(auth!==prevProps.firebase.auth){
            if(auth.uid){
                this.props.habitDays(auth.uid,'2018-09-11','2018-10-11')
                this.props.getHabits(auth.uid)
            }
        }
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
                newArr.push(<div className='box' id='noData'  key = {index++}>{}</div>)
            }else{
                // let date = new Date(habitDays[dateIndex].date)
                newArr.push(<div className='box' id='dataFound' key = {index++}>{}</div>)
            }
        }
        return newArr
    }

    render(){
        var {habitDays,habits} = this.props.habitReducer
        var habitDisplay=[];    
        //establish array of subscribed habits and include the result of days function
       habits.forEach((habit,idx)=>{
              habitDisplay.push(<div className='habitCard' key = {idx}>
              <h2>{habit.habit_name}</h2>
              {this.days('2018-09-12','2018-10-11',habitDays.data,habit.id)}
              </div>)
            })
           
                
        return(
            
            <div className = 'habitDash'>
                <div className='dashboardHeader'>
                    <Link className="Link" to='/'>Dashboard</Link>
                    <Link className="Link" to='/moods'>Moods</Link>
                    <Link className="Link" to='/habits'>Habits</Link>
                </div>
                <div className='habitDashCard'>
                    <h1>Habits</h1>
                    {habitDisplay}
                </div>
                <NewHabit/>
                <EditHabits/>
            </div>
        )
    }
}

export default connect(state=>state,{habitDays,getHabits})(Habits)