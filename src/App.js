import React from "react";
import { DrawerItems, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Text, StyleSheet, Image, SafeAreaView, ScrollView, View, Dimensions } from 'react-native';

import HomeScreen from './HomeBarcode';
import PointScreen from './PointIndex';

import TestScreen from './TestStackIndex';

const profileURI = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKumwtyvNNvq7clbwOA2XKKPAi4nIwZK_ViJCHGoy-gCx8mfvs';
var displayName = 'ถั่วงอก';

const { height, width } = Dimensions.get('window');
const drawerWidth = width * 0.45;

export default class App extends React.Component {
  render() {
    return (
      <ContainerDrawer />
    );
  }
}

const ProfileComponent = (props) => (
  <SafeAreaView style={styles.sideBarContainer}>
    <View style={styles.profileContainer}>
      <View style={styles.profileImgContainer}>
        <Image source={{ uri: profileURI }} style={styles.profileImg} />
      </View>
      <View style={styles.profileNameContainer}>
        <Text style={styles.displayName}>{displayName}</Text>
      </View>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  profileImg: {
    height: 45,
    width: 45,
    borderRadius: 40,
    margin: 20,
  },
  displayName: {
    color: 'white',
    fontSize: 18,
    paddingLeft: 20,
    alignSelf: 'baseline',
    fontFamily: 'Prompt-Light',
  },
  sideBarContainer: {
    flex: 1,
    backgroundColor: 'rgba(15, 42, 21, 0.93)',
  },
  profileContainer: {
    height: 80,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  profileImgContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  profileNameContainer: {
    flex: 2,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  labelStyle: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Prompt-Light',
    fontWeight: '100',
  },
});

const Drawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Point: PointScreen,
    Test: TestScreen,
  },
  {
    initialRouteName: 'Home',
    useNativeAnimations: 'false',
    drawerWidth: drawerWidth,
    drawerBackgroundColor: 'transparent',
    contentComponent: ProfileComponent,
    backBehavior: 'initialRoute',
    contentOptions: {
      labelStyle: styles.labelStyle,
    },
  },
);


const ContainerDrawer = createAppContainer(Drawer);