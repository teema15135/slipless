import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import RewardPage from './RewardPage';

export default class App extends React.Component {
    render() {
        return(
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        Reward: RewardPage,
    },
    {
        initialRouteName: 'Reward',
        headerMode: 'none',
    }
)

const ContainerStack = createAppContainer(Stack)
