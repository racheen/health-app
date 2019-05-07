import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'

class Setting extends React.Component {
    static navigationOptions = ({ navigation }) => {
      title: `Hello`
    }
  
    render() {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Settings!</Text>
        </View>
      );
    }
}

export default Setting