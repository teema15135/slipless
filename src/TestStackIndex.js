import React, { Component } from 'react';
import { Button, View } from 'react-native';

import { createAppContainer, createStackNavigator } from 'react-navigation';
import { fromTop } from 'react-navigation-transitions';

import MainPage from './TestStackMain';
import SubPage from './TestStackSub';

export default class App extends Component {

  static navigationOptions = {
    drawerLabel: 'ทดสอบ',
  };

  render() {
    return (
      <ContainerStack />
    );
  }
}

const Stack = createStackNavigator(
  {
    Main: {
      screen: MainPage,
      path: '/',
    },
    Sub: {
      screen: SubPage,
      path: '/:name',
      navigationOptions: ({ navigation }) => ({
        title: `${navigation.state.params.name}'s Page`,
      }),
    }
  },
  {
    initialRouteName: 'Main',
    transitionConfig: () => fromTop(500),
  }
)

const ContainerStack = createAppContainer(Stack);