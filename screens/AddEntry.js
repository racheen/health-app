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
    entry : {
      q1 : "Hello",
      q2: 1,
      q3: 2,
      date: (new Date()).toLocaleDateString()
    }
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ handleThis: this.sqlAdd });
  }

  sqlAdd = () => {
      let entry = this.state.entry
      db.transaction(tx => {
        tx.executeSql('SELECT * FROM mindfulness where date=(?)',[entry.date],(tx,results)=>(
            results.rows.length === 0 
            ? tx.executeSql('INSERT INTO mindfulness (q1, q2, q3, date) VALUES (?,?,?,?)',[entry.q1, entry.q2, entry.q3, entry.date])
            : tx.executeSql('UPDATE mindfulness SET q1= ? q2=? q3=? WHERE date = ?',[entry.q1, entry.q2, entry.q3, entry.date])
          ));
        tx.executeSql('SELECT * FROM mindfulness',[],(tx,results)=>this.setState({data:results.rows._array}));
        tx.executeSql('SELECT * FROM mindfulness',[],(tx,results)=>this.props.navigation.navigate('Mindfulness',{added:results.rows._array}));
      })
  }

  getData = (content, label) => {
    if (label === 'I am feeling better/worse today compared yesterday'){
      var key = 'q1'
    }else if (label === 'Today I feel'){
      var key = 'q2'
    }else if (label === 'Any problems I had'){
      var key = 'q3'
    }
    var val = content
    var obj = this.state.entry
    obj[key] = val
    this.setState(obj);  
  }

  render() {
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Label label={'I am feeling better/worse today compared yesterday'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Today I feel'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Any problems I had'} updateStateParent={this.getData} type={'add'}/>
      </View>
    );
  }
}

export default AddActivity