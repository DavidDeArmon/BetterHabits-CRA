import React,{Component} from 'react'
import {getMoods} from '../../ducks/moodReducer'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'
import '../CSS/MoodDash.scss'


class Moods extends Component{
    componentDidMount(){
        this.props.getMoods()
    }
    applyColor(mood,key){
        var style='noData';
        if (mood.mood==='Great'){style='Great'}
        if (mood.mood==='Good'){style='Good'}
        if (mood.mood==='Meh'){style='Meh'}
        if (mood.mood==='Bleh'){style='Bleh'}
        if (mood.mood==='Bad'){style='Bad'}
        return <div key = {key} className='box' id ={style}>{}</div>
    }
    days(startDay,endDay,moods){
        var start = new Date(startDay)
        var end= new Date(endDay)
        var loop = new Date(start)
        let index = 0
        let newArr=[]
        let findMoodIndex = (element)=>{return element===`${loop}`}
        //creates array of dates from moods
        let moodDates = moods.map(e=>`${new Date(e.date)}`)
           //loops through provided dates and fills in data found or not found
        while(loop<=end){
            var newDate = loop.setDate(loop.getDate()+1)
            loop= new Date(newDate)
            loop.setHours(0,0,0,0)
            let dateIndex = moodDates.findIndex(e=>findMoodIndex(e))
            if(dateIndex===-1){
                newArr.push(<div className='box' id='noData' key = {index++}>{}</div>)
            }else{
                // let date = new Date(moods[dateIndex].date)
                newArr.push(this.applyColor(moods[dateIndex],index++))
                // newArr.push(<div key = {index++}>{` DATA FOUND ${date}`}</div>)
            }
        }
        return newArr
    }
    render(){
        return(
            <div className = 'moodDash'>
                <div className='dashboardHeader'>
                    <Link className="Link" to='/'>Dashboard</Link>
                    <Link className="Link" to='/moods'>Moods</Link>
                    <Link className="Link" to='/habits'>Habits</Link>
                </div>
                <div className = 'moodDashCard'>
                <h1>Moods</h1>
                {this.days('2018-09-12','2018-10-11',this.props.moodReducer.moodsArr)}
                </div>
            </div>
        )
    }
}

export default connect(state=>state,{getMoods})(Moods)