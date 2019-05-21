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
      duration: '8 hours',
      date: "01/01/2019"
    }
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ handleThis: this.sqlAdd });
  }

  sqlAdd = () => {
      // console.log('hello')
      // console.log('state from nav', this.state.sleep)
      var sleep = this.state.sleep
      db.transaction(tx => {
        // tx.executeSql('DROP TABLE IF EXISTS sleep',[],(_,results)=>console.log('drop table'));
        tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (id integer primary key not null, date text, duration text)',[],(_,results)=>console.log('add table'));
        // tx.executeSql('select * from sleep',[],(tx,results)=>(console.log('db',results)));
        // tx.executeSql('select * from sleep',[],(tx,results)=>(
        //   results.rows.length === 0 ? tx.executeSql('INSERT INTO sleep (fintnessact, duration, distance, calories, date) VALUES (?,?,?,?,?)',[null,null,null,null,null],(_,{rows})=>console.log('add succesfully')) : this.setState({sleep:results.rows.item(0)})
        // ));
        tx.executeSql('INSERT INTO sleep (date, duration) VALUES (?,?)',[sleep.date ,sleep.duration],(_,{rows})=>console.log('add succesfully'));
        tx.executeSql('select * from sleep',[],(tx,results)=>(console.log('db',results)));
      })
      // console.log('added db 3')
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
    console.log('state', this.state.sleep)
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Label label={'Date'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Duration'} updateStateParent={this.getData} type={'add'}/>
      </View>
    );
  }
}

export default AddActivity