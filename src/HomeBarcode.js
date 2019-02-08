import React, { Component } from 'react';
import { Button, TouchableHighlight, StyleSheet, Text, View, ImageBackground, Image, TouchableWithoutFeedback, ProgressBarAndroid } from 'react-native';
import Barcode from 'react-native-barcode-builder';
import IconComponent from 'react-native-vector-icons/Ionicons';
import firebase from './config/firebase';
import { Color } from './config/color';
import { Server } from './config/server';
import RNFirebase from 'react-native-firebase';

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
        this.getBarcode();
    }

    getBarcode = () => {
        var request = new XMLHttpRequest();
        var comp = this;
        request.open('GET', Server.path + '/getBarcode?uid=' + RNFirebase.auth().currentUser.uid); //jifUBEXSfGVpkLHKyOHZDsVGS042
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            comp.setState({
                isLoading: false,
                valueOfBarcode: request.response.barcode_num,
            });
        }
        request.onerror = function () {
            comp.setState({
                isLoading: true,
                valueOfBarcode: 'server is down'
            })
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flex: 1, flexDirection: 'column' }}>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'column' }}>
                        <TouchableWithoutFeedback onPress={this.getBarcode}>
                            <ProgressBarAndroid
                                styleAttr='Large'
                                indeterminate={true}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
            );
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
                <Barcode value={this.state.valueOfBarcode} format="CODE128" />
                <Text style={styles.valueBarcode}>{this.state.valueOfBarcode}</Text>
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
                    <View style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        backgroundColor: '#87bcbf'
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end', marginRight: 30 }}>
                            <TouchableHighlight style={{ flexDirection: 'row', justifyContent: 'center', borderRadius: 25, width: 35, height: 35 }}
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
                    </View>
                    {/* <ImageBackground source={require('../img/glass-green-water-blur.png')} style={styles.imageBG}>
                    </ImageBackground> */}
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
        // elevation: 10,
        backgroundColor: 'white',
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
        elevation: 50,
    },
    valueBarcode: {
        fontFamily: 'aqua',
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    imageBG: {
        flex: 1,
        width: '100%',
        elevation: 2,
    },
    menuButtonContainer: {
        width: 25,
        height: 25,
        position: 'absolute',
        top: 20,
        left: 20,
    },
});