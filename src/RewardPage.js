import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, ImageBackground,
    FlatList, Alert, TouchableOpacity, StatusBar, ProgressBarAndroid
} from 'react-native';
import Modal from "react-native-modal";
import Icon from "react-native-vector-icons/Ionicons";
import { Item } from 'native-base';
import { Server } from './config/server';

var mainStyle = require('../styles/mainStyle');

const list = [
    {
        key: '00',
        title: '7-Eleven',
    },
    {
        key: '01',
        title: 'Tesco Lotus',
    },
    {
        key: '02',
        title: 'Tesco Lotus Express',
    },
    {
        key: '03',
        title: 'B2S',
    },
];

class RewardList extends Component {

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 320,
                    height: 150,
                    backgroundColor: 'white',
                    borderRadius: 10,
                    margin: 4,
                }}>
                <View style={{flexDirection: 'row', width: 300, justifyContent:'space-between', marginTop:5}}>
                    <View></View>
                    <View>
                        <Text style={{
                            fontFamily: 'Prompt-Medium',
                            fontSize: 16,
                            color: 'grey',
                            margin: 20,
                        }}>{/*this.props.item.key*/this.props.item.coupon_name}</Text>
                    </View>
                    <View>
                    <TouchableOpacity onPress={MyList._showAlert}>
                    <Icon
                                name="ios-trash"
                                color="#21a775"
                                size={30}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View>

                </View>
            </View>
        );
    }
}


export default class MyList extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            isModalVisible: false,
            currentStoreCoupons: [],
            allCoupons: [],
            storeList: []
        };
    }

    componentDidMount() {
        this._loadAllCoupon();
    }

    _toggleModal = () =>
        this.setState({ isModalVisible: !this.state.isModalVisible });

    space() {
        return (<View style={{ height: 1, width: '100%', backgroundColor: '#ececec' }} />)
    }

    static _showAlert = () => {
        Alert.alert(
            'ยืนยันการลบคูปอง',
            'ยังลบไม่ได้จ้า กร๊าก ยากมากแม่',
            [
                {
                    text: 'OK',
                    style: 'OK',
                },
                {
                    text: 'Cancel',
                    style:'cancel',
                }
            ],
            {cancelable:false},
        );
    }

    _loadAllCoupon = () => {
        var request = new XMLHttpRequest();
        var comp = this;
        request.open('GET', Server.path + '/coupon?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
        request.responseType = 'json';
        request.send();
        request.onload = function() {
            var coupons = request.response.coupon;
            var arr_len = coupons.length;
            var nameOfStores = [];
            for(var i = 0; i < arr_len; i++) {
                if(nameOfStores.indexOf(coupons[i].coupon_store) === -1) {
                    nameOfStores.push(coupons[i].coupon_store);
                }
            }
            var listOfStore = [];
            for(var i = 0; i < nameOfStores.length; i++) {
                var curKey = i.toString();
                listOfStore.push({
                    key: curKey,
                    name: nameOfStores[i]
                });
            }
            comp.setState({
                allCoupons: coupons,
                storeList: listOfStore,
                isLoading: false
            });
        }
    }

    _loadStoreCoupon = (storeName) => {
        var currentStoreCoupons = [];
        var allCoupons = this.state.allCoupons;
        var allLen = allCoupons.length;

        for(var i = 0; i < allLen; i++) {
            if (allCoupons[i].coupon_store == storeName) {
                currentStoreCoupons.push(allCoupons[i]);
            }
        }

        this.setState({
            currentStoreCoupons: currentStoreCoupons
        });
        this._toggleModal();
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
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#E0E0E0"
                />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../img/glass-green-water-blur.png')} style={mainStyle.imageBG}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginBottom: 150 }}>
                                <Text style={{ fontFamily: 'Prompt-Light', fontSize: 25, color: 'white', alignSelf: 'center' }}>สิทธิพิเศษ</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    <FlatList
                        data={/*list*/this.state.storeList}
                        ItemSeparatorComponent={this.space}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => this._loadStoreCoupon(item.name)}>
                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={style.listText}>{item.name}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                    <Modal
                        animationIn='slideInUp'
                        animationOut='slideOutDown'
                        backdropOpacity={0.60}
                        isVisible={this.state.isModalVisible}>
                        <View style={{ flex: 1, marginBottom: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <TouchableOpacity onPress={this._toggleModal}>
                                    <Icon
                                        name="ios-close-circle"
                                        color="#ffffff"
                                        size={30}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>
                                <FlatList
                                    // style={{ marginTop: 30, width: '100%'}}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={/*[
                                        { key: 'สิทธิ์ 1' },
                                        { key: 'สิทธิ์ 2' },
                                        { key: 'สิทธิ์ 3' },
                                        { key: 'สิทธิ์ 4' },
                                        { key: 'สิทธิ์ 5' },
                                        { key: 'สิทธิ์ 6' },
                                        { key: 'สิทธิ์ 7' },
                                        { key: 'สิทธิ์ 8' },
                                        { key: 'สิทธิ์ 9' },
                                        { key: 'สิทธิ์ 10' }
                                    ]*/this.state.currentStoreCoupons}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <RewardList item={item} index={index} parenFlatList={this}></RewardList>
                                        );
                                    }}>
                                </FlatList>
                            </View>
                        </View>
                    </Modal>

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
        fontFamily: 'Prompt-Light'
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