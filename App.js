import React from 'react';
import { StyleSheet, View, StatusBar, Dimensions} from 'react-native';
import Navigator from "./components/Navigator.js"
import { Constants } from 'expo'
import { Font, AppLoading } from 'expo'
import Slider from './components/Slider.js'
import { SQLite } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

const db = SQLite.openDatabase('db.db');

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
      db.transaction(tx => {
        // tx.executeSql('DROP TABLE meal');
        // tx.executeSql('DROP TABLE pedometer');
        // tx.executeSql('DROP TABLE sleep');
        // tx.executeSql('DROP TABLE profile');
        // tx.executeSql('DROP TABLE mindfulness');
        // tx.executeSql('DROP TABLE activity');
        tx.executeSql('CREATE TABLE IF NOT EXISTS activity (id integer primary key not null, fitnessact text, duration text, distance text, calories text, date text)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS pedometer (id integer primary key not null, date text, steps text)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS meal (id integer primary key not null, mealname text, fats text, proteins text, calories text, date text)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (id integer primary key not null, date text, duration text)');  
        tx.executeSql('CREATE TABLE IF NOT EXISTS profile (id integer primary key not null, name text, gender text, dob date, height INTEGER, weight INTEGER)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS mindfulness (id integer primary key not null, date text, q1 text, q2 text, q3 text)');
      })
  } 
  
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

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});