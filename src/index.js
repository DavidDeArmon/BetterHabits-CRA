import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './favicons/favicon'
import './DavidsIconWhite.svg'
import * as serviceWorker from '../src/serviceWorker';

ReactDOM.render(<App />, document.getElementById('root'));

if(process.env.NODE_ENV !== 'production'){
    module.hot.accept('./App',()=>{
    const NextApp = require('./App').default;
    ReactDOM.render(<NextApp/>,document.getElementById('root'))
    })
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
// function init() {
//   if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/sw.js').then(registration => {
//         // console.log('SW registered: ', registration);
//         // registration.pushManager.subscribe({userVisibleOnly: true});
//       }).catch(registrationError => {
//         console.log('SW registration failed: ', registrationError);
//       });
//     });
//   }
// }
// init()
