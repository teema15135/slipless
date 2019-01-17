import React, { Component } from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginPage from './LoginScreen';
import MainPage from './App';

export default class App extends Component {
    render() {
        return (
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        Login: {
            screen: LoginPage,
            path: '/',
        },
        Main: {
            screen: MainPage,
            path: '/main',
        }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)

const ContainerStack = createAppContainer(Stack);