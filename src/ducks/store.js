import {createStore,applyMiddleware,combineReducers,compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import {reactReduxFirebase,firebaseReducer} from 'react-redux-firebase';
import firebase from 'firebase';
import 'firebase/auth'
import moodReducer from'./moodReducer';
import habitReducer from './habitReducer';
import authReducer from './authReducer';

// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
// }
// firebase.initializeApp(firebaseConfig)

const config = {
  userProfile: 'users', // firebase root where user profiles are stored
  enableLogging: false, // enable/disable Firebase's database logging
}

const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, config)
)(createStore)

// const rootReducer = combineReducers({
  
// })

let allReducers = combineReducers({moodReducer,habitReducer,authReducer,firebase: firebaseReducer})

let store = createStoreWithFirebase(allReducers,applyMiddleware(promiseMiddleware()))

export default store;