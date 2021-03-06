import React from "react";
import { DrawerItems, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Text, StyleSheet, Image, SafeAreaView, ScrollView, View, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';
import MatMaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ListItem, Icon } from 'react-native-elements'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './HomeIndex';
import PointScreen from './PointIndex';
import ESlipScreen from './ESlipIndex';
import PaymentPage from './PaymentIndex';
import RewardScreen from './RewardIndex';

export default class App extends React.Component {
  render() {
    return (
      <ContainerDrawer />
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Slip: ESlipScreen,
  Point: PointScreen,
  Home: HomeScreen,
  Payment: PaymentPage,
  Reward: RewardScreen,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let SimpleLineIconCompoment = SimpleLineIcon;
        let MatMaterialComponent = MatMaterialIcons;
        let Materialcomponent = MaterialIcons;
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-qr-scanner';
          size = 50;
          return (
            <ImageBackground source={require('../img/home-icon-bg-new.png')} style={{
              top: -10,
              width: 110,
              height: 110,
              flexDirection: 'column',
              justifyContent: 'center',
              elevation: 1,
              shadowRadius: 100,
              shadowColor: 'black',
              shadowOpacity: 0.5,
              shadowOffset: { width: 10, height: 10 },
            }}>
              <IconComponent name={iconName} size={size} color={tintColor} style={{ alignSelf: 'center' }} />
            </ImageBackground>
          )
        } else if (routeName === 'Slip') {
          iconName = 'md-paper';
          size = (focused ? 25 : 25);
          padTop = (focused ? 0 : 10);
          return <IconComponent name={iconName} size={size} color={tintColor} style={{ paddingTop: padTop }} />;
        } else if (routeName === 'Point') {
          iconName = 'trophy';
          size = (focused ? 25 : 20);
          padTop = (focused ? 0 : 10);
          return <SimpleLineIconCompoment name={iconName} size={size} color={tintColor} style={{ paddingTop: padTop }} />
        } else if (routeName === 'Payment') {
          iconName = 'attach-money';
          size = (focused ? 25 : 24);
          padTop = (focused ? 0 : 10);
          return <Materialcomponent name={iconName} size={size} color={tintColor} style={{ paddingTop: padTop }} />;
        } else if (routeName === 'Reward') {
          iconName = 'present';
          size = (focused ? 25 : 22);
          padTop = (focused ? 0 : 10);
          return <SimpleLineIconCompoment name={iconName} size={size} color={tintColor} style={{ paddingTop: padTop }} />
        }

        return <IconComponent name={iconName} size={size} color={tintColor} />;
      },
      tabBarLabel: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let labelName;
        if (routeName === 'Home') {
          labelName = '';
        } else if (routeName === 'Slip') {
          labelName = (focused ? 'ใบเสร็จ' : '');
        } else if (routeName === 'Point') {
          labelName = (focused ? 'คะแนน' : '');
        } else if (routeName === 'Payment') {
          labelName = (focused ? 'การใช้จ่าย' : '');
        } else if (routeName === 'Reward') {
          labelName = (focused ? 'คูปอง' : '');
        }

        return <Text style={style.labelText}>{labelName}</Text>
      },
    }),
    tabBarOptions: {
      activeTintColor: '#344856',
      inactiveTintColor: 'grey',
    },
    initialRouteName: 'Home',
  },
);

const ContainerDrawer = createAppContainer(TabNavigator);

const style = StyleSheet.create({
  labelText: {
    fontFamily: 'Prompt-Light',
    alignSelf: 'center',
    fontSize: 10,
    color: '#202020',
  },
});