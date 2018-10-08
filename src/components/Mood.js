import React,{Component} from 'react'
import {setMood,resetMood,setActivities,submitDay,editMood,editMode} from '../ducks/moodReducer'
import { connect } from 'react-redux';


class Mood extends Component{
    handleToggle(activity){
        const {activities} = this.props;
        let toggle = activities.findIndex((e)=>e===activity)
        if(toggle===-1){
            this.props.setActivities([...activities,activity])
        }else{
            this.props.setActivities(activities.filter((e,i)=>i!==toggle))
        }
    }
    render(){
       const moodDisplay=()=>{
            const activities = ['Work','Relax','Friends','Party','Study']
            if(!this.props.moodToday){
            return(
                <div>
                <h3>What have you been up to?</h3>   
                    <ul className ='activities'>
                    {activities.map((e,i)=>{
                        return( <li key={i}>
                                    <h4>{e}</h4>
                                    <input type='checkbox' name='activity' value={e} onClick={()=>this.handleToggle(e)}/>
                                </li>
                        )
                        })}                 
                    </ul>
                    <h3>How's your day been?</h3>               
                    <div>
                            <button onClick = {()=>this.props.setMood('Great')}>Great</button>
                            <button onClick = {()=>this.props.setMood('Good')}>Good</button>
                            <button onClick = {()=>this.props.setMood('Meh')}>Meh</button>
                            <button onClick = {()=>this.props.setMood('Bleh')}>Bleh</button>
                            <button onClick = {()=>this.props.setMood('Bad')}>Bad</button>
                    </div>
                </div>
            )
            }else if(this.props.moodToday){
                return(
                    <div>
                        <h3>{this.props.today} Mood: {this.props.mood}</h3>
                        <h4>Activities:{this.props.activities}</h4>
                        <button onClick={()=>this.props.editMode()}>Edit Entry</button>
                        <button onClick={()=>this.props.resetMood(this.props.lastMood)}>Delete Entry</button>
                    </div>
                )
            }
        }
        const editOrDelete=()=>{
            if(!this.props.edit){
              return  <button onClick={()=>this.props.submitDay(this.props.mood,this.props.activities)}>Accept Submission</button>
            }else if(this.props.edit){
               return <button onClick={()=>this.props.editMood(this.props.lastMood,this.props.mood,this.props.activities)}>Accept Edit</button>
            }
        }
        return(
            <div className = 'moodCard'>
                <h1 className = 'moodTitle'>Daily Mood</h1>
                {moodDisplay()}
                {editOrDelete()}  
            </div>
        )
    }
}

export default connect(state=>state,{setMood,resetMood,setActivities,submitDay,editMood,editMode})(Mood)