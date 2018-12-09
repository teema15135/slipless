import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FBSDK, { LoginManager } from 'react-native-fbsdk';

export default class loginScreen extends Component {

    _fbAuth() {
        LoginManager.logInWithReadPermissions(['public_profile']).then(function (result) {
            if (result.isCancelled) {
                console.log('Login was cancelled ');
            } else {
                console.log('Login was a success' + result.grantedPermissions.toString());
            }
        }, function (error) {
            console.log('An error occured: ' + error);
        })
    }

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this._fbAuth()}>
                </TouchableOpacity>
            </View>
        );
    }
}
