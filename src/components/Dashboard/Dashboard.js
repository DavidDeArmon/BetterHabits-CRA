import React, { Component } from "react";
import Mood from "./Mood";
import Habit from "./Habit";
import Header from '../Header/Header'
import "../CSS/Dashboard.scss";
import { getHabits, checkHabit } from "../../ducks/habitReducer";
import { connect } from "react-redux";
import UserInfo from "./UserInfo";

class Dashboard extends Component {
  componentDidMount() {
    const { auth } = this.props;
    if (auth.uid) {
      this.props.getHabits(auth.uid);
      this.props.checkHabit(auth.uid);
    }
  }
  componentDidUpdate(prevProps) {
    const { auth } = this.props;
    if (auth !== prevProps.auth) {
      if (auth.uid) {
        this.props.getHabits(auth.uid);
        this.props.checkHabit(auth.uid);
      }
    }
  }
  render() {
    return (
      <div className="dashboard">
        <Header/>
        <div className = 'container'>
          <UserInfo/>
          <Mood />
        </div>
        <Habit auth={this.props.auth} />
      </div>
    );
  }
}
const mapStateToProps = state =>{
  return{
    auth:state.firebase.auth
  }
}
export default connect(mapStateToProps,{ getHabits, checkHabit })(Dashboard);
