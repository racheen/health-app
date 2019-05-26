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
    db.transaction(
      tx => {
        tx.executeSql('select * from profile',[],(tx,results)=>(
          results.rows.length === 0 ? tx.executeSql('INSERT INTO profile (name, gender, dob, height, weight) VALUES (?,?,?,?,?)',[null,null,null,null,null],(_,{rows})=>console.log('add succesfully')) : this.setState({profile:results.rows.item(0)})
        ))
      ;});
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