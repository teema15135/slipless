import React, { Component } from 'react';
import { Button, View } from 'react-native';

export default class App extends Component {

    static navigationOptions = {
        drawerLabel: 'ทดสอบ',
    };

    render() {
        return (
            <View>
                <Button
                    onPress={
                        () => this.props.navigation.navigate('Sub', {
                            name: 'NoJames',
                        })
                    }
                    title="James"
                />
            </View>
        );
    }
}