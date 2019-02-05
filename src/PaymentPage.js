import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, FlatList } from 'react-native';

var mainStyle = require('../styles/mainStyle');

var point = 10;

const list = [
    {
        key: '00',
        title: '7-Eleven',
        point: 1
    },
    {
        key: '01',
        title: 'Tesco Lotus',
        point: 2
    },
    {
        key: '02',
        title: 'Tesco Lotus Express',
        point: 3
    },
    {
        key: '03',
        title: 'B2S',
        point: 4
    },
];

export default class PaymentPage extends Component {

    space() {
        return (<View style={{ height: 1, width: '100%', backgroundColor: '#ececec' }} />)
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <View style={{ flex: 2 }}>
                    <ImageBackground source={require('../img/glass-green-water-blur.png')} style={mainStyle.imageBG}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontFamily: 'Poppins-Light', fontSize: 20, color: 'white', alignSelf: 'center' }}>Payment</Text>
                                </View>
                            </View>
                            <View style={{ flex: 5, marginTop: 30, backgroundColor: '#AAAAAA', flexDirection: 'column-reverse', justifyContent: 'flex-start', }}>
                                <View style={{ height: 150, backgroundColor: '#CCAA00' }}></View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    <FlatList
                        data={list}
                        ItemSeparatorComponent={this.space}
                        renderItem={({ item }) =>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={style.listText}>{item.title}</Text>
                                <View style={{ width: 30, flexDirection: 'row', justifyContent: 'center' }}>
                                    <Image style={{ width: 17, height: 17, alignSelf: 'center', marginRight: 5 }} source={require('../img/coin.png')} />
                                    <Text style={style.pointText}>{item.point}</Text>
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