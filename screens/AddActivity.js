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
    activity : {
      fitnessact : "Hello",
      duration: 1,
      distance: 2,
      calories: 3,
      date: "01/01/2019"
    }
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ handleThis: this.sqlAdd });
  }

  sqlAdd = () => {
      let activity = this.state.activity
      db.transaction(tx => {
        tx.executeSql('INSERT INTO activity (fitnessact, duration, distance, calories, date) VALUES (?,?,?,?,?)',[activity.fitnessact,activity.duration,activity.distance,activity.calories,activity.date]);
        tx.executeSql('SELECT * FROM activity',[],(tx,results)=>this.setState({data:results.rows._array}));
        tx.executeSql('SELECT * FROM activity',[],(tx,results)=>this.props.navigation.navigate('Activity',{added:results.rows._array}));
      })
  }

  getData = (content, label) => {
    if (label === 'Fitness Activity'){
      var key = 'fitnessact'
    }else if (label === 'Duration'){
      var key = 'duration'
    }else if (label === 'Distance'){
      var key = 'distance'
    }else if (label === 'Calories Burned'){
      var key = 'calories'
    }else if (label === 'Date'){
      var key = 'date'
    }
    var val = content
    var obj = this.state.activity
    obj[key] = val
    this.setState(obj);  
  }

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Label label={'Fitness Activity'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Duration'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Distance'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Calories Burned'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Date'} updateStateParent={this.getData} type={'add'}/>
      </View>
    );
  }
}

export default AddActivity