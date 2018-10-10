import React,{Component} from 'react'
import {Link} from 'react-router-dom';
import Mood from './Mood';
import Habit from './Habit';


export default class Dashboard extends Component{

render(){

    return(
        <div>
            <h1>Dashboard</h1>
            <Link to='/moods'>Moods</Link>
            <Link to='/habits'>Habits</Link>
            <Mood/>
            <Habit/>
        </div>
    );
}

}