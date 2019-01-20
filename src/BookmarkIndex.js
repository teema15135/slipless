import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import BookmarkPage from './BookmarkPage';

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
    },
    {
        initialRouteName: 'Bookmark',
        headerMode: 'none',

    }
)

const ContainerStack = createAppContainer(Stack)
