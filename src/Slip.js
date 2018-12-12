import React from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';

const Items = [
    {
        num: 2,
        name: 'A',
        price: 10.0,
    },
    {
        num: 1,
        name: 'B',
        price: 15.0,
    }
];
const total_items = 3;
const cash = 30.0;
const change = 5.0;

const SlipItems = ({ Items }) => (
    <View>
        {Items.map(item => (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-around',
            }}>
                <SlipText>{item.num}</SlipText>
                <SlipText>{item.name}</SlipText>
                <SlipText>{item.price}</SlipText>
            </View>
        ))}
    </View>
);

export default class Slip extends React.Component {
    render() {
        return (
            <ScrollView style={styles.scrollSlip}>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <SlipText>StoreName </SlipText>
                    <SlipText>Branch</SlipText>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <SlipText>TAX# taxID</SlipText>
                    <SlipText>TEL. telNum</SlipText>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                }}>
                    <SlipText>REG# regNum</SlipText>
                    <SlipText>POS# posID</SlipText>
                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}>
                    <SlipText>Date date_timeData</SlipText>
                </View>
                <SlipItems/>
            </ScrollView>
        );
    }
};

class SlipText extends React.Component {
    render() {
        return (
            <Text style={styles.textSlip}>{this.props.children}</Text>
        );
    }
}

const styles = StyleSheet.create({
    scrollSlip: {
        backgroundColor: 'white',
        shadowColor: 'grey',
    },
    textSilp: {

    },
});