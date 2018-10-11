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
habits:[{habit_name:'',id:0}],
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
        case GET_HABITS+'_PENDING':
            return state
        case GET_HABITS+'_REJECTED':
            return state
        case GET_HABIT_DAYS+'_FULFILLED':
            return{...state,habitDays:action.payload}
        case GET_HABIT_DAYS+'_REJECTED':
            return state
        case GET_HABIT_DAYS+'_PENDING':
            return state
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
        payload:axios.get('/api/habits').catch(err=>console.log(err))
    }
}
export function habitDays(startDate,endDate){
    return{
        type:GET_HABIT_DAYS,
        payload:axios.post('/api/habits/days',{startDate,endDate}).catch(err=>console.log(err))
    }
}
export function recordHabit(habit_id){
    return{
        type:RECORD_HABIT,
        payload:axios.post('/api/habits',{user_id:1,date:initialState.today,habit_id}).catch(err=>console.log(err))
    }
}
export function checkHabit(){
    return{
        type:CHECK_HABIT,
        payload:axios.post('/api/habits/check',{user_id:1,date:initialState.today}).catch(err=>console.log(err))
    }
}