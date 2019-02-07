import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert
} from "react-native";
import { fbLoginPermissions } from "./constants/index";
///import firebase from "./config/firebase";
import auth from "./config/auth";
import RNFirebase from "react-native-firebase";
//import CombinedButton from "react-native-combined-button";

// import { handleFbLogin } from './lib/auth';

import { AccessToken, LoginManager } from 'react-native-fbsdk';

export default class App extends Component {

  handleFbLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['email']);
      const comp = this;
      if (result.isCancelled) {
        throw new Error('User cancelled request');
      }

      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token');
      }

      const credential = await RNFirebase.auth.FacebookAuthProvider.credential(data.accessToken);

      const currentUser = await RNFirebase.auth().signInWithCredential(credential);

      RNFirebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          comp.props.navigation.navigate('Main');
        } else {
          Alert.alert('Login failed');
        }
      })
    } catch (e) {
    }

    /*
    //firebase.auth().createUserWithEmailAndPassword("test@mail.com", "123456")
    auth.Facebook.login(fbLoginPermissions)
      .then(token => {
        var dis = this;
        
        firebase
          .auth()
          .signInWithCredential(
            RNFirebase.auth.FacebookAuthProvider.credential(token)
          );
          Alert.alert("USE HANDLEFBLOGIN");
        console.log("ได้แล้ว");

        firebase.auth().onAuthStateChanged(function (user) {
          if (user) {
            dis.props.navigation.navigate("Main");
          } else {
            // No user is signed in.
          }
        });

        let fireBaseUser = firebase.auth().currentUser;
        console.log(fireBaseUser);
      })
      .catch(err => this.onError && this.onError(err));
      */
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundImage}>
          <Image source={require("../img/loginBg.png")} style={{ flex: 1, resizeMode: 'cover', width: "100%", height: "100%" }}>
            {this.props.children}
          </Image>
        </View>
        <View style={styles.logoContainer}>
          <Image
            source={require("../img/loginLogo.png")}
            style={{ width: 350, height: 350 }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.loginContainer}>
          <TouchableOpacity onPress={this.handleFbLogin}>
            <Image
              source={require("../img/fb.png")}
              style={styles.FacebookStyle}
            //style={styles.ImageIconStyle}
            />
            {/* <View style={styles.SeparatorLine} />
            <Text style={styles.TextStyle}> Sign in with facebook </Text> */}
          </TouchableOpacity>
          {/* <Button
            icon={<Icon name="arrow-right" size={15} color="white" />}
            onPress={this.handleFbLogin}
            title="Sign in with facebook"
            color="#3b5998"
          /> */}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logoContainer: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#21a775"
  },
  loginContainer: {
    flex: 1.5,
    justifyContent: "center",
    alignItems: "center"
    //backgroundColor: "#21a775"
  },
  FacebookStyle: {
    alignItems: "center",
    height: 56.5,
    width: 263.5
  },
  TextStyle: {
    color: "#fff",
    marginBottom: 4,
    marginRight: 20
  },
  backgroundImage: {
    flex: 1,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    // resizeMode: "cover",
    position: "absolute"
  }
});
