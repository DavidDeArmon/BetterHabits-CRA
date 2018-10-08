import React,{Component} from 'react'
import {getMoods} from '../ducks/moodReducer'
import { connect } from 'react-redux';


class Mood extends Component{
    render(){
        let displayMoods =[] 
        let arr= this.props.getMoods().then(()=>{
            arr.map(e=>{
            })     
        })
        return(
            <div className = 'moodDash'>
            {displayMoods}
            </div>
        )
    }
}

export default connect(state=>state,{getMoods})(Mood)