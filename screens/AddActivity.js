import React, { Component } from 'react'
import { View } from 'react-native'
import Label from '../components/Label.js'

class AddActivity extends Component {  
  state = {
    activity : {
      fitnessact : null,
      duration: null,
      distance: null,
      calories: null,
      date: null
    }
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