import React, { Component } from 'react';
import { View, Text } from 'react-native';

import { Color } from './config/color';

export default class App extends Component {
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

    render() {
        return (
            <View>
                <Text>Bookmark Page</Text>
            </View>
        );
    }
}