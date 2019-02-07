import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PointPage from './PointPage';

export default class App extends React.Component {
    static navigationOptions = {
        drawerLabel: 'คะแนนสะสม',
    };

    render() {
        return(
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        PointP: PointPage,
    },
    {
        initialRouteName: 'PointP',
        headerMode: 'none',
    }
)

const ContainerStack = createAppContainer(Stack)
