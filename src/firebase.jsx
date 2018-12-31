import firebase from 'firebase/app';
import 'firebase/app'
import 'firebase/database';
import 'firebase/storage';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyAHc8ZAUeGOh-2TLgejZwxmFktEgOIZK6A",
    authDomain: "m-city-1dd39.firebaseapp.com",
    databaseURL: "https://m-city-1dd39.firebaseio.com",
    projectId: "m-city-1dd39",
    storageBucket: "m-city-1dd39.appspot.com",
    messagingSenderId: "767579521241"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database();
  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebasePlayers = firebaseDB.ref('players');
  

  export {
    firebase,
    firebaseDB,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebasePlayers
  }