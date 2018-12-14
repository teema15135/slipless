import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button
} from 'react-native';
import { fbLoginPermissions } from './constants/index';
import firebase from './config/firebase';
import auth from './config/auth';
import RNFirebase from 'react-native-firebase';
import FB from './facebookuser';
import User from './facebookuser';

// import { handleFbLogin } from './lib/auth';

export default class App extends Component {
    // static navigationOptions = {
    //     drawerLabel: 'login',
    // };

    handleFbLogin = () => (
        //firebase.auth().createUserWithEmailAndPassword("test@mail.com", "123456")
        auth.Facebook.login(fbLoginPermissions)
          .then((token) => {
            var dis = this;
            firebase.auth().signInWithCredential(RNFirebase.auth.FacebookAuthProvider.credential(token))
            console.log("ได้แล้ว")
      
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                dis.props.navigation.navigate('Main');
                new FB(firebase.auth().currentUser);
              } else {
                // No user is signed in.
              }
            });
      
            let fireBaseUser = firebase.auth().currentUser;
            console.log(fireBaseUser);
      
          })
          .catch((err) => this.onError && this.onError(err))
      
      
      );

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={this.handleFbLogin}
                    title="Sign in with facebook"
                    color="#3c50e8"
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});