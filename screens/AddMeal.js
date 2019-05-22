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
    meal : {
      mealname : "Hello",
      fats: 1,
      proteins: 2,
      calories: 3,
      date: "01/01/2019"
    }
  }
  
  componentDidMount() {
    this.props.navigation.setParams({ handleThis: this.sqlAdd });
  }

  sqlAdd = () => {
      // console.log('hello')
      // console.log('state from nav', this.state.meal)
      var meal = this.state.meal
      db.transaction(tx => {
        // tx.executeSql('DROP TABLE IF EXISTS meal',[],(_,results)=>console.log('drop table'));
        tx.executeSql('CREATE TABLE IF NOT EXISTS meal (id integer primary key not null, mealname text, fats text, proteins text, calories text, date text)',[],(_,results)=>console.log('add table'));
        // tx.executeSql('select * from meal',[],(tx,results)=>(console.log('db',results)));
        // tx.executeSql('select * from meal',[],(tx,results)=>(
        //   results.rows.length === 0 ? tx.executeSql('INSERT INTO meal (fintnessact, duration, distance, calories, date) VALUES (?,?,?,?,?)',[null,null,null,null,null],(_,{rows})=>console.log('add succesfully')) : this.setState({meal:results.rows.item(0)})
        // ));
        tx.executeSql('INSERT INTO meal (mealname, fats, proteins, calories, date) VALUES (?,?,?,?,?)',[meal.mealname,meal.fats,meal.proteins,meal.calories,meal.date],(_,{rows})=>console.log('add succesfully'));
        tx.executeSql('select * from meal',[],(tx,results)=>(console.log('db',results)));
      })
      // console.log('added db 3')
      this.props.navigation.navigate('Meal')
  }

  getData = (content, label) => {
    if (label === 'Meal Name'){
      var key = 'mealname'
    }else if (label === 'Fats'){
      var key = 'fats'
    }else if (label === 'Proteins'){
      var key = 'proteins'
    }else if (label === 'Calories'){
      var key = 'calories'
    }else if (label === 'Date'){
      var key = 'date'
    }
    var val = content
    var obj = this.state.meal
    obj[key] = val
    this.setState(obj);  
  }

  render() {
    console.log('state', this.state.meal)
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Label label={'Meal Name'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Fats'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Proteins'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Calories'} updateStateParent={this.getData} type={'add'}/>
        <Label label={'Date'} updateStateParent={this.getData} type={'add'}/>
      </View>
    );
  }
}

export default AddActivity