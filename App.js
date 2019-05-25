import React from 'react';
import { StyleSheet, View, StatusBar, TextInput} from 'react-native';
import Navigator from "./components/Navigator.js"
import { Constants } from 'expo'
import { Font, AppLoading } from 'expo'
// import { Slider } from 'react-native-gesture-handler';
import Slider from './components/Slider.js'
import {TimePickerAndroid, DatePickerIOS, DatePickerAndroid, TouchableOpacity, Text, TouchableHighlight } from 'react-native'

function StatBar ({backgroundColor, ...props}){
  return (
    <View style={{backgroundColor, height: Constants.statusBarHeight}}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props}/>
    </View>
  )
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
    // this.state = { chosenDate: new Date() };
    // this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({chosenDate: newDate})
  }

  async componentWillMount() {
      await Font.loadAsync({
        'ReemKufi': require('./assets/fonts/ReemKufi-Regular.ttf'),
      });
      this.setState({ loading: false });
  }

  async openDatePicker(){
    try {
      const {action, year, month, day} = await DatePickerAndroid.open({
        // Use `new Date()` for current date.
        // May 25 2020. Month 0 is January.
        date: this.state.chosenDate
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        // Selected year, month (0-11), day
        this.setState({ chosenDate: new Date(year, month, day)})
        // this.setState({ content: this.state.chosenDate.split('T')[0]})
      }
    } catch ({code, message}) {
      console.warn('Cannot open date picker', message);
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <AppLoading/>
        </View>
      );
    } else {
      return(
        <View style={styles.container}>
          <StatBar backgroundColor='#F9F9F9' barStyle='light-content'/>
          <Navigator/>
            {/* <Slider/> */}
            {/* <TouchableOpacity 
              onPress={()=>this.openDatePicker()}
              >
              <Text>Date Picker</Text>
            </TouchableOpacity> */}
            {/* <View style={styles.modal}>
                  <View style={[styles.box]}>
                    <View style={{borderWidth:1}}>
                        <View style={{backgroundColor: '#2391ff', height: 50}}>
                          <Text style={[styles.cardLabel, {alignContent:'center', color:'#FFFFFF'}]}>label</Text>
                        </View>
                        <View style={{alignContent: 'center', borderWidth: 1, flexDirection:'row'}}>
                          <TextInput
                            style={styles.inputBox}
                            keyboardType='numeric'
                            onChangeText={(content) => this.setState({content})}
                            onSubmitEditing={()=>{
                            }}
                            placeholder={'hello'}
                            value = {this.state.content}
                          />
                          <Text style={{margin:20, marginTop:22, paddingLeft: 6, paddingRight: 5, paddingTop: 5, fontFamily:'ReemKufi', color:'#2391ff', fontSize: 20}}>
                            km
                          </Text>
                        </View>
                    </View>
                    <View style= {{flex:1, alignContent:'flex-end',flexDirection:'row', justifyContent:'flex-end', borderWidth:1}}>
                        <TouchableHighlight onPress = {() => {}}
                          style={{paddingRight:40}}>
                          <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                          }} 
                          style={{paddingRight:20}}>
                          <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}> OK </Text>
                        </TouchableHighlight>
                      </View>
                  </View>
            </View> */}
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});