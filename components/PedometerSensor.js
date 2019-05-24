import Expo from "expo";
import React from "react";
import { Pedometer, SQLite } from "expo";
import { StyleSheet, Text, View } from "react-native";
import styles from '../Styles.js'

const db = SQLite.openDatabase('db.db');

export default class PedometerSensor extends React.Component {
  state = {
    isPedometerAvailable: "checking",
    pastStepCount: 0,
    currentStepCount: 0
  };

  add(start, result) {
    date = start.toLocaleDateString()
    db.transaction(tx => {
      // tx.executeSql('DROP TABLE IF EXISTS pedometer',[],(_,results)=>console.log('drop table'));
      tx.executeSql('CREATE TABLE IF NOT EXISTS pedometer (id integer primary key not null, steps text, date text)');
      tx.executeSql('SELECT * FROM pedometer where date=(?)',[date],(tx,results)=>(
          results.rows.length === 0 
          ? tx.executeSql('INSERT INTO pedometer (steps, date) VALUES (?,?)',[result, date],(_,{rows})=>console.log('add succesfully')) 
          : tx.executeSql('UPDATE pedometer SET steps= ? WHERE date = ?',[result, date],(_,{rows})=>console.log('updated succesfully'))
        ));
      // tx.executeSql('INSERT INTO pedometer (steps, date) VALUES (?,?)',[result, start]);
      // tx.executeSql('SELECT * FROM pedometer where date=(?)',[date],(tx,results)=>console.log('successful1', results));
      tx.executeSql('SELECT * FROM pedometer',[],(tx,results)=>console.log('successful', results));
    })
  }

  componentDidMount() {
    this._subscribe();
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  _subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      this.setState({
        currentStepCount: result.steps
      });
    });

    Pedometer.isAvailableAsync().then(
      result => {
        this.setState({
          isPedometerAvailable: String(result)
        });
      },
      error => {
        this.setState({
          isPedometerAvailable: "Could not get isPedometerAvailable: " + error
        });
      }
    );

    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 1);
    Pedometer.getStepCountAsync(start, end).then(
      result => {
        this.setState({ pastStepCount: result.steps });
        this.add(start, result.steps);
      },
      error => {
        this.setState({
          pastStepCount: "Could not get stepCount: " + error
        });
      }
    );
  };

  _unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  render() {
    return (
      <View style={styles.box}>
        <Text>
          Pedometer.isAvailableAsync(): {this.state.isPedometerAvailable}
        </Text>
        <Text>
          Steps taken in the last 24 hours: {this.state.pastStepCount}
        </Text>
        <Text>Walk! And watch this go up: {this.state.currentStepCount}</Text>
      </View>
    );
  }
}


// Expo.registerRootComponent(PedometerSensor);
