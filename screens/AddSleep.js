import React, { Component } from 'react'
import { View, TouchableOpacity } from 'react-native'
import Label from '../components/Label.js'
import { Ionicons } from '@expo/vector-icons';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

class AddActivity extends Component {  
  static navigationOptions = ({navigation}) => {
    return {
      headerRight: (
        <TouchableOpacity
          onPress={navigation.getParam('handleThis')}
          title="Info"
          color="#fff"
        >
        <Ionicons style={{marginRight: 20}} name={'ios-checkmark'} size={40} color={'black'} />
        </TouchableOpacity>
      ),
    };
  };

  state = {
    sleep : {
      duration: '8',
      date: "01/01/2019"
    }
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ handleThis: this.sqlAdd });
  }
  
  addTime = (previousTime, newTime) => {
    prev = previousTime.split(':')
    newT = newTime.split(':')

    hours = parseInt(prev[0]) + parseInt(newT[0])
    minutes = parseInt(prev[1]) + parseInt(newT[1])
    
    if (minutes >= 60 ) {
      hours = parseInt(hours) + 1
      minutes = parseInt(minutes) - 60
    }
    return (`${(hours)}:${(minutes)}`)
    
  }
  sqlAdd = () => {
      var sleep = this.state.sleep
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM sleep where date=(?)',[sleep.date],(tx,results)=>(
          results.rows.length === 0 
          ? tx.executeSql('INSERT INTO sleep (date, duration) VALUES (?,?)',[sleep.date, sleep.duration]) 
          : tx.executeSql('UPDATE sleep SET duration= ? WHERE date = ?',[this.addTime(results.rows._array[0].duration, sleep.duration), sleep.date])
        ));
        tx.executeSql('SELECT * FROM sleep',[],(tx,results)=>this.props.navigation.navigate('Sleep',{added:results.rows._array}));
      })
  }

  getData = (content, label) => {
    if (label === 'Date'){
      var key = 'date'
    }else if (label === 'Duration'){
      var key = 'duration'
    }
    var val = content
    var obj = this.state.sleep
    obj[key] = val
    this.setState(obj);  
  }

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Label label={'Date'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Duration'} updateStateParent={this.getData} type={'add'}/>
      </View>
    );
  }
}

export default AddActivity