import axios from 'axios'
// import auth from './authReducer'

const GET_HABITS = 'GET_HABITS'
const RECORD_HABIT = 'RECORD_HABIT'
const CHECK_HABIT = 'CHECK_HABIT'
const GET_HABIT_DAYS = 'GET_HABIT_DAYS'
const CREATE_HABIT = 'CREATE_HABIT'
const UPDATE_HABIT = 'UPDATE_HABIT'
const SET_USER_ID = 'SET_USER_ID'

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
habitDays:{data:[0]},
user_id:''
}

//reducer
export default function reducer(state=initialState,action){
    console.log('action: ', action.type);
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
        case CREATE_HABIT+'_FULFILLED':
            return{...state,habits:action.payload.data}
        case CREATE_HABIT+'_PENDING':
            return state     
        case UPDATE_HABIT+'_FULFILLED':
            return{...state,habits:action.payload.data}
        case SET_USER_ID:
            return {...state,user_id:action.payload}
        default:
        return state;
    }
}

//action creator

export function getHabits(uid){
    return{
        type:GET_HABITS,
        payload:axios.get(`/api/habits/${uid}`).catch(err=>console.log(err))
    }
}
export function habitDays(startDate,endDate,uid){
    return{
        type:GET_HABIT_DAYS,
        payload:axios.post(`/api/habits/days/${uid}`,{startDate,endDate}).catch(err=>console.log(err))
    }
}
export function recordHabit(habit_id){
    return{
        type:RECORD_HABIT,
        payload:axios.post('/api/habits',{user_id:initialState.user_id,date:initialState.today,habit_id}).catch(err=>console.log(err))
    }
}
export function checkHabit(uid){
    return{
        type:CHECK_HABIT,
        payload:axios.post('/api/habits/check',{user_id:uid,date:initialState.today}).catch(err=>console.log(err))
    }
}
export function createHabit(habit_name,habit_desc){
    return{
        type:CREATE_HABIT,
        payload:axios.post('/api/habits/newHabit',{user_id:initialState.user_id,habit_name,habit_desc}).catch(err=>console.log(err))
    }
}
export function updateHabit(habit_name,habit_desc){
    return{
        type:UPDATE_HABIT,
        payload:axios.put('/api/habits/'+initialState.user_id,{habit_name,habit_desc})
    }
}
export function setUserID(user_id){
    console.log(user_id)
    return{
    type:SET_USER_ID,
    payload:user_id
    }
}