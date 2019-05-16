import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Navigator from "./components/Navigator.js"
import { Constants } from 'expo'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'

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
      <Provider store={createStore(reducer,middleware)}>
        <View style={styles.container}>
          <StatBar backgroundColor='#F9F9F9' barStyle='light-content'/>
          <Navigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});