import React,{Component} from 'react'
import {setMood,resetMood,setActivities,submitDay,editMood,editMode} from '../ducks/moodReducer'
import { connect } from 'react-redux';


class Mood extends Component{
    handleToggle(activity){
        const {activities} = this.props.moodReducer;
        let toggle = activities.findIndex((e)=>e===activity)
        if(toggle===-1){
            this.props.setActivities([...activities,activity])
        }else{
            this.props.setActivities(activities.filter((e,i)=>i!==toggle))
        }
    }
    render(){
       const{activities,lastMood,mood,today,moodToday,edit} = this.props.moodReducer
       const moodDisplay=()=>{
            const activitiesList = ['Work','Relax','Friends','Party','Study']
            if(!moodToday){
            return(
                <div>
                <h3>What have you been up to?</h3>   
                    <ul className ='activities'>
                    {activitiesList.map((e,i)=>{
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
            }else if(moodToday){
                return(
                    <div>
                        <h3>{today} Mood: {mood}</h3>
                        <h4>Activities:{activities}</h4>
                        <button onClick={()=>this.props.editMode()}>Edit Entry</button>
                        <button onClick={()=>this.props.resetMood(lastMood)}>Delete Entry</button>
                    </div>
                )
            }
        }
        const editOrDelete=()=>{
            if(!edit){
              return  <button onClick={()=>this.props.submitDay(mood,activities)}>Accept Submission</button>
            }else if(edit){
               return <button onClick={()=>this.props.editMood(lastMood,mood,activities)}>Accept Edit</button>
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