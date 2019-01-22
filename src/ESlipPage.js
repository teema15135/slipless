import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, ImageBackground,
    TouchableWithoutFeedback, Button, FlatList, TouchableHighlight
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import { Server } from './config/server';
import { slipData } from '../data/historyData';
import { ScrollView } from 'react-native-gesture-handler';
import { ScrollableTab } from 'native-base';

var mainStyle = require('../styles/mainStyle');

class SlipFlatListItem extends Component {
    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-start',
                    width: 200,
                    elevation: 10,
                    margin: 4,
                    overflow: 'hidden',
                }}>
                {/* <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'grey',
                    margin: 20
                }}>{this.props.item.slip}</Text> */}
                <TouchableWithoutFeedback
                            onPress={() => {
                                this.props.parentFlatList.props.navigation.navigate('Slip', {
                                    sid: this.props.item.key,
                                });
                            }}
                            style={{
                                flexDirection: 'column',
                                backgroundColor: 'green',
                                width: 150,
                                height: 30,
                                justifyContent: 'center',
                                alignContent: 'center',
                                elevation: 3,
                                borderRadius: 15
                            }}
                        >
                    <Image source={{ uri: this.props.item.uri }} style={{ width: 200, height: "100%" }} />
                </TouchableWithoutFeedback>
            </View>
        );
    }
}

export default class ESlipPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            bookmarkColor: 'white',
            slips: []
        }
    }

    componentDidMount() {
        this.loadRecentSlip();
    }

    loadRecentSlip = () => {
        var request = new XMLHttpRequest();
        var comp = this;
        request.open('GET', Server.path + '/allSlip?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            var loadSlips = request.response.slips;
            loadSlips = loadSlips.reverse();
            var slips = [];
            var slip_len = (loadSlips.length > 6 ? 6 : loadSlips.length);
            for (var i = 0; i < slip_len; i++) {
                slips.push({
                    key: loadSlips[i].slip_id,
                    uri: Server.path + '/image/slip/' + loadSlips[i].slip_id
                });
                if (i == 5) break;
            }
            comp.setState({
                isLoading: false,
                bookmarkColor: 'white',
                slips: slips
            });
        }
    }

    changeColor = () => {
        if (this.state.bookmarkColor == 'pink')
            this.setState({
                bookmarkColor: 'white'
            });
        else
            this.setState({
                bookmarkColor: 'pink'
            });
    }

    static navigationOptions = {
        drawerLabel: 'ใบเสร็จของคุณ',
    };

    handleClick = () => {
        alert('Button clicked');
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Now Loading</Text>
                </View>
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flex: 2 }}>
                    <ImageBackground source={require('../img/glass-green-water-blur.png')} style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: 'Poppins-Bold', fontSize: 35, color: 'white', alignSelf: 'center', marginTop: 20 }}>e-slip</Text>
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <View style={{ width: 40, flexDirection: 'column', justifyContent: 'center' }}>
                                    <TouchableWithoutFeedback style={{ width: 50, height: 50 }}
                                        onPress={() => {
                                            this.changeColor();
                                            setTimeout(this.changeColor, 300);
                                            this.props.navigation.navigate('Bookmark');
                                        }}>
                                        <MaterialIcon name={'heart-circle-outline'} size={30} color={this.state.bookmarkColor} />
                                    </TouchableWithoutFeedback>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: '#ECECEC' }}>
                    <View style={{ position: 'absolute', top: -50, height: 330 }}>
                        <FlatList
                            style={{
                                marginLeft: 20
                                //backgroundColor: 'white',
                            }}
                            horizontal={true}
                            data={this.state.slips}
                            renderItem={({ item, index }) =>
                                <SlipFlatListItem item={item} index={index} parentFlatList={this}>
                                </SlipFlatListItem>
                            }
                            keyExtractor={(item, index) => item.slip}>
                        </FlatList>
                    </View>
                    <View style={{
                        marginBottom: 40,
                        borderWidth: 2, 
                        orderColor: 'black',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        }}>
                        <TouchableHighlight
                            onPress={() => {
                                // go to all slip page
                            }}
                            style={{
                                flexDirection: 'column',
                                backgroundColor: 'green',
                                width: 150,
                                height: 30,
                                justifyContent: 'center',
                                alignContent: 'center',
                                elevation: 3,
                                borderRadius: 15
                            }}
                        >
                            <Text style={{ textAlign: 'center', fontFamily: 'Prompt-Bold', fontWeight: 'bold', color: 'white' }}>สลิปทั้งหมด</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View >
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