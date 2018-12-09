import React from "react";
import { DrawerItems, createAppContainer, createDrawerNavigator } from 'react-navigation';
import { Text, StyleSheet, TouchableHighlight, Image, SafeAreaView, ScrollView, View, Dimensions } from 'react-native';

import HomeScreen from './HomeBarcode';
import PointScreen from './PointPage';

const profileURI = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRKumwtyvNNvq7clbwOA2XKKPAi4nIwZK_ViJCHGoy-gCx8mfvs';
var displayName = 'ถั่วงอก';

const { height, width } = Dimensions.get('window');
const drawerWidth = width * 0.45;

const ProfileComponent = (props) => (
  <SafeAreaView style={{ flex: 1, backgroundColor: 'rgba(15, 42, 21, 0.93)' }}>
    <View style={{ height: 80, flexDirection: 'row', justifyContent: 'flex-start', }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }}>
        <Image source={{ uri: profileURI }} style={style.profileImg} />
      </View>
      <View style={{ flex: 2, flexDirection: 'column', justifyContent: 'center' }}>
        <Text style={style.displayName}>{displayName}</Text>
      </View>
    </View>
    <ScrollView>
      <DrawerItems {...props} />
    </ScrollView>
  </SafeAreaView>
)

const Drawer = createDrawerNavigator(
  {
    Home: HomeScreen,
    Point: PointScreen,
  },
  {
    drawerWidth: drawerWidth,
    drawerBackgroundColor: 'transparent',
    contentComponent: ProfileComponent,
  }
);


const ContainerDrawer = createAppContainer(Drawer);

export default class App extends React.Component {
  render() {
    return (
      <ContainerDrawer />
    );
  }
}

const style = StyleSheet.create({
  profileImg: {
    height: 45,
    width: 45,
    borderRadius: 40,
    margin: 20,
  },
  displayName: {
    color: 'white',
    fontSize: 20,
    paddingLeft: 20,
    alignSelf: 'baseline',
    fontFamily: 'Prompt-Light',
  },
});