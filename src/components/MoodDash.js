import React,{Component} from 'react'
import {getMoods} from '../ducks/moodReducer'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


class Moods extends Component{
    componentDidMount(){
        this.props.getMoods()
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
                newArr.push(<div key = {index++}>{`NO DATA ${loop}`}</div>)
            }else{
                let date = new Date(moods[dateIndex].date)
                newArr.push(<div key = {index++}>{` DATA FOUND ${date}`}</div>)
            }
        }
        return newArr
    }
    render(){
        return(
            <div className = 'moodDash'>
            <h1>Moods</h1>
             <Link to ='/'>Back</Link>
             {this.days('2018-09-10','2018-10-10',this.props.moodReducer.moodsArr)}
            </div>
        )
    }
}

export default connect(state=>state,{getMoods})(Moods)