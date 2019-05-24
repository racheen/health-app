import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import Navigator from "./components/Navigator.js"
import { Constants } from 'expo'
import { Font, AppLoading } from 'expo'

function StatBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  async componentWillMount() {
      await Font.loadAsync({
        'ReemKufi': require('./assets/fonts/ReemKufi-Regular.ttf'),
      });
      this.setState({ loading: false });
  }

  // componentDidMount() {
  //   Font.loadAsync({
  //     'ReemKufi': require('./assets/fonts/ReemKufi-Regular.ttf'),
  //   })  
  // }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <AppLoading/>
        </View>
      );
    } else {
      return(
        <View style={styles.container}>
          <StatBar backgroundColor='#F9F9F9' barStyle='light-content'/>
          <Navigator/>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});