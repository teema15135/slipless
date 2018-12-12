import { fbLoginPermissions } from '../../constants/index';
import firebase from '../../config/firebase';
import auth from '../../config/auth';

export const handleFbLogin = () => (
  auth.Facebook.login(fbLoginPermissions)
    .then((token) => {
      firebase.auth()
        .signInWithCredential(firebase.auth.FacebookAuthProvider.credential(token))
    })
    .catch((err) => this.onError && this.onError(err))
);