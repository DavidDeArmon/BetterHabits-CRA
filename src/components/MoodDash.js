import React,{Component} from 'react'
import {getMoods} from '../ducks/moodReducer'
import { connect } from 'react-redux';
import {Link} from 'react-router-dom'


class Moods extends Component{
    render(){
        var thirtyDays = [];
        for(let i = 0;i<31;i++){
            thirtyDays.push(<div key={i}>{i}</div>)
        }
        return(
            <div className = 'moodDash'>
            <h1>Moods</h1>
             <Link to ='/'>Back</Link>
             {thirtyDays}
            </div>
        )
    }
}

export default connect(state=>state,{getMoods})(Moods)