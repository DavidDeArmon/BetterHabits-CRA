import axios from "axios";

const GET_HABITS = "GET_HABITS";
const RECORD_HABIT = "RECORD_HABIT";
const CHECK_HABIT = "CHECK_HABIT";
const GET_HABIT_DAYS = "GET_HABIT_DAYS";
const CREATE_HABIT = "CREATE_HABIT";
const UPDATE_HABIT = "UPDATE_HABIT";
const TOGGLE_DETAILED = 'TOGGLE_DETAILED';

var getToday = () => {
  var today = new Date();
  today =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  return today;
};
//inital state
const initialState = {
  habits: [0],
  checkedHabits: [0],
  today: getToday(),
  recordedToday: false,
  habitDays: { data: [0] },
  detailed:false
};

//reducer
export default function reducer(state = initialState, action) {
  // console.log('action: ', action.type);
  switch (action.type) {
    case GET_HABITS + "_FULFILLED":
      return { ...state, habits: action.payload.data };
    case GET_HABITS + "_PENDING":
      return state;
    case GET_HABITS + "_REJECTED":
      return state;
    case GET_HABIT_DAYS + "_FULFILLED":
      return { ...state, habitDays: action.payload };
    case GET_HABIT_DAYS + "_PENDING":
      return state;
    case GET_HABIT_DAYS + "_REJECTED":
      return state;
    case RECORD_HABIT + "_FULFILLED":
      return { ...state, recordedToday: true,checkedHabits:action.payload.data };
    case CHECK_HABIT + "_FULFILLED":
      return { ...state, checkedHabits: action.payload.data };
    case CREATE_HABIT + "_FULFILLED":
      return { ...state, habits: action.payload.data };
    case CREATE_HABIT + "_PENDING":
      return state;
    case UPDATE_HABIT + "_FULFILLED":
      return { ...state, habits: action.payload.data };
    case TOGGLE_DETAILED:
      return{...state,detailed:!state.detailed}
    default:
      return state;
  }
}

//action creator
export function getHabits(uid) {
  return {
    type: GET_HABITS,
    payload: axios.get(`/api/habits/${uid}`).catch(err => console.log(err))
  };
}
export function habitDays(uid, startDate, endDate) {
  return {
    type: GET_HABIT_DAYS,
    payload: axios
      .post(`/api/habits/days/${uid}`, { startDate, endDate })
      .catch(err => console.log(err))
  };
}
export function recordHabit(uid, habit_id) {
  return {
    type: RECORD_HABIT,
    payload: axios
      .post("/api/habits", { user_id: uid, date: initialState.today, habit_id })
      .catch(err => console.log(err))
  };
}
export function checkHabit(uid) {
  return {
    type: CHECK_HABIT,
    payload: axios
      .post("/api/habits/check", { user_id: uid, date: initialState.today })
      .catch(err => console.log(err))
  };
}
export function createHabit(uid, habit_name, habit_desc) {
  return {
    type: CREATE_HABIT,
    payload: axios
      .post("/api/habits/newHabit", { user_id: uid, habit_name, habit_desc })
      .catch(err => console.log(err))
  };
}
export function updateHabit(uid, habit_name, habit_desc) {
  return {
    type: UPDATE_HABIT,
    payload: axios.put("/api/habits/" + uid, { habit_name, habit_desc })
  };
}
export function toggleDetailed(){
  return{type:TOGGLE_DETAILED}
}