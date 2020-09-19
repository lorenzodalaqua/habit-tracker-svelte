import * as firebase from 'firebase/app';

const config = {
  apiKey: 'AIzaSyB9uI_t8GX_epmaev-vbTugEAQZsYlLfAk',
  authDomain: 'habit-tracker-7bfeb.firebaseapp.com',
  databaseURL: 'https://habit-tracker-7bfeb.firebaseio.com',
  projectId: 'habit-tracker-7bfeb',
  storageBucket: 'habit-tracker-7bfeb.appspot.com',
  messagingSenderId: '183449563338',
  appId: '1:183449563338:web:61178c7b8e64909e1a4433'
};

firebase.initializeApp(config);

export { firebase };
