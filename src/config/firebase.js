import RNFirebase from 'react-native-firebase'
import firebase from 'react-native-firebase';


const configurationOptions = {
  debug: true
}

const firebase = RNFirebase.initializeApp()

//console.log(RNFirebase.database().app.name); // '[DEFAULT]'

export default firebase;