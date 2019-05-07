import React, { Component } from 'react'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import {LineChart, BarChart, PieChart, ProgressChart, ContributionGraph, StackedBarChart} from 'react-native-chart-kit'

const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [{
      data: [ 20, 45, 28, 80, 99, 43 ]
    }]
   }


class Home extends Component {
  static navigationOptions = ({ navigation }) => {
        return {
            title: `Health App`,
            headerStyle: {height: 25},
            headerTitleStyle: {marginLeft:157, paddingBottom:25, justifyContent:'center', alignItems: 'center',}
        }
      }

  render() {
    return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.box}>
            <Text style={styles.cardLabel}>Activity</Text>
            <View style={styles.divider}/>
            <BarChart
            style={{borderRadius: 16, marginLeft:10}}
            data={data}
            width={360}
            height={100}
            yAxisLabel={'$'}
            chartConfig={{
                backgroundColor: '#e26a00',
                backgroundGradientFrom: '#fb8c00',
                backgroundGradientTo: '#ffa726',
                decimalPlaces: 2, // optional, defaults to 2dp
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
            />
        </View>
        <View style={styles.box}>
            <Text style={styles.cardLabel}>Meal</Text>
            <View style={styles.divider}/>
        </View>
        <View style={styles.box}>
            <Text style={styles.cardLabel}>Sleep</Text>
            <View style={styles.divider}/>
        </View>
        <View style={styles.box}>
            <Text style={styles.cardLabel}>Mindfulness</Text>
            <View style={styles.divider}/>
        </View>
      </View>
    </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 400,
  },
  box: {
    height: 190,
    width: 380,
    backgroundColor: '#F9F9F9',
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  cardLabel: {
    fontSize:20, 
    marginTop:12,
    marginBottom:8,
    marginLeft:18
  },
  divider: {
    borderBottomColor: '#BDBDBD',
    borderBottomWidth: 1,
    marginLeft: 12,
    marginRight: 12
  }
})

export default Home