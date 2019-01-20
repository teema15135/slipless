import React, { Component } from 'react';
import { Button, TouchableHighlight, StyleSheet, Text, View, ImageBackground, Image, TouchableWithoutFeedback } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import IconComponent from 'react-native-vector-icons/Ionicons'
import firebase from './config/firebase';
import { Color } from './config/color';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// const valueOfBarcode = "593040659-4";

// const userID = firebase.auth().currentUser.uid;

class UserBarcode extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            valueOfBarcode: '0',
        };
    }

    componentDidMount() {
        this.newBarcode;
    }

    getBarcode = () => {
        var request = new XMLHttpRequest();
        var comp = this;
        request.open('GET', 'http://78a78cfd.ngrok.io/getBarcode?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            console.log(request.response);
            comp.setState({
                isLoading: false,
                valueOfBarcode: request.response.barcode_num,
            });
        };

    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <TouchableWithoutFeedback onPress={this.getBarcode}>
                            <Image source={require('../img/coin.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column' }}>
                <View style={{ flex: 2, flexDirection: 'column' }}>
                    <Barcode value={this.state.valueOfBarcode} format="CODE128" />
                    <Text style={styles.valueBarcode}>{this.state.valueOfBarcode}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <TouchableWithoutFeedback onPress={this.getBarcode}>
                        <Image source={require('../img/coin.png')} style={{ width: 25, height: 25, alignSelf: 'center' }} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

class GetBarcodeButton extends Component {
    constructor(props) {
        super(props);
    }
}

export default class HomeBarcode extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <ImageBackground source={require('../img/darkforest.png')} style={styles.imageBG}>
                        {/* <TouchableHighlight style={styles.menuButtonContainer} onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../img/menu.png')} style={styles.menuButton} />
                        </TouchableHighlight> */}
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 30 }}>
                            <TouchableHighlight style={{  flexDirection: 'row', justifyContent: 'center', borderRadius: 25, width:35, height: 35 }}
                                underlayColor={Color.highlightPress}
                                onPress={() => {
                                    this.props.navigation.navigate('Profile');
                                }}>
                                <IconComponent name='md-contact' size={35} color='white' />
                            </TouchableHighlight>
                        </View>
                        <View style={{ flex: 5, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={styles.slipless}>Slipless</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.containerBottom}>
                    <UserBarcode></UserBarcode>
                </View>
            </View >
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
        flex: 1,
    },
    containerBottom: {
        flex: 1,
        backgroundColor: 'white'
    },
    slipless: {
        fontSize: 43,
        textAlign: 'center',
        fontWeight: '200',
        margin: 10,
        marginTop: 15,
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