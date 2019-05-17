import React, { Component } from 'react'
import { View } from 'react-native'
import { SQLite } from 'expo';
import Label from '../components/Label.js'

const db = SQLite.openDatabase('db.db');

class Profile extends Component {  
  state = {
    profile: {
      name: null,
      gender: null,
      dob: null,
      height: null,
      weight: null
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists profile (id integer primary key not null, name text, gender text, dob date, height int, weight int);');
      tx.executeSql('select * from profile',[],(tx,results)=>(
        results.rows.item(0).id === undefined ? tx.executeSql('insert into profile name, gender, dob, height, weight values (null,null,null,null,null)') : this.setState({profile:results.rows.item(0)}) 
      ));
      // tx.executeSql('drop table profile');
      // tx.executeSql('select * from profile where id=1',[],(tx,results)=>(console.log('db',results)));
      // tx.executeSql('select * from profile where id=1',[],(tx,results)=>this.setState({profile:results.rows.item(0)}));
    });
  }

  render() {
    console.log('state', this.state.profile)
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Label label={'Name'} content={this.state.profile.name} updateState={this.getData} type={'profile'}/>
        <Label label={'Gender'} content={this.state.profile.gender} updateState={this.getData} type={'profile'}/>
        <Label label={'Date of Birth'} content={this.state.profile.dob} updateState={this.getData} type={'profile'}/>
        <Label label={'Height'} content={this.state.profile.height} updateState={this.getData} type={'profile'}/>
        <Label label={'Weight'} content={this.state.profile.weight} updateState={this.getData} type={'profile'}/>
      </View>
    );
  }
}

export default Profile