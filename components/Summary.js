import React from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'

class Summary extends React.Component {
    render() {
        return (
            <View style={styles.summaryContainer}>
                <SummaryRow/>
                <SummaryRow/>
            </View>
        );
    }
}

class SummaryRow extends React.Component {
    render() {
        return (
            <View style={styles.summaryRow}>
                <SummaryItem data={'STEPS'}/>
                <SummaryItem data={'CALORIES'}/>
                <SummaryItem data={'DURATION'}/>
            </View>
        );
    }
}

class SummaryItem extends React.Component {
    render () {
        return (
            <View style={styles.summaryItem}>
                <Text style={styles.summaryLabel}>{this.props.data}</Text>
                <Text style={styles.summaryInfo}>74903</Text>
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
    summaryContainer:{
        flex: 1,
        marginLeft: 20,
        marginRight: 20,
        marginTop: 10,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        // borderWidth: 1
    },
    summaryRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        // borderWidth: 1
    },
    summaryItem: {
        flex: 3,
        margin: 5,
        // borderWidth: 1
    },
    summaryLabel: {
        fontSize: 13,
        fontWeight: '500'
    },
    summaryInfo: {
        fontSize: 13
    }
})

export default Summary