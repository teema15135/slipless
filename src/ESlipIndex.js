import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ESlipScreen from './ESlipPage';
import BookmarkScreen from './BookmarkIndex';

export default class App extends React.Component {
    render() {
        return(
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        ESlip: {
            screen: ESlipScreen,
            path: '/',
        },
        Bookmark: {
            screen: BookmarkScreen,
            path: '/bm',
        },
    },
    {
        initialRouteName: 'ESlip',
        headerMode: 'none',

    }
)

const ContainerStack = createAppContainer(Stack)
