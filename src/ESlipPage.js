import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, Image, ImageBackground,
    TouchableWithoutFeedback, Button, FlatList
} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';

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

class MaterialIconChangeColor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookmarkColor: 'white'
        }
    }
}


export default class ESlipPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            bookmarkColor: 'white'
        }
    }

    changeColor = () => {
        if(this.state.bookmarkColor == 'pink')
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
                                        <MaterialIcon name={'tag-heart'} size={30} color={this.state.bookmarkColor} />
                                    </TouchableWithoutFeedback>
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