import React from "react";
import { DrawerItems, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Text, StyleSheet, Image, SafeAreaView, ScrollView, View, Dimensions, ImageBackground } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcon from 'react-native-vector-icons/SimpleLineIcons';

import HomeScreen from './HomeIndex';
import PointScreen from './PointIndex';
import ESlipScreen from './ESlipIndex';
import PaymentPage from './PaymentIndex';
import RewardScreen from './RewardIndex';

const { height, width } = Dimensions.get('window');
const drawerWidth = width * 0.45;

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
        let iconName;
        if (routeName === 'Home') {
          iconName = 'ios-qr-scanner' + (focused ? '' : '-outline');
          size = 50;
          return (
            <ImageBackground source={require('../img/home-icon-bg.png')} style={{
              width: 120,
              height: 120,
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
          iconName = 'ios-paper' + (focused ? '' : '-outline');
          size = 25;
        } else if (routeName === 'Point') {
          iconName = 'ios-bowtie' + (focused ? '' : '-outline');
          size = 25;
        } else if (routeName === 'Payment') {
          iconName = 'ios-cash' + (focused ? '' : '-outline');
          size = 25;
        } else if (routeName === 'Reward') {
          iconName = 'present';
          size = 25;
          return <SimpleLineIconCompoment name={iconName} size={size} color={tintColor} />
        }

        return <IconComponent name={iconName} size={size} color={tintColor} />;
      },
      tabBarLabel: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let labelName;
        if (routeName === 'Home') {
          labelName = '';
        } else if (routeName === 'Slip') {
          labelName = 'ใบเสร็จ';
        } else if (routeName === 'Point') {
          labelName = 'คะแนน';
        } else if (routeName === 'Payment') {
          labelName = 'การใช้จ่าย';
        } else if (routeName === 'Reward') {
          labelName = 'สิทธิพิเศษ';
        }

        return <Text style={style.labelText}>{labelName}</Text>
      }
    }),
    tabBarOptions: {
      activeTintColor: 'green',
      inactiveTintColor: 'gray',
    },
    initialRouteName: 'Home',
  }
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