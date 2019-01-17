import {
  Collapse,
  CollapseHeader,
  CollapseBody,
  AccordionList
} from "accordion-collapse-react-native";
import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Thumbnail, List, ListItem, Separator } from "native-base";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Collapse>
          <CollapseHeader style={styles.collapseHeader}>
            <View>
              <Thumbnail source={require("../img/arrow-down.png")} style={styles.icon}/>
            </View>
            <View>
              <Text style={styles.textHeader}>12/09/2018</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <ListItem>
              <Text>7-11</Text>
            </ListItem>
            <ListItem>
              <Text>7-11</Text>
            </ListItem>
            <ListItem>
              <Text>Tesco Lotus Express</Text>
            </ListItem>
          </CollapseBody>
        </Collapse>

        <Collapse>
          <CollapseHeader style={styles.collapseHeader}>
            <View>
              <Thumbnail source={require("../img/arrow-down.png")} style={styles.icon}/>
            </View>
            <View>
              <Text style={styles.textHeader}>12/09/2018</Text>
            </View>
          </CollapseHeader>
          <CollapseBody>
            <ListItem>
              <Text>7-11</Text>
            </ListItem>
            <ListItem>
              <Text>7-11</Text>
            </ListItem>
            <ListItem>
              <Text>Tesco Lotus Express</Text>
            </ListItem>
          </CollapseBody>
        </Collapse>
      </View>


    );
  }
}

export default History;

const styles = StyleSheet.create({
  collapseHeader: {
    flexDirection: "row",
    fontSize: 50,
    justifyContent: 'flex-start',
    padding:10,
    backgroundColor:'#E6E6E6'
  },
  icon: {
    width : 25 ,
    height : 25
  },
  textHeader: {
    fontSize : 18,
  }
});
