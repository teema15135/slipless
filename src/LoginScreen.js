import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Icon,
  TouchableOpacity
} from "react-native";
import { fbLoginPermissions } from "./constants/index";
import firebase from "./config/firebase";
import auth from "./config/auth";
import RNFirebase from "react-native-firebase";
import FB from "./facebookuser";
import User from "./facebookuser";
//import CombinedButton from "react-native-combined-button";

// import { handleFbLogin } from './lib/auth';

export default class App extends Component {
  // static navigationOptions = {
  //     drawerLabel: 'login',
  // };

  handleFbLogin = () =>
    //firebase.auth().createUserWithEmailAndPassword("test@mail.com", "123456")
    auth.Facebook.login(fbLoginPermissions)
      .then(token => {
        var dis = this;
        firebase
          .auth()
          .signInWithCredential(
            RNFirebase.auth.FacebookAuthProvider.credential(token)
          );
        console.log("ได้แล้ว");

        firebase.auth().onAuthStateChanged(function(user) {
          if (user) {
            dis.props.navigation.navigate("Main");
            new FB(firebase.auth().currentUser);
          } else {
            // No user is signed in.
          }
        });

        let fireBaseUser = firebase.auth().currentUser;
        console.log(fireBaseUser);
      })
      .catch(err => this.onError && this.onError(err));

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.backgroundImage}>
          <Image source={require("../img/loginBg.png")} style={{flex:1, resizeMode:'cover', width: "100%", height: "100%"}}>
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
