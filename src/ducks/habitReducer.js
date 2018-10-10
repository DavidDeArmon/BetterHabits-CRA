import axios from 'axios'

const GET_HABITS = 'GET_HABITS'
const RECORD_HABIT = 'RECORD_HABIT'
const CHECK_HABIT = 'CHECK_HABIT'
const GET_HABIT_DAYS = 'GET_HABIT_DAYS'

var getToday=()=>{
var today = new Date();
today =today.getFullYear()+'-'+ (today.getMonth()+1) +'-'+ today.getDate();
return today;
}

//inital state
const initialState = {
habits:[0],
checkedHabits:[0],
today:getToday(),
recordedToday:false,
habitDays:{data:[0]}
}

//reducer
export default function reducer(state=initialState,action){
    // console.log('action: ', action.type);
    switch(action.type){
        case GET_HABITS+'_FULFILLED':
            return{...state,habits:action.payload.data}
        case GET_HABIT_DAYS+'_FULFILLED':
            return{...state,habitDays:action.payload}
        case RECORD_HABIT+'_FULFILLED':
            return{...state,recordedToday:true}
        case CHECK_HABIT+'_FULFILLED':
            return{...state,checkedHabits:action.payload.data}
        default:
        return state;
    }
}

//action creator

export function getHabits(){
    return{
        type:GET_HABITS,
        payload:axios.get('/api/habits')
    }
}
export function habitDays(startDate,endDate){
    return{
        type:GET_HABIT_DAYS,
        payload:axios.post('/api/habits/days',{startDate,endDate})
    }
}
export function recordHabit(habit_id){
    return{
        type:RECORD_HABIT,
        payload:axios.post('/api/habits',{user_id:1,date:initialState.today,habit_id})
    }
}
export function checkHabit(){
    return{
        type:CHECK_HABIT,
        payload:axios.post('/api/habits/check',{user_id:1,date:initialState.today})
    }
}