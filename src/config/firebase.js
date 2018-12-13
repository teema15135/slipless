import RNFirebase from 'react-native-firebase'
//import firebase from 'react-native-firebase';


const configurationOptions = {
  debug: true
}

const config = {
    apiKey: "AIzaSyDqyfICZXjqsjmy-kZIUVj7tujKdFFx7AU",
    authDomain: "sliplessdemo.firebaseapp.com",
    databaseURL: "https://sliplessdemo.firebaseio.com",
    projectId: "sliplessdemo",
    storageBucket: "sliplessdemo.appspot.com",
    messagingSenderId: "347721073324"
};

const firebase = RNFirebase.initializeApp(config)

//console.log(RNFirebase.database().app.name); // '[DEFAULT]'

export default firebase;