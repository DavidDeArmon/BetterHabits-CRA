import axios from 'axios'

const GET_HABITS = 'GET_HABITS'

//inital state
const initialState = {
habits:[]
}

//reducer
export default function reducer(state=initialState,action){
    console.log('action: ', action.type,);
    switch(action.type){
        case GET_HABITS+'FULFILLED':
            console.log(action.payload)
            return{...state,habits:action.payload}
       
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