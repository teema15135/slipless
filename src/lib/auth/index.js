import { fbLoginPermissions } from '../../constants/index';
import firebase from '../../config/firebase';
import auth from '../../config/auth';
import RNFirebase from 'react-native-firebase'

export const handleFbLogin = () => (
  //firebase.auth().createUserWithEmailAndPassword("test@mail.com", "123456")
  auth.Facebook.login(fbLoginPermissions)
    .then((token) => {
      firebase.auth().signInWithCredential(RNFirebase.auth.FacebookAuthProvider.credential(token))
      console.log("ได้แล้ว")
    })
    .catch((err) => this.onError && this.onError(err))
);