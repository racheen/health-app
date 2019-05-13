import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class Settings extends React.Component {
    static navigationOptions = ({ navigation }) => {
      title: `Profile`
    }
  
    render() {
      return (
        <View style={{ flex: 1 }}>
          <Text>Settings!</Text>
          <Text>Settings!</Text>
          <Text>Settings!</Text>
          <Text>Settings!</Text>
        </View>
      );
    }
}

export default Settings