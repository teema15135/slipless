/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import Barcode from 'react-native-barcode-builder';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

const valueOfBarcode = "593040659-4";

export default class HomeBarcode extends React.Component {
    static navigationOptions = {
        drawerLabel: 'บาร์โค้ด',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <ImageBackground source={require('../img/darkforest.png')} style={styles.imageBG}>
                        <TouchableHighlight style={styles.menuButtonContainer} onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../img/menu.png')} style={styles.menuButton} />
                        </TouchableHighlight>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={styles.slipless}>Slipless</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.containerBottom}>
                    <Barcode value={valueOfBarcode} format="CODE128" />
                    <Text style={styles.valueBarcode}>{valueOfBarcode}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start'
    },
    containerTop: {
        flex: 10,
    },
    containerBottom: {
        flex: 11,
        backgroundColor: 'white'
    },
    slipless: {
        fontSize: 50,
        textAlign: 'center',
        fontWeight: '200',
        margin: 10,
        marginTop: 25,
        color: 'white',
        fontFamily: 'Lobster-Regular',
    },
    valueBarcode: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    imageBG: {
        flex: 1,
        width: '100%',
    },
    menuButton: {
        width: 25,
        height: 25,
    },
    menuButtonContainer: {
        width: 25,
        height: 25,
        position: 'absolute',
        top: 20,
        left: 20,
    },
});