// React core.
import React,{Component} from 'react';

// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

// Styles
import '../CSS/Auth.scss'; // Import globally.


// Instantiate a Firebase app.
var config = {
  apiKey: "AIzaSyCpP5kS7cQa68MpKONbBOevQv-3MDb04L4",
  authDomain: "assistedinawe.firebaseapp.com",
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID
}
firebase.initializeApp(config);


const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/dashboard',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

class Login extends Component {
  render() {
    return (
    <div className='login'>
      <div className="header">
        <div className="title">
          <h1>Better Habits</h1>
        </div>
      </div>
      <div className="card">
        <p>Please sign-in:</p>
        <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
      </div>
    </div>
    );
  }
}

export default Login