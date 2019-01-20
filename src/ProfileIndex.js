import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ProfilePage from './ProfilePage';

export default class App extends React.Component {
    render() {
        return(
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        Home: {
            screen: HomePage,
        },
    },
    {
        initialRouteName: 'Home',
        headerMode: 'none',
    }
)

const ContainerStack = createAppContainer(Stack)
