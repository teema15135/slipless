import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import ESlipScreen from './ESlipPage';
import BookmarkScreen from './BookmarkPage';
import HistoryScreen from './HistoryPage';
import SlipScreen from './Slip';

import { fromLeft } from 'react-navigation-transitions';

export default class App extends React.Component {
    render() {
        return (
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
        Slip: {
            screen: SlipScreen,
            path: '/:sid',
        },
        History: {
            screen: HistoryScreen,
            path: '/:sid'
        }
    },
    {
        initialRouteName: 'ESlip',
        headerMode: 'none',
        transitionConfig: () => fromLeft(1000)
    }
)

const ContainerStack = createAppContainer(Stack)
