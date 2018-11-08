import React,{Component} from 'react'
import {setMood,resetMood,setActivities,submitDay,editMood,editMode} from '../../ducks/moodReducer'
import { connect } from 'react-redux';


class Mood extends Component{
    handleToggle(activity){
        const {activities} = this.props;
        console.log(this.props)
        let toggle = activities.findIndex((e)=>e===activity)
        if(toggle===-1){
            this.props.setActivities([...activities,activity])
        }else{
            this.props.setActivities(activities.filter((e,i)=>i!==toggle))
        }
    }
    render(){
        const{activities,lastMood,mood,today,moodToday,edit} = this.props
        console.log(activities)
        const {uid} = this.props
        const moodDisplay=()=>{
            const activitiesList = ['Work','Relax','Friends','Family','Party','Study']
            if(!moodToday){
            return(
                <div>
                <h3 id='cardTitle'>What have you been up to?</h3>   
                    <ul className ='activities'>
                    {activitiesList.map((e,i)=>{
                        return( <li key={i} className='pretty p-default'>
                                    <input  type='checkbox' name='activity' value={e} onClick={()=>this.handleToggle(e)}/>
                                    <div className='state p-success'>
                                        <label className='moodInput'>{e}</label>
                                    </div>
                                </li>
                        )
                        })}                 
                    </ul>
                    <h3 id='cardTitle'>How's your day been?</h3>               
                    <div>
                            <button className='moodButtons' onClick = {()=>this.props.setMood('Great')}>Great</button>
                            <button className='moodButtons' onClick = {()=>this.props.setMood('Good')}>Good</button>
                            <button className='moodButtons' onClick = {()=>this.props.setMood('Meh')}>Meh</button>
                            <button className='moodButtons' onClick = {()=>this.props.setMood('Bleh')}>Bleh</button>
                            <button className='moodButtons' onClick = {()=>this.props.setMood('Bad')}>Bad</button>
                    </div>
                    {editOrDelete()}
                </div>
            )
            }else if(moodToday){
                return(
                    <div>
                        <h3>Date: {today} </h3>
                        <h3>Mood: {mood}</h3>
                        <h3>Activities: {activities.join(', ')}</h3>
                        <button className='moodButtons' id='submitButton' onClick={()=>this.props.editMode()}>Edit Entry</button>
                        <button className='moodButtons' id='submitButton' onClick={()=>this.props.resetMood(lastMood)}>Delete Entry</button>
                    </div>
                )
            }
        }
        const editOrDelete=()=>{
            if(!edit){
              return  <button className='moodButtons' id='submitButton' onClick={()=>this.props.submitDay(uid,mood,activities)}>Accept Submission</button>
            }else if(edit){
               return <button className='moodButtons'  id='submitButton' onClick={()=>this.props.editMood(lastMood,mood,activities)}>Accept Edit</button>
            }
        }
        return(
            <div className = 'Card'>
                <h1 className = 'Header'>Daily Mood</h1>
                {moodDisplay()}
            </div>
        )
    }
}
const mapStateToProps = props =>{
    console.log(props)
    const{activities,lastMood,mood,today,moodToday,edit} = props.moodReducer;
    const {uid} = props.firebase.auth;
  return{
  activities,
  lastMood,
  mood,
  today,
  moodToday,
  edit,
  uid
  }
}
export default connect(mapStateToProps,{setMood,resetMood,setActivities,submitDay,editMood,editMode})(Mood)