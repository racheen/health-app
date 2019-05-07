import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import Home from "./pages/Home.js"
import Navigator from "./components/Navigator.js"
import {Constants} from 'expo'

function StatBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <StatBar backgroundColor='#F9F9F9' barStyle='light-content'/>
        <Navigator/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});