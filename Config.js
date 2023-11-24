import firebase from 'firebase/compat';
import 'firebase/compat/auth';

const Config = {
  apiKey: 'AIzaSyDsXs--SN0UU6HV2WnT0NBwEntlvqufz0I',
  authDomain: 'pickandstitches-a9d5f.firebaseapp.com',
  databaseURL: 'https://pickandstitches-a9d5f-default-rtdb.firebaseio.com',
  projectId: 'pickandstitches-a9d5f',
  storageBucket: 'pickandstitches-a9d5f.appspot.com',
  messagingSenderId: '903368133732',
  appId: '1:903368133732:web:062b4de73fb98932b32371',
  measurementId: 'G-3GTCZRC7G1',
};

firebase.initializeApp(Config);
export const auth = firebase.auth();

