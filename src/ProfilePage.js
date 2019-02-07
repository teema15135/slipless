import React, { Component } from 'react';
import { Button, TouchableHighlight, StyleSheet, Text, View, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';

import { Color } from './config/color';
import firebase from './config/firebase';


export default class App extends Component {
    // static navigationOptions = () => ({
    //     title: 'Bookmark',
    //     headerTintColor: 'black',
    //     headerStyle: {
    //         backgroundColor: Color.headerBookmark,
    //         justifyContent: 'center',
    //         flexDirection: 'row',
    //     },
    //     headerLeft:
    //         <Text>5</Text>,
    //     headerRight:
    //         <Text>6</Text>
    // });

    constructor(props) {
        super(props);
        this.state={
            profileURI : firebase.auth().currentUser.photoURL,
            displayName : firebase.auth().currentUser.displayName
        }
    }

    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flex: 1.5 }}>
                    <ImageBackground source={require('../img/profile-bg.jpg')} style={{flex: 1, width: '100%', flexDirection: 'column',justifyContent: 'center'}}>
                        <View>
                            <Image source={{ uri: this.state.profileURI }} style={{height: 45, width: 45, borderRadius: 40}} />
                            <Text style={{fontSize: 15}}>{this.state.displayName}</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

});