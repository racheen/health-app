import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native'

class Summary extends Component {
 
    render() {
 
        return (
            <View style={{paddingBottom:10, paddingTop:10}}>
                <SummaryContainer/>
                <SummaryContainer/>
            </View>
        );
    }
}

class SummaryContainer extends Component {
 
    render() {
 
        return (
                <View style={styles.summaryContainer}>
                    <SummaryItem/>
                    <SummaryItem/>
                    <SummaryItem/>
                </View>
        );
    }
}

class SummaryItem extends Component {
 
    render() {
 
        return (
                <View style={styles.summaryItem}>
                    <Text style={styles.label}>STEPS</Text>
                    <Text style={styles.info}>43853</Text>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    summaryContainer: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-around',
        flexWrap: 'wrap',
        // height: 100,
        flexDirection: 'row',
        // borderWidth: 1
        padding:2
    },
    summaryItem: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-around',
        // flexWrap: 'wrap',
        // height: 100,
        // flexDirection: 'row',
        // borderWidth: 1
        margin: 5
    }
});

export default Summary