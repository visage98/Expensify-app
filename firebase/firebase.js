import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCIlmnVKys_JgQt_JHosAnsuhTAqaODnOQ",
    authDomain: "expensify-9e147.firebaseapp.com",
    databaseURL: "https://expensify-9e147.firebaseio.com",
    projectId: "expensify-9e147",
    storageBucket: "expensify-9e147.appspot.com",
    messagingSenderId: "923602049577",
    appId: "1:923602049577:web:8400ee8ed526b34f"
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database();

export {firebase, database as default};