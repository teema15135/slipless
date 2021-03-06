import React from 'react';
import { Dimensions, StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import { Server } from './config/server';

export default class Slip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            uri: (Server.path + '/image/slip/' + this.props.navigation.state.params.sid)
        }
    }

    componentDidMount() {
        
    Image.getSize(this.state.uri, (width, height) => {
        var screenWidth = Dimensions.get('window').width * 0.75
        var scaleFactor = width / screenWidth
        var imageHeight = height / scaleFactor
        this.setState({width: screenWidth, height: imageHeight, isLoading: false })
      })
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
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>
                <View style={[{ flex: 1 }, Style.centerView]}></View>
                <View style={[{ flex: 7, flexDirection: 'row', justifyContent: 'center', alignContent: 'center' }, Style.centerView]}>
                    <View style={{ width: this.state.width }}>
                        <ScrollView style={{ backgroundColor: 'white', elevation: 2 }}>
                            <Image source={{ uri: this.state.uri }} style={{ width: this.state.width, height: this.state.height, alignSelf: 'center' }} />
                        </ScrollView>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    
                </View>
                <View style={{ flex: 1 }}></View>
            </View>
        );
    }
};

const Style = StyleSheet.create({
    centerView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
    }
});