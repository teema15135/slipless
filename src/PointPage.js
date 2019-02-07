import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Image, ImageBackground, FlatList, ProgressBarAndroid } from 'react-native';
import { Server } from './config/server';
import { ListItem, Icon } from 'react-native-elements'

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
        request.onload = function () {
            var points = request.response.points;
            var arr_len = points.length;
            var total = 0;
            for (var i = 0; i < arr_len; i++) {
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

    renderItem = ({ item }) => (
        <ListItem
            title={
                <Text style={{ fontFamily: 'FredokaOne-Regular' }}>{item.point_store_name}</Text>
            }
            subtitle={
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={{ fontFamily: 'aqua', fontSize: 12 }}>{item.earned_point} point</Text>
                    <Icon
                        name='chevron-left'
                        type='entypo'
                        color='#E5E7E9'
                    />
                </View>
            }
            leftAvatar={{ source: { uri: 'https://firebasestorage.googleapis.com/v0/b/sliplessdemo.appspot.com/o/avatar-coin.png?alt=media&token=8a587768-e9d7-435d-82a9-46098e341d93' } }}
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
                <View style={{ flex: 1, backgroundColor: 'white', elevation: 10 }}>
                    <View style={{
                        flex: 1,
                        width: '100%',
                        flexDirection: 'column',
                        justifyContent: 'flex-start',
                        backgroundColor: '#344856'
                    }}>
                        {/* <ImageBackground source={require('../img/glass-green-water-blur.png')} style={mainStyle.imageBG}> */}
                        <View style={{ flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>


                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 20, color: 'white', alignSelf: 'center' , fontFamily: 'FredokaOne-Regular'}}>Point</Text>

                            <View style={{ width: 150, height: 150, borderRadius: 150 / 2, backgroundColor: '#d97d54', alignItems: 'center', justifyContent:'center', marginTop: 20 }}>
                                <Text style={{ fontFamily: 'aqua', fontSize: 50, color: 'white', alignSelf: 'center',  }}>{this.state.total_point}</Text>
                            </View>
                            <Text style={{ fontFamily: 'Poppins-Light', fontSize: 15, color: 'white', alignSelf: 'center', elevation: 10 , fontFamily:'aqua', marginTop: 10}}>total</Text>

                        </View>
                        {/* </ImageBackground> */}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: 'white' }}>
                    <FlatList
                        data={this.state.points}
                        ItemSeparatorComponent={this.space}
                        renderItem={this.renderItem}
                        
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
        alignSelf: 'center'
    },
    separator: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'grey',
    },
    pointText: {
        fontSize: 13,
        alignSelf: 'center',
        paddingRight: 20,
    }
});