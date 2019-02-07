import React, { Component } from 'react';
import {
    Platform, StyleSheet, Text, View, ImageBackground,
    FlatList, Alert, TouchableOpacity, StatusBar, Image
} from 'react-native';
import { Color } from './config/color';
import { Server } from './config/server';

var mainStyle = require('../styles/mainStyle');

//
//
// FlatList class
//
//
class BookmarkList extends Component {

    render() {
        return (
            <View
                style={{
                    marginTop: 20,
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    alignSelf: 'center',
                    width: 320,
                    height: 130,
                    backgroundColor: 'white',
                    margin: 4,
                    marginBottom: 5
                }}>
                <View style={{ flexDirection: 'row', width: 300, justifyContent: 'space-between', marginTop: 5 }}>
                    {/* for center content */}
                    <View>
                        <Image
                            style={{ width: 100, height: 150, position:'absolute' , top:-20}}
                            // source={require('../img/bookmark2-bg.jpg')}
                            source={{ uri: this.props.item.uri }}
                        />
                    </View>
                    <View style={{flexDirection: 'row', width: 150}}>
                        <Text style={{fontFamily: 'Prompt-Medium',fontSize: 16,color: 'grey',margin: 20,marginLeft: 20,}}>
                            {this.props.item.name}
                        </Text>
                    </View>

                </View>
            </View>
        );
    }
}



export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            bookmarks: []
        }
    }

    componentDidMount() {
        this.loadBookmarkSlip();
    }

    loadBookmarkSlip = () => {
        var request = new XMLHttpRequest();
        var comp = this;
        request.open('GET', Server.path + '/bookmark?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
        request.responseType = 'json';
        request.send();
        request.onload = function () {
            var loadBookmarks = request.response.bookmark;
            loadBookmarks = loadBookmarks.reverse();
            var bms = [];
            var slip_len = loadBookmarks.length
            for (var i = 0; i < slip_len; i++) {
                bms.push({
                    key: loadBookmarks[i].sid,
                    uri: Server.path + '/image/slip/' + loadBookmarks[i].sid,
                    name: loadBookmarks[i].slip_name,
                });
            }
            comp.setState({
                isLoading: false,
                bookmarks: bms
            });
        }
    }

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="#E0E0E0"
                />
                <View style={{ flex: 1 }}>
                    <ImageBackground source={require('../img/bookmark2-bg.jpg')} style={mainStyle.imageBG}>
                        <View style={{ flexDirection: 'column' }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', marginBottom: 150 }}>
                                <Text style={{ fontFamily: 'Prompt-Light', fontSize: 25, color: 'white', alignSelf: 'center', marginTop: 50 }}>Bookmark</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
                <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'flex-start', backgroundColor: '#F2F3F4' }}>
                    <View style={{ width: '100%', top: -70, height: 600 }}>
                        <FlatList
                            // style={{ position: 'absolute' }}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            data={/*[
                                { key: 'Bookmark 1' },
                                { key: 'Bookmark 2' },
                                { key: 'Bookmark 3' },
                                { key: 'Bookmark 4' },
                                { key: 'Bookmark 5' },
                                { key: 'Bookmark 6' },
                                { key: 'Bookmark 7' },
                                { key: 'Bookmark 8' },
                                { key: 'Bookmark 9' },
                                { key: 'Bookmark 10' }
                            ]*/this.state.bookmarks}
                            renderItem={({ item, index }) => {
                                return (
                                    <BookmarkList item={item} index={index} parenFlatList={this}></BookmarkList>
                                );
                            }}>
                        </FlatList>
                    </View>

                </View>
            </View>
        );
    }
}




    // static navigationOptions = () => ({
    //     title: 'Bookmark',
    //     headerTintColor: 'black',
    //     headerStyle: {
    //         backgroundColor: Color.headerBookmark,
    //         justifyContent: 'center',
    //         flexDirection: 'row',
    //     },
    //     headerLeft:
    //         <Text>5</Text>,
    //     headerRight:
    //         <Text>6</Text>
    // });