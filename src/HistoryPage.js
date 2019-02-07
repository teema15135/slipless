import React, { Component } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, ProgressBarAndroid } from "react-native";
import { ListItem, Icon } from 'react-native-elements'
import { Server } from './config/server';
import { format } from 'date-fns'

//d97d54

export default class HistoryPage extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      slips: []
    }
  }

  componentDidMount() {
    this.loadHistorySlip();
  }

  loadHistorySlip = () => {
    var request = new XMLHttpRequest();
    var comp = this;
    request.open('GET', Server.path + '/allSlip?uid=jifUBEXSfGVpkLHKyOHZDsVGS042');
    request.responseType = 'json';
    request.send();
    request.onload = function () {
      var loadSlips = request.response.slips;
      loadSlips = loadSlips.reverse();
      var slips = [];
      var slip_len = loadSlips.length;

      for (var i = 0; i < slip_len; i++) {

        slips.push({
          key: loadSlips[i].slip_id,
          uri: Server.path + '/image/slip/' + loadSlips[i].slip_id,
          name: loadSlips[i].store_name,
          date: format(new Date(loadSlips[i].date_time), 'D MMMM YYYY, H:mm a')
        });
      }
      comp.setState({
        isLoading: false,
        slips: slips
      });
    }
  }

  space() {
    return (<View style={{ height: 1, width: '100%', backgroundColor: '#ececec' }} />)
  }

  keyExtractor = (item, index) => item.key

  renderItem = ({ item }) => (
      <ListItem
        title={
          <Text style={{ fontFamily: 'Prompt-Medium' }}>{item.name}</Text>
        }
        subtitle={
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontFamily: 'Prompt-Light', fontSize: 12 }}>{item.date}</Text>
            <Icon
              name='chevron-right'
              type='entypo'
              color='#E5E7E9'
            />
          </View>
        }
        leftAvatar={{ source: { uri: 'https://firebasestorage.googleapis.com/v0/b/sliplessdemo.appspot.com/o/slip.color.png?alt=media&token=f6270497-13f3-4318-966c-24bc3061168c' } }}
      />

  )

  render() {
    const { goBack } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <ProgressBarAndroid
            styleAttr='Large'
            indeterminate={true}
          />
        </View>
      )
    }

    return (
      <View>
        <View style={{
          width: '100%',
          height: 50,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity onPress={() => goBack()} >
              <Icon
                name='chevron-left'
                type='entypo'
                color='#517fa4'
              />
            </TouchableOpacity>
          </View>

          <Text style={{ alignSelf: 'center', alignContent: 'center', fontFamily: 'Prompt-Medium', alignItems: 'center', fontSize: 15 }}>สลิปทั้งหมด</Text>
          <View style={{ marginRight: 30 }}></View>
        </View>

        <FlatList
          style={{ height: '92%' }}
          keyExtractor={this.keyExtractor}
          ItemSeparatorComponent={this.space}
          data={this.state.slips}
          renderItem={this.renderItem}
        />
      </View>
    )
  }
}
