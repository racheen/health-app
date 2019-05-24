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

  sqlAdd = () => {
      var sleep = this.state.sleep
      db.transaction(tx => {
        tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (id integer primary key not null, date text, duration text)',[],(_,results)=>console.log('add table'));
        tx.executeSql('INSERT INTO sleep (date, duration) VALUES (?,?)',[sleep.date ,sleep.duration],(_,{rows})=>console.log('add succesfully'));
        tx.executeSql('select * from sleep',[],(tx,results)=>(console.log('db',results)));
      })
      this.props.navigation.navigate('Sleep')
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