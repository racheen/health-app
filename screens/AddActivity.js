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
      // console.log('hello')
      // console.log('state from nav', this.state.activity)
      var activity = this.state.activity
      db.transaction(tx => {
        // tx.executeSql('DROP TABLE IF EXISTS activity',[],(_,results)=>console.log('drop table'));
        tx.executeSql('CREATE TABLE IF NOT EXISTS activity (id integer primary key not null, fitnessact text, duration text, distance text, calories text, date text)',[],(_,results)=>console.log('add table'));
        // tx.executeSql('select * from activity',[],(tx,results)=>(console.log('db',results)));
        // tx.executeSql('select * from activity',[],(tx,results)=>(
        //   results.rows.length === 0 ? tx.executeSql('INSERT INTO activity (fintnessact, duration, distance, calories, date) VALUES (?,?,?,?,?)',[null,null,null,null,null],(_,{rows})=>console.log('add succesfully')) : this.setState({activity:results.rows.item(0)})
        // ));
        tx.executeSql('INSERT INTO activity (fitnessact, duration, distance, calories, date) VALUES (?,?,?,?,?)',[activity.fitnessact,activity.duration,activity.distance,activity.calories,activity.date],(_,{rows})=>console.log('add succesfully'));
        tx.executeSql('select * from activity',[],(tx,results)=>(console.log('db',results)));
      })
      // console.log('added db 3')
      this.props.navigation.navigate('Activity')
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
    console.log('state', this.state.activity)
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