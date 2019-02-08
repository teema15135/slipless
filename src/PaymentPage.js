import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, FlatList, TouchableOpacity, ProgressBarAndroid } from 'react-native';
import { Server } from './config/server';
import { ListItem, Icon } from 'react-native-elements';
import RNFirebase from 'react-native-firebase';

//87bcbf

var mainStyle = require('../styles/mainStyle');

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
        this.setState({
            isLoading: true
        });
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
        request.open('GET', Server.path + '/allSlip?uid=' + RNFirebase.auth().currentUser.uid); //jifUBEXSfGVpkLHKyOHZDsVGS042');
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
            for (var i = 0; i < arr_len; i++) {
                var curSlip = slips[i];
                total += curSlip.total_price;
                if (Number(curSlip.slip_id) >= startWeek) weekly += curSlip.total_price;
                if (Number(curSlip.slip_id) >= startMonth) monthly += curSlip.total_price;
                for (var j = 0; j <= storeList.length; j++) {
                    if (j == storeList.length) {
                        storeList.push({
                            store_name: curSlip.store_name,
                            store_total: curSlip.total_price,
                            key: storeKey.toString()
                        });
                        storeKey++;
                        break;
                    }
                    if (storeList[j].store_name == curSlip.store_name) {
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

    renderItem = ({ item }) => (
        <ListItem
            title={
                <Text style={{ fontFamily: 'Prompt-Medium' }}>{item.store_name}</Text>
            }
            subtitle={
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'Prompt-Light', fontSize: 12 }}>{item.store_total} ฿</Text>
                    <Icon
                        name='chevron-left'
                        type='entypo'
                        color='#E5E7E9'
                    />
                </View>
            }
            leftAvatar={{ source: { uri: 'https://firebasestorage.googleapis.com/v0/b/sliplessdemo.appspot.com/o/avatar-bill.png?alt=media&token=8eb49480-dbac-4a92-b2b7-8999364bbd15' } }}
        />
    )

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
                <View style={{
                    flex: 2, width: '100%', flexDirection: 'column', justifyContent: 'flex-start',
                    backgroundColor: '#87bcbf'
                }}>
                    <TouchableOpacity
                        onPress = {() => {this._loadPayment()}}
                    >
                        <Text style={{ fontFamily: 'FredokaOne-Regular', fontSize: 30, color: 'white', alignSelf: 'center', marginTop: 40 }}>Payment</Text>
                    </TouchableOpacity>

                    {/* <ImageBackground source={require('../img/glass-green-water-blur.png')} style={mainStyle.imageBG}>
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
                    </ImageBackground> */}
                </View>
                <View style={{ flex: 3, flexDirection: 'column', justifyContent: 'flex-start', top: -70 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: 20 }}>
                        <View style={{ backgroundColor: '#d97d54', width: 100, height: 130, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ fontFamily: 'aqua', fontSize: 20 }}>{this.state.weeklyPayment}</Text>
                            <Text style={{ fontFamily: 'aqua' }}>weekly</Text>
                        </View>
                        <View style={{ backgroundColor: '#d97d54', width: 100, height: 130, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ fontFamily: 'aqua', fontSize: 22 }}>{this.state.totalPayment}</Text>
                            <Text style={{ fontFamily: 'aqua' }}>total</Text>
                        </View>
                        <View style={{ backgroundColor: '#d97d54', width: 100, height: 130, justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                            <Text style={{ fontFamily: 'aqua', fontSize: 20 }}>{this.state.monthlyPayment}</Text>
                            <Text style={{ fontFamily: 'aqua' }}>monthly</Text>
                        </View>
                    </View>
                    <View style={{ height: 278 }}>
                        <FlatList
                            data={this.state.storePayment}
                            ItemSeparatorComponent={this.space}
                            keyExtractor={(item, index) => item.key}
                            renderItem={this.renderItem}
                        />
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