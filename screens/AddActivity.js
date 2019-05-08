import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView, Button, TouchableOpacity } from 'react-native' 
import { HeaderBackButton } from 'react-navigation';
import BarChartExample from '../components/BarChart.js'
import styles from '../Styles.js'

class Activity extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Activity`,
            // headerTitleStyle: {marginLeft:127},
            headerStyle : {paddingBottom:30},
        }
    }
  
    render() {
      return (
        <ScrollView>
        <View style={styles.container}>
          <View style={styles.box}>
            <Text>Reading is to the mind what exercise is to the body -Joseph Addison</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.cardLabel}>Summary</Text>
                <View style={styles.divider}/>
                <View style={styles.data}>
                    <BarChartExample/>
                </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.cardLabel}>Pedometer</Text>
                <View style={styles.divider}/>
                <View style={styles.data}>
                    <BarChartExample/>
                </View>
          </View>
          <View style={styles.box}>
            <Text style={styles.cardLabel}>Activities</Text>
                <View style={styles.divider}/>
                <View style={styles.data}>
                    <BarChartExample/>
                </View>
          </View>
        </View>
        </ScrollView>
      );
    }
}

export default Activity