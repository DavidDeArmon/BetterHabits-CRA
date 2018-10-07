import React,{Component} from 'react'
import {setMood,resetMood} from '../ducks/reducer'
import { connect } from 'react-redux';


class Mood extends Component{
    render(){
       const moodDisplay=()=>{
            if(!this.props.moodToday){
            return(
                <div>
                        <button onClick = {()=>this.props.setMood('Great')}>Great</button>
                        <button onClick = {()=>this.props.setMood('Good')}>Good</button>
                        <button onClick = {()=>this.props.setMood('Meh')}>Meh</button>
                        <button onClick = {()=>this.props.setMood('Bleh')}>Bleh</button>
                        <button onClick = {()=>this.props.setMood('Bad')}>Bad</button>
                    </div>
            )
            }else if(this.props.moodToday){
                return(
                    <div>
                        <h3>{this.props.today} Mood: {this.props.mood}</h3>
                        <button onClick={()=>this.props.resetMood(this.props.lastMood)}>Edit</button>
                    </div>
                )
            }
        }
        return(
            <div className = 'moodCard'>
                <h1 className = 'moodTitle'>Daily Mood</h1>
                <h3>How's your day been?</h3>               
                {moodDisplay()}                
            </div>
        )
    }
}

export default connect(state=>state,{setMood,resetMood})(Mood)