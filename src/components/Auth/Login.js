// React core.
import React,{Component} from 'react';
import {Link} from 'react-router-dom';

// Firebase.
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
// import config from '../../firebase.js'

// Styles
import styles from '../CSS/auth.css'
import '../CSS/Auth.scss'; // Import globally.


// Instantiate a Firebase app.
var config = {
    apiKey: "AIzaSyCpP5kS7cQa68MpKONbBOevQv-3MDb04L4",
    authDomain: "assistedinawe.firebaseapp.com",
    databaseURL: "https://assistedinawe.firebaseio.com",
    projectId: "assistedinawe",
    storageBucket: "assistedinawe.appspot.com",
    messagingSenderId: "418417628831"
}
const firebaseApp = firebase.initializeApp(config);


const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/signedIn',
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

class Login extends Component {
  uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    callbacks: {
      signInSuccessWithAuthResult: () => false,
    },
  };

  state = {
    isSignedIn: undefined,
  };

  /**
   * @inheritDoc
   */
  componentDidMount() {
    this.unregisterAuthObserver = firebaseApp.auth().onAuthStateChanged((user) => {
      this.setState({isSignedIn: !!user});
    });
  }

  /**
   * @inheritDoc
   */
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  /**
   * @inheritDoc
   */
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.logo}>
          <i className={styles.logoIcon + ' material-icons'}>photo</i> My App
        </div>
        <div className={styles.caption}>This is a cool demo app</div>
        {this.state.isSignedIn !== undefined && !this.state.isSignedIn &&
          <div>
            <StyledFirebaseAuth className={styles.firebaseUi} uiConfig={this.uiConfig}
              firebaseAuth={firebaseApp.auth()}/>
          </div>
        }
        {this.state.isSignedIn &&
          <div className={styles.signedIn}>
            Hello {firebaseApp.auth().currentUser.displayName}. You are now signed In!
            <a className={styles.button} onClick={() => firebaseApp.auth().signOut()}>Sign-out</a>
          </div>
        }
        <Link to =  '/' >Home</Link>
      </div>
    );
  }
}

export default Login