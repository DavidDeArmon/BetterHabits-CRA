import axios from 'axios'

const SET_MOOD = 'SET_MOOD'
const RESET_MOOD='RESET_MOOD'
const GET_MOODS='GET_MOODS'

var getToday=()=>{
var today = new Date();
today = (today.getMonth()+1) +'/'+ today.getDate()+'/'+ today.getFullYear();
console.log(today)
return today;

}

//INITIAL STATE
const initialState = {
    mood: null,
    moodToday:false,
    today:getToday(),
    lastMood:null,
    moodsArr:[]
}

//REDUCER
export default function reducer(state=initialState,action){
    console.log('action: ', action.type);
    switch(action.type){
        case SET_MOOD+'_FULFILLED':
            console.log(action.payload)
            console.log('fulfilled')
            return{...state,mood:action.payload.data.mood,moodToday:true,lastMood:action.payload.data.user_id}
        case SET_MOOD+'_REJECTED':
            console.log('rejected')
            return state
        case RESET_MOOD:
            return{...state,mood:null,moodToday:false}
        case GET_MOODS+'_FULFILLED':
            console.log(action.payload.data)
            return{...state,moodsArr:action.payload.data}
        case GET_MOODS+'_PENDING':
            console.log(action.payload.data)
            return{...state,moodsArr:action.payload.data}
        default:
        return state;
    }
}

//ACTION CREATOR
export function setMood(mood){    
    return{
        type:SET_MOOD,
        payload:axios.post('/api/moods',{user_id:1,date:initialState.today,mood,activities:null})
    }
}
export function resetMood(lastMood){
    axios.delete('/api/moods/'+lastMood).then((response)=>{
        console.log('delete: ',response)
    })
    return{type:RESET_MOOD, payload:'reset'}
}
export function getMoods(){
    return{type:GET_MOODS, payload:axios.get('/api/moods')}
}
