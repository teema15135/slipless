import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, ImageBackground,
    TouchableHighlight, Button, FlatList
} from 'react-native';

import { slipData } from '../data/historyData';

var mainStyle = require('../styles/mainStyle');

class SlipFlatListItem extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 200,
                    borderWidth: 1,
                    borderColor: 'grey',
                    margin: 4,
                }}>

                <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'grey',
                    margin: 20
                }}>{this.props.item.slip}</Text>
            </View>
        );
    }
}


export default class ESlipPage extends Component {

    static navigationOptions = {
        drawerLabel: 'ใบเสร็จของคุณ',
    };

    handleClick = () => {
        alert('Button clicked');
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flex: 2 }}>
                    <ImageBackground source={require('../img/darkforest.png')} style={mainStyle.imageBG}>
                        <View style={{ flexDirection: 'column'}}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    {/* <Image style={{ top: 5, left: 5, width: 20, height: 20, marginLeft: 15 }} source={require('../img/left_arrow.png')} /> */}
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontFamily: 'Poppins-Light', fontSize: 20, color: 'white', alignSelf: 'center' }}>e-slip</Text>
                                </View>
                                <View style={{ flex: 1 }}>
                                    <TouchableHighlight style={{width: 50, height: 50, position: 'absolute', top: 20}}
                                    onPress={() => {
                                        this.props.navigation.navigate('Bookmark');
                                    }}>
                                        <Text>BM</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: '#ECECEC' }}>
                    <View style={{ position: 'absolute', top: -50, height: 330 }}>
                        <FlatList
                            style={{
                                marginLeft: 20
                                //backgroundColor: 'white',
                            }}
                            horizontal={true}
                            data={slipData}
                            renderItem={({ item, index }) => {
                                return (
                                    <SlipFlatListItem item={item} index={index} parenFlatList={this}>
                                    </SlipFlatListItem>
                                );
                            }}
                            keyExtractor={(item, index) => item.slip}>
                        </FlatList>
                    </View>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    listText: {
        margin: 10,
        fontSize: 15,
        color: '#202020',
    },
    separator: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
    },
    pointText: {
        fontSize: 13,
        alignSelf: 'center',
        paddingRight: 10
    }
});