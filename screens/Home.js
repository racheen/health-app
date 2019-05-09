import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import Card from '../components/Card.js'
import styles from '../Styles.js'

class Home extends Component {
  static navigationOptions = ({ navigation }) => {
        return {
            title: `Health App`,
            // headerStyle: {height: 25},
            headerTitleStyle: {flex:1, marginLeft:157, paddingBottom:30, justifyContent:'center', alignItems: 'center',}
        }
      }
    
  render() {
    const handlePress = () => false
    const {navigation} = this.props
    return (
    <ScrollView>
      <View style={styles.container}>
        <Card navigation={navigation} type={'chart'} title={'Activity'} buttonLabel={'ADD ACTIVITY'} subtitle={''} color={'#FF4D3C'}/>
        <Card navigation={navigation} type={'chart'} title={'Meal'} buttonLabel={'ADD MEAL'} subtitle={''} color={'#82C5E6'}/>
        <Card navigation={navigation} type={'chart'} title={'Sleep'} buttonLabel={'ADD SLEEP'} subtitle={''} color={'#096B91'}/>
        <Card navigation={navigation} type={'quote'} title={'Mindfulness'} buttonLabel={''} subtitle={''} color={'#79C8A6'}/>
      </View>
    </ScrollView>
    )
  }
}

export default Home