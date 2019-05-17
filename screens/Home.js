import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import Menu from '../components/Menu.js'
import styles from '../Styles.js'

class Home extends Component {
    
  render() {
    const handlePress = () => false
    const {navigation} = this.props
    return (
    <ScrollView>
      <View style={{flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        padding: 20,
        flexDirection: 'row',
        flexWrap: 'wrap'
    }}>
        <Menu navigation={navigation} type={'chart'} title={'Activity'} color={'#FF4D3C'}/>
        <Menu navigation={navigation} type={'chart'} title={'Meal'} color={'#82C5E6'}/>
        <Menu navigation={navigation} type={'chart'} title={'Sleep'} color={'#096B91'}/>
        <Menu navigation={navigation} type={'quote'} title={'Mindfulness'} color={'#79C8A6'}/>
      </View>
    </ScrollView>
    )
  }
}

export default Home