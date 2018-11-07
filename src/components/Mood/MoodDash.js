import React,{Component} from 'react'
import {getMoods} from '../../ducks/moodReducer'
import {toggleDetailed} from '../../ducks/habitReducer'
import { connect } from 'react-redux';
import '../CSS/MoodDash.scss'
import Header from '../Header/Header'
import DateChange from '../DateChange/DateChange';
import Mood from '../Dashboard/Mood'


class Moods extends Component{
    componentDidMount(){
        const {auth} = this.props.firebase
        if(auth.uid){
            this.props.getMoods(auth.uid)
        }    
    }
    componentDidUpdate(prevProps){
        const {auth} = this.props.firebase
        if(auth!==prevProps.firebase.auth){
            if(auth.uid){
                this.props.getMoods(auth.uid)
            }
        }
    }
    applyColor(mood,key,date){
        var style='noData';
        if (mood.mood==='Great'){style='Great'}
        if (mood.mood==='Good'){style='Good'}
        if (mood.mood==='Meh'){style='Meh'}
        if (mood.mood==='Bleh'){style='Bleh'}
        if (mood.mood==='Bad'){style='Bad'}
        if(this.props.habitReducer.detailed){
            return <div key = {key} className='detailed box' id ={style}>
                <span>{date.slice(0,15)}, Mood: {mood.mood} Activities: {mood.activities}</span>
            </div>
        }else{
            return <div key = {key} className='box' id ={style}>{}</div>
        }
    }
    days(startDay,endDay,moods){
        let start = new Date(startDay)
        let end= new Date(endDay)
        let loop = new Date(start)
        let index = 0
        let newArr=[]
        function findMoodIndex(element){return element===`${loop}`}
        //creates array of dates from moods
        let moodDates = moods.map(function(e){return `${new Date(e.date)}`})
           //loops through provided dates and fills in data found or not found
        while(loop<=end){
            var newDate = loop.setDate(loop.getDate()+1)
            loop= new Date(newDate)
            loop.setHours(0,0,0,0)
            let dateIndex = moodDates.findIndex(function(e){return findMoodIndex(e)})
            if(dateIndex===-1){
                if(this.props.habitReducer.detailed){
                    newArr.push(<div className='box detailed' id='noData' key = {index++}><span>{loop.toString().slice(0,15)}</span></div>)
                }else{
                    newArr.push(<div className='box' id='noData' key = {index++} >{}</div>)
                }
            }else{
                newArr.push(this.applyColor(moods[dateIndex],index++,moodDates[dateIndex]))
            }
        }
        return newArr
    }
    render(){
        const{startDate,endDate} = this.props.moodReducer
        return(
            <div className = 'moodDash'>
                <Header/>
                <Mood/>
                <div className = 'moodDashCard'>
                    <h1>Moods</h1>
                    <DateChange/>
                    <div className='pretty p-default'>
                        <input id="details" type="checkbox" onChange={this.props.toggleDetailed} checked = {this.props.habitReducer.detailed}/>
                        <div className='state'>
                            <label>Detailed view: </label>
                        </div>
                    </div>
                    <div className='boxContainer'>
                        {this.days(startDate,endDate,this.props.moodReducer.moodsArr)}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(state=>state,{getMoods,toggleDetailed})(Moods)