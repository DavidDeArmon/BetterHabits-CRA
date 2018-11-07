import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {reactReduxFirebase,firebaseReducer} from 'react-redux-firebase';
import firebase from 'firebase/app';
import 'firebase/auth'
import moodReducer from'./moodReducer';
import habitReducer from './habitReducer';


const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase)
)(createStore)

let allReducers = combineReducers({moodReducer,habitReducer,firebase: firebaseReducer})

let store = createStoreWithFirebase(allReducers,applyMiddleware(promiseMiddleware()))

export default store;