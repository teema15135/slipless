import React, { Component } from 'react';
import { Button, TouchableHighlight, StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import Barcode from 'react-native-barcode-builder';

// const instructions = Platform.select({
//   ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
//   android:
//     'Double tap R on your keyboard to reload,\n' +
//     'Shake or press menu button for dev menu',
// });

// const valueOfBarcode = "593040659-4";

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

    newBarcode = () => {
        var request = new XMLHttpRequest();
        request.responseType = 'json';
        var comp = this;
        request.onload = function () {
            console.log(request.response);
            comp.setState({
                isLoading: false,
                valueOfBarcode: request.response.barcode_num,
            });
        };
        request.open('GET', 'http://localhost:8065/getBarcode?email=chompu.luffy@gmail.com');
        request.send();
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                <Button
                    onPress={this.newBarcode}
                    title="Get New Barcode"
                />
                </View>
            );
        }
        return (
            <View>
                <Barcode value={this.state.valueOfBarcode} format="CODE128" />
                <Text style={styles.valueBarcode}>{this.state.valueOfBarcode}</Text>
                <Button
                    onPress={this.newBarcode}
                    title="Get New Barcode"
                /> 
            </View>
        );
    }
}

export default class HomeBarcode extends React.Component {
    static navigationOptions = {
        drawerLabel: 'บาร์โค้ด',
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.containerTop}>
                    <ImageBackground source={require('../img/darkforest.png')} style={styles.imageBG}>
                        {/* <TouchableHighlight style={styles.menuButtonContainer} onPress={() => this.props.navigation.openDrawer()}>
                            <Image source={require('../img/menu.png')} style={styles.menuButton} />
                        </TouchableHighlight> */}
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <Text style={styles.slipless}>Slipless</Text>
                        </View>
                    </ImageBackground>
                </View>
                <View style={styles.containerBottom}>
                    <UserBarcode></UserBarcode>
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