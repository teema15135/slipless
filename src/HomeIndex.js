import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { fromLeft } from 'react-navigation-transitions';

import HomePage from './HomeBarcode';
import ProfilePage from './ProfilePage';

export default class App extends React.Component {
    render() {
        return (
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        Home: {
            screen: HomePage,
        },
        Profile: {
            screen: ProfilePage,
        }
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
        transitionConfig: () => fromLeft(1000),
    }
)

const ContainerStack = createAppContainer(Stack)
