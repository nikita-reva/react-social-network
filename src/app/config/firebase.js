import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyDe8s6xvfXdwFWHN78lI5xzuDBWz_pe_Uw',
  authDomain: 'aniketos-revents-firestore.firebaseapp.com',
  projectId: 'aniketos-revents-firestore',
  databaseURL:
    'https://aniketos-revents-firestore-default-rtdb.europe-west1.firebasedatabase.app',
  storageBucket: 'aniketos-revents-firestore.appspot.com',
  messagingSenderId: '884380368783',
  appId: '1:884380368783:web:c6d622827de52ef70a15fa',
  measurementId: 'G-D83R7JNMKF',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
firebase.analytics();

export default firebase;
