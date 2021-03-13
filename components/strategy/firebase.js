// import firebase from 'firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig =  {
  apiKey: "AIzaSyDPxHB7IEGbMdo42t4rLbxDB6uhTDblBzw",
  authDomain: "deepcare-302007.firebaseapp.com",
  projectId: "deepcare-302007",
  storageBucket: "deepcare-302007.appspot.com",
  messagingSenderId: "359626635240",
  appId: "1:359626635240:web:b334d326a2d2768803d65d",
  measurementId: "G-8VV4XCDJPF"
};

try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;
