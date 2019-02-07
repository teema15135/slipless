import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, FlatList, ProgressBarAndroid } from 'react-native';
import { Server } from './config/server';

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

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            weeklyPayment: 0,
            totalPayment: 0,
            monthlyPayment: 0,
            storePayment: []
        }
    }

    _loadPayment() {
        
        var nowDate = new Date();

        var startWeek = new Date();
        startWeek.setDate(nowDate.getDate() - nowDate.getDay());
        startWeek.setHours(0, 0, 0, 0);
        startWeek = Number(startWeek);
        
        var startMonth = new Date();
        startMonth.setDate(1);
        startMonth.setHours(0, 0, 0, 0);
        startMonth = Number(startMonth);

        var comp = this;
        
        var request = new XMLHttpRequest();
        request.open('GET', Server.path + '/allSlip?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
        request.responseType = 'json';
        request.send();
        request.onload = () => {
            var slips = request.response.slips;
            var arr_len = slips.length;
            var total = 0; //
            var monthly = 0; //
            var weekly = 0; //
            var storeList = [];
            var storeKey = 0;
            for(var i = 0; i < arr_len; i++) {
                var curSlip = slips[i];
                total += curSlip.total_price;
                if(Number(curSlip.slip_id) >= startWeek) weekly += curSlip.total_price;
                if(Number(curSlip.slip_id) >= startMonth) monthly += curSlip.total_price;
                for(var j = 0; j <= storeList.length; j++) {
                    if(j == storeList.length) {
                        storeList.push({
                            store_name: curSlip.store_name,
                            store_total: curSlip.total_price,
                            key: storeKey.toString()
                        });
                        storeKey++;
                        break;
                    }
                    if(storeList[j].store_name == curSlip.store_name) {
                        storeList[j].store_total += curSlip.total_price;
                        break;
                    }
                }
            }
            comp.setState({
                isLoading: false,
                weeklyPayment: weekly,
                monthlyPayment: monthly,
                totalPayment: total,
                storePayment: storeList
            });
        }
    }

    componentDidMount() {
        this._loadPayment();
    }

    space() {
        return (<View style={{ height: 1, width: '100%', backgroundColor: '#ececec' }} />)
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
                <View style={{ flex: 2 }}>
                    <ImageBackground source={require('../img/glass-green-water-blur.png')} style={mainStyle.imageBG}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}>
                                <View style={{ flex: 3 }}>
                                    <Text style={{ fontFamily: 'Poppins-Light', fontSize: 20, color: 'white', alignSelf: 'center' }}>Payment</Text>
                                </View>
                            </View>
                            <View style={{ flex: 5, marginTop: 30, backgroundColor: '#AAAAAA', flexDirection: 'column-reverse', justifyContent: 'flex-start', }}>
                                <View style={{ width: '100%', flexDirection: 'row', height: 70, backgroundColor: '#CCAA00' }}>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#12DA00' }}>
                                        <Text>{this.state.weeklyPayment}</Text>
                                        <Text>weekly</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#35BBA9' }}>
                                        <Text>{this.state.totalPayment}</Text>
                                        <Text>total</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', backgroundColor: '#4422AB' }}>
                                        <Text>{this.state.monthlyPayment}</Text>
                                        <Text>monthly</Text>
                                    </View>                                    
                                </View>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    <FlatList
                        data={this.state.storePayment}
                        ItemSeparatorComponent={this.space}
                        keyExtractor={(item, index) => item.key}
                        renderItem={({ item }) =>
                            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={style.listText}>{item.store_name}</Text>
                                <View style={{ width: 60, flexDirection: 'row', justifyContent: 'flex-end' }}>
                                    <Text style={style.pointText}>{item.store_total}</Text>
                                    <Image style={{ width: 17, height: 17, alignSelf: 'center', marginRight: 5 }} source={require('../img/coin.png')} />
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