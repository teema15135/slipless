import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import PaymentPage from './PaymentPage';

export default class App extends React.Component {
    static navigationOptions = {
        title: 'การใช้จ่าย',
        headerMode: 'screen',
    }

    render() {
        return(
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        Payment: PaymentPage,
    },
    {
        initialRouteName: 'Payment',
        headerMode: 'none',
    }
)

const ContainerStack = createAppContainer(Stack)
