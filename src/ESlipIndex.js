import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ESlipPage from './ESlipPage';

export default class App extends React.Component {
    render() {
        return(
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        ESlip: ESlipPage,
    },
    {
        initialRouteName: 'ESlip',
        headerMode: 'none',
    }
)

const ContainerStack = createAppContainer(Stack)
