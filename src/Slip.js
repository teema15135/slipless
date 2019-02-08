import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View, Image, TouchableOpacity } from 'react-native';
import { Server } from './config/server';
import Icon from 'react-native-vector-icons/Ionicons';
import RNFirebase from 'react-native-firebase';

export default class Slip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            uri: (Server.path + '/image/slip/' + this.props.navigation.state.params.sid),
            sid: this.props.navigation.state.params.sid,
            isFavorite: false
        }
    }

    componentDidMount() {
        var request = new XMLHttpRequest();
        request.open('GET', Server.path + '/bookmark?uid=' + RNFirebase.auth().currentUser.uid); //jifUBEXSfGVpkLHKyOHZDsVGS042'); // change uid to firebase auth
        request.responseType = 'json';
        request.send();
        request.onload = () => {
            request.response.bookmark.forEach(element => {
                if(this.state.sid == element.sid) {
                    this.setState({
                        isFavorite: true
                    });
                }
            });
        }
        Image.getSize(this.state.uri, (width, height) => {
            var screenWidth = Dimensions.get('window').width * 0.75;
            var scaleFactor = width / screenWidth;
            var imageHeight = height / scaleFactor;
            this.setState({ width: screenWidth, height: imageHeight, isLoading: false });
        });
    }

    changeBookmarkState() {
        var request = new XMLHttpRequest();
        request.open('DELETE', Server.path + '/bookmark?uid=' + RNFirebase.auth().currentUser.uid /*jifUBEXSfGVpkLHKyOHZDsVGS042*/ + '&sid=' + this.state.sid);
        request.responseType = 'json';
        request.send();
        request.onload = () => {
            if(!this.state.isFavorite) {
                var anotherRequest = new XMLHttpRequest();
                anotherRequest.open('POST', Server.path + '/bookmark?uid=' + RNFirebase.auth().currentUser.uid /*jifUBEXSfGVpkLHKyOHZDsVGS042*/ + '&sid=' + this.state.sid);
                anotherRequest.responseType = 'json';
                anotherRequest.setRequestHeader('Content-Type', 'application/json; charset=utf-8')
                anotherRequest.send(JSON.stringify({ slip_name: 'NewSlip' }));
                anotherRequest.onload = () => {
                    this.setState({
                        isFavorite: true
                    });
                }
            } else {
                this.setState({
                    isFavorite: false
                });
            }
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Text>Now Loading</Text>
                </View>
            );
        }
        return (
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                    <View style={[{ flex: 1 }, Style.centerView]}></View>
                    <View style={[{ flex: 7, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }, Style.centerView]}>
                        <View style={{ width: this.state.width }}>
                            <View style={{ backgroundColor: 'white', elevation: 2 }}>
                                <Image source={{ uri: this.state.uri }} style={{ width: this.state.width, height: this.state.height, alignSelf: 'center' }} />
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', height: 150, paddingRight: 30 }}>
                        <Text style={{marginRight: 20}}>Add to bookmark</Text>
                        <TouchableOpacity
                            onPress= {() => {
                                this.changeBookmarkState();
                            }}>
                        <Icon name={'ios-star-half'} size={30} color={(this.state.isFavorite?'yellow':'grey')} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ flex: 1 }}></View>
                </View>
            </ScrollView>
        );
    }
};

const Style = StyleSheet.create({
    centerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        paddingTop: 20,
    }
});