import axios from 'axios'

const SET_MOOD = 'SET_MOOD'
const SET_ACTIVITIES = 'SET_ACTIVITIES'
const RESET_MOOD='RESET_MOOD'
const GET_MOODS='GET_MOODS'
const SUBMIT_DAY='SUBMIT_DAY'
const EDIT_MOOD='EDIT_MOOD'
const SET_DATE='SET_DATE'

var getToday=()=>{
    var today = new Date();
    today =today.getFullYear()+'-'+ (today.getMonth()+1) +'-'+ today.getDate();
    return today;
}
var startDate=(date)=>{
    date.setDate(date.getDate()-29)
    date = date.getFullYear()+'-'+ (date.getMonth()+1) +'-'+ date.getDate();
    return date
}
//INITIAL STATE
const initialState = {
    mood: null,
    activities:[],
    moodToday:false,
    today:getToday(),
    lastMood:null,
    moodsArr:[0],
    edit:false,
    startDate:startDate(new Date(getToday())),
    endDate:getToday()
}

//REDUCER
export default function reducer(state=initialState,action){
    // console.log('action: ', action.type,);
    switch(action.type){
        case SET_MOOD:
            return{...state,mood:action.payload}
        case SET_ACTIVITIES:
            return{...state,activities:action.payload}
        case SUBMIT_DAY+'_FULFILLED':
            return{...state,mood:action.payload.data.mood,moodToday:true,lastMood:action.payload.data.id}
        case SUBMIT_DAY+'_REJECTED':
            return state
        case EDIT_MOOD+'_FULFILLED':
            return{...state,mood:action.payload.data.mood,moodToday:true,lastMood:action.payload.data.id,edit:false}
        case EDIT_MOOD+'_REJECTED':
            return state
        case RESET_MOOD:
            return{...state,mood:null,moodToday:false,activities:[],edit:action.payload}
        case GET_MOODS+'_FULFILLED':
            return{...state,moodsArr:action.payload.data}
        case GET_MOODS+'_PENDING':
            return state
        case GET_MOODS+'_REJECTED':
            return state
        case SET_DATE:
            const {payload} = action
            return {...state,startDate:startDate(new Date(payload)),endDate:payload}
        default:
        return state;
    }
}

//ACTION CREATOR
export function setMood(mood){    
    return{
        type:SET_MOOD,
        payload:mood
    }
}
export function setActivities(activities){    
    return{
        type:SET_ACTIVITIES,
        payload:activities
    }
}
export function submitDay(uid,mood,activities){    
    return{
        type:SUBMIT_DAY,
        payload:axios.post('/api/moods',{user_id:uid,date:initialState.today,mood,activities}).catch(err=>console.log(err))
    }
}
export function resetMood(lastMood){
    axios.delete('/api/moods/'+lastMood)
    return{type:RESET_MOOD, payload:false}
}
export function editMode(){
    return{type:RESET_MOOD, payload:true}
}
export function editMood(mood_id,mood,activities){
    return{
        type:EDIT_MOOD,    
        payload:axios.put('/api/moods/'+mood_id,{date:initialState.today,mood,activities}).catch(err=>console.log(err))
    }
}
export function getMoods(uid){
    return{type:GET_MOODS, payload:axios.get('/api/moods/'+uid).catch(err=>console.log(err))}
}
export function setDate(startDate){
    return{type:SET_DATE,payload:startDate}
}