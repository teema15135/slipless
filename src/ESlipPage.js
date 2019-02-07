import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, ImageBackground,
    Button, FlatList, TouchableHighlight, TouchableOpacity,
    ProgressBarAndroid
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from "react-native-vector-icons/Ionicons";
import { Server } from './config/server';
// import { slipData } from '../data/historyData';
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
                    backgroundColor: 'white',
                    margin: 4,
                    overflow: 'hidden',
                }}>
                {/* <Text style={{
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'grey',
                    margin: 20
                }}>{this.props.item.slip}</Text> */}
                {/* 
                    Image.getSize(this.state.uri, (width, height) => {
                    var screenWidth = Dimensions.get('window').width * 0.75
                    var scaleFactor = width / screenWidth
                    var imageHeight = height / scaleFactor
                    this.setState({ width: screenWidth, height: imageHeight, isLoading: false })
                    });
                */}
                <TouchableOpacity
                    onPress={() => {
                        this.props.parentFlatList.props.navigation.navigate('Slip', {
                            sid: this.props.item.key,
                        });
                    }}
                    style={{
                        flexDirection: 'column',
                        backgroundColor: 'green',
                        width: 300,
                        height: 330,
                        justifyContent: 'center',
                        alignContent: 'center',
                        elevation: 3,
                    }}
                >
                    <Image source={{ uri: this.props.item.uri }} style={{ width: 200, height: '100%' }} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default class ESlipPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
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
                slips: slips
            });
        }
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
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <ProgressBarAndroid
                        styleAttr='Large'
                        indeterminate={true}
                        />
                </View>
            )
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../img/glass-green-water-blur.png')} style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                    }}>
                        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                            <View style={{ flex: 1 }}>
                                <Text style={{ fontFamily: 'Prompt-Light', fontSize: 30, color: 'white', alignSelf: 'center', marginTop: 40 }}>e-slip</Text>
                            </View>
                            <View style={{ flex: 4, flexDirection: 'row', justifyContent: 'flex-end', top: -20 }}>
                                <View style={{ width: 40, flexDirection: 'column', justifyContent: 'center' }}>
                                    <TouchableOpacity style={{ width: 50, height: 50, elevation: 2 }}
                                        activeOpacity={0.1}
                                        onPress={() => {
                                            // this.changeColor();
                                            // setTimeout(this.changeColor, 300);
                                            this.props.navigation.navigate('Bookmark');
                                        }}>
                                        <Icon name={'ios-star'} size={30} color={'white'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-end', backgroundColor: '#ECECEC' }}>
                    <View style={{ position: 'absolute', top: -120, height: 330 }}>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            style={{
                                marginLeft: 20
                            }}
                            horizontal={true}
                            data={this.state.slips}
                            renderItem={({ item, index }) =>
                                <SlipFlatListItem item={item} index={index} parentFlatList={this}>
                                </SlipFlatListItem>
                            }
                            keyExtractor={(item, index) => item.key}>
                        </FlatList>
                    </View>
                    <View style={{
                        marginBottom: 40,
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.navigate('History');
                            }}
                            style={{
                                flexDirection: 'column',
                                backgroundColor: '#21a775',
                                width: 140,
                                height: 25,
                                justifyContent: 'center',
                                alignContent: 'center',
                                marginTop: 7,
                                elevation: 1,
                                borderRadius: 10
                            }}
                        >
                            <Text style={{ textAlign: 'center', fontFamily: 'Prompt-Light', color: 'white' }}>สลิปทั้งหมด</Text>
                        </TouchableOpacity>
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