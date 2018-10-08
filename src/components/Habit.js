import React,{Component} from 'react'
import {getHabits} from '../ducks/habitReducer'
import {connect} from 'react-redux'

class Habit extends Component{
    constructor(props){
        super(props)
        this.state={
            habits:[]
        }
    }
    componentDidMount(){
        console.log(this.props.getHabits().then(response=>{
            this.setState({habits:response.action.payload.data[0].habit_name})
          return  response.action.payload.data[0].habit_name}))
        // this.setState({habits:this.props.getHabits()})
    }
render(){
    return(
        <div>
            <h1>Habits</h1>
            <h3>{this.state.habits}</h3>
        </div>
    )
}
}

export default connect(state=>state,{getHabits})(Habit)
