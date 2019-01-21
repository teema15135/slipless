import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';
import { Server } from './config/server';

var mainStyle = require('../styles/mainStyle');

export default class PointPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            points: {},
            total_point: 0
        }
    }

    componentDidMount() {
        this.getPoint();
    }

    getPoint = () => {
        var request = new XMLHttpRequest();
        var comp = this;
        request.open('GET', Server.path + '/point?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            var points = request.response.points;
            var arr_len = points.length;
            var total = 0;
            for(var i = 0; i < arr_len; i++) {
                points[i].key = i.toString();
                total += points[i].earned_point;
            }
            comp.setState({
                isLoading: false,
                points: points,
                total_point: total
            });
        }
    }

    space() {
        return (<View style={{ height: 1, width: '100%', backgroundColor: '#ececec' }} />)
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
                <View style={{ flex: 2, backgroundColor: 'white', elevation: 10 }}>
                    <ImageBackground source={require('../img/glass-green-water-blur.png')} style={mainStyle.imageBG}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 1 }}>
                                    {/* <Image style={{ top: 5, left: 5, width: 20, height: 20, marginLeft: 15 }} source={require('../img/left_arrow.png')} /> */}
                                </View>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontFamily: 'Poppins-Light', fontSize: 20, color: 'white', alignSelf: 'center' }}>Point</Text>
                                </View>
                                <View style={{ flex: 1 }}>

                                </View>
                            </View>
                            <View style={{ marginTop: 30 }}>
                                <Text style={{ fontFamily: 'Poppins-Light', fontSize: 100, color: 'white', alignSelf: 'center' }}>{this.state.total_point}</Text>
                                <Text style={{ fontFamily: 'Poppins-Light', fontSize: 15, color: 'white', alignSelf: 'center', elevation: 10 }}>total</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    <FlatList
                        data={this.state.points}
                        ItemSeparatorComponent={this.space}
                        renderItem={({ item }) =>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={style.listText}>{item.point_store_name}</Text>
                                <View style={{ width: 30, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Image style={{ width: 17, height: 17, alignSelf: 'center', marginRight: 5 }} source={require('../img/coin.png')} />
                                    <Text style={style.pointText}>{item.earned_point}</Text>
                                </View>
                            </View>
                        }
                    />
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