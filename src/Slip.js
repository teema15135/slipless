import React from 'react';
import { StyleSheet, ScrollView, Text, View, Image } from 'react-native';
import { Server } from './config/server';

export default class Slip extends React.Component {
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center',}}>
                <Image source={{uri: (Server.path + '/image/slip/myimg') }} style={{ flex: 1 }}></Image>
            </View>
        );
    }
};