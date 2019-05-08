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
        <Card navigation={navigation} title={'Activity'} buttonLabel={'Add Activity'} subtitle={''} color={'#FF4D3C'}/>
      </View>
    </ScrollView>
    )
  }
}

export default Home