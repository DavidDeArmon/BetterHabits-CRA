import {createStore,applyMiddleware,combineReducers} from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import moodReducer from'./moodReducer'
import habitReducer from './habitReducer'


let bothReducers = combineReducers({moodReducer,habitReducer})

let store = createStore(bothReducers,applyMiddleware(promiseMiddleware()))

export default store;