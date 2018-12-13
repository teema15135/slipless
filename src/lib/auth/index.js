import { fbLoginPermissions } from '../../constants/index';
//import { gLoginPermissions } from '../../constants/index';

import firebase from '../../config/firebase';
import auth from '../../config/auth';
import RNFirebase from 'react-native-firebase'

export const handleFbLogin = () => (
  //firebase.auth().createUserWithEmailAndPassword("test@mail.com", "123456")
  auth.Facebook.login(fbLoginPermissions)
    .then((token) => {
      firebase.auth().signInWithCredential(RNFirebase.auth.FacebookAuthProvider.credential(token))
      console.log("ได้แล้ว")

      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          // User is signed in.
        } else {
          // No user is signed in.
        }
      });

      let fireBaseUser = firebase.auth().currentUser;
      console.log(fireBaseUser);

    })
    .catch((err) => this.onError && this.onError(err))


);

// export const handlegLogin = () => (
//   //firebase.auth().createUserWithEmailAndPassword("test@mail.com", "123456")
//   GoogleSignin.getAccessToken()
//     .then((token) => {
//       var accessToken = Firebase.auth.GoogleAuthProvider.credential(token);
//       handleFirebaseLogin(accessToken);
//     })
//     .catch((err) => this.onError && this.onError(err))
// );
