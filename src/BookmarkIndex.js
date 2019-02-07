import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import BookmarkPage from './BookmarkPage';
import Slip from './Slip';

export default class App extends React.Component {
    render() {
        return(
            <ContainerStack />
        );
    }
}

const Stack = createStackNavigator(
    {
        Bookmark: {
            screen: BookmarkPage,
        },
        Slip: {
            screen: Slip
        }
    },
    {
        initialRouteName: 'Bookmark',
        headerMode: 'none',

    }
)

const ContainerStack = createAppContainer(Stack)
