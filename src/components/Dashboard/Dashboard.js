import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import Mood from './Mood';
import Habit from './Habit';
import '../CSS/Dashboard.scss';
// import firebase from 'firebase';
import {setUserID,getHabits,checkHabit} from '../../ducks/habitReducer'
import { connect } from 'react-redux';


class Dashboard extends Component{
render(){
    return(
        <div className="dashboard">
            <div className='dashboardHeader'>
                <Link className="Link" to='/'>Dashboard</Link>
                <Link className="Link" to='/moods'>Moods</Link>
                <Link className="Link" to='/habits'>Habits</Link>
            </div>
            <Mood className="moodCard"/>
            <Habit className="moodCard" auth = {this.props.firebase.auth}/>
        </div>
    );
}

}
export default connect(state=>state,{setUserID,getHabits,checkHabit})(Dashboard)