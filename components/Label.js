import React, { Component } from 'react'
import { Platform, StyleSheet, Text, View, TouchableHighlight, Modal, Alert, TextInput, DatePickerAndroid, TimePickerAndroid, DatePickerIOS} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

class Label extends Component {
    state = {
      modalVisible: false,
      content: this.props.content,
      isFocused: false,
    }

    componentDidMount() {
      this.setState({measurement:this.setMeasurement(this.props.label)})
    }

    handleFocus = event => {
      if (this.state.isFocused !== undefined){
        this.state({isFocused: true});
        if (this.props.onFocus){
          this.props.onFocus(event)
        }
      }
    }

    handleBlur = event => {
      if (this.state.isFocused !== undefined){
        this.setState({isFocused: false});
        if (this.props.onBlur) {
          this.props.onBlur(event)
        }
      }
    }
  
    update(content,label) {
      switch(label){
        case 'Name':
          return(
            db.transaction(tx => {
              tx.executeSql(`update profile set name = ? where id=1;`, [content]);
              tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
            })
          )
        case 'Gender':
            content = content.toLowerCase()
            if (content === 'female' || content === 'male'){
              content = content.charAt(0).toUpperCase() + content.slice(1)
              return(
                db.transaction(tx => {
                  tx.executeSql(`update profile set gender = ? where id=1;`, [content]);
                  tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
                })
              )
            }else {
              return(
               null
              )
            }
        case 'Date of Birth':
            return(
              db.transaction(tx => {
                tx.executeSql(`update profile set dob = ? where id=1;`, [content]);
                tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
              })
            )
        case 'Height':
            if (!isNaN(content)){
              return(
                db.transaction(tx => {
                  tx.executeSql(`update profile set height = ? where id=1;`, [content]);
                  tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
                })
              )
            }else {
              return(
                console.log('height not a number')
              )
            }
        case 'Weight':
            if (!isNaN(content)){
              return(
                db.transaction(tx => {
                  tx.executeSql(`update profile set weight = ? where id=1;`, [content]);
                  tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
                })
              )
            }else {
              return(
               console.log('weight not a number')
              )
            }
        default:
          return(
            db.transaction(tx => {
              tx.executeSql(`update profile set name = ? where id=1;`, [content]);
              tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
            })
          )
      }
      
    }
  
    setModalVisible(visible) {
      this.setState({modalVisible: visible})
    }
    
    setMeasurement(label) {
      let measurement = ''
      switch (label){
        case 'Height': measurement = ' cm'; break;
        case 'Weight': measurement = ' kg'; break;
        default: measurement = undefined; break
      }
      return measurement
    }
    
    setContent(content, label) {
      let measurement = ''
      switch (label){
        case 'Calories':case 'Calories Burned': 
          measurement = ' kcal';
          break;
        case 'Distance': 
          measurement = ' km'
          break;
        case 'Fats': case 'Proteins': 
          measurement = ' gram(s)'
          break;
        case 'Height': 
          measurement = ' cm'
          break;
        case 'Weight': 
          measurement = ' kg'
          break;
      }
      this.setState({content: content,
        modalVisible: false,
        measurement : measurement})
    }
  
    updateData = () => {
      this.props.updateState()
    }

    updateState = (content, label) => {
      this.props.updateStateParent(content, label)
    }

    showModal(label){
      switch(label){
        case 'Date':
        case 'Date of Birth':
          return (this.openDatePicker(label))
        case 'Duration':
          return (this.openTimePicker(label))
        default:
          return (this.setModalVisible(true))
      }
    }

    openTextModal(label, isFocused) {
      switch(label){
        case 'Date': case 'Date of Birth': case 'Duration': return (null)
        case 'Distance':
          if (this.state.modalVisible !== undefined) {
            return (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
              }}>
                <View style={styles.modal}>
                  <View style={[styles.box]}>
                    <View>
                        <View style={{backgroundColor: '#2391ff', height: 50}}>
                          <Text style={[styles.cardLabel, {alignContent:'center', color:'#FFFFFF'}]}>{label}</Text>
                        </View>
                        <View style={{alignContent: 'center', justifyContent:'center', flexDirection:'row'}}>
                          <TextInput
                            style={styles.inputBox}
                            keyboardType='numeric'
                            onChangeText={(content) => this.setState({content})}
                            onSubmitEditing={()=>{
                              this.setContent(this.state.content);
                              this.updateState(this.state.content, label);
                            }}
                            value = {(this.state.content!==undefined) ? this.state.content : null}
                            placeholder={(this.state.content!==undefined) ? this.state.content + ' km' : 'km'}
                            selectionColor = {'gray'}
                            underlineColorAndroid={
                              isFocused ? 'gray' : '#D3D3D3'
                            }
                            onFocus = {this.handleFocus}
                            onBlur = {this.handleBlur}
                            maxLength={4}
                          />
                          <Text style={{margin:20, marginTop:22, paddingLeft: 6, paddingRight: 5, paddingTop: 5, fontFamily:'ReemKufi', color:'#2391ff', fontSize: 20}}>
                            km
                          </Text>
                        </View>
                    </View>
                    <View style= {{flex:1, alignContent:'flex-end',flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableHighlight onPress = {() => {
                          this.setModalVisible(!this.state.modalVisible)}}
                          style={{paddingRight:40}}>
                          <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                          this.setContent(this.state.content, label);
                          this.updateState(this.state.content, label);
                          }} 
                          style={{paddingRight:20}}>
                          <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}> OK </Text>
                        </TouchableHighlight>
                      </View>
                  </View>
                </View>
              </Modal>)
              } else {
                null
              }  
        case 'Calories': case 'Calories Burned':
          if (this.state.modalVisible !== undefined) {
            return (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
              }}>
                <View style={styles.modal}>
                  <View style={[styles.box]}>
                    <View>
                        <View style={{backgroundColor: '#2391ff', height: 50}}>
                          <Text style={[styles.cardLabel, {alignContent:'center', color:'#FFFFFF'}]}>{label}</Text>
                        </View>
                        <View style={{alignContent: 'center', justifyContent:'center', flexDirection:'row'}}>
                          <TextInput
                            style={styles.inputBox}
                            keyboardType='numeric'
                            onChangeText={(content) => this.setState({content})}
                            onSubmitEditing={()=>{
                              this.setContent(this.state.content, label);
                              this.updateState(this.state.content, label);
                            }}
                            placeholder={(this.state.content!==undefined) ? this.state.content + ' kcal' : 'kcal'}
                            value = {(this.state.content!==undefined) ? this.state.content : null}
                            selectionColor = {'gray'}
                            underlineColorAndroid={
                              isFocused ? 'gray' : '#D3D3D3'
                            }
                            onFocus = {this.handleFocus}
                            onBlur = {this.handleBlur}
                            maxLength={4}
                          />
                          <Text style={{margin:20, marginTop:22, paddingLeft: 6, paddingRight: 5, paddingTop: 5, fontFamily:'ReemKufi', color:'#2391ff', fontSize: 20}}>
                            kcal
                          </Text>
                        </View>
                    </View>
                    <View style= {{flex:1, alignContent:'flex-end',flexDirection:'row', justifyContent:'flex-end'}}>
                        <TouchableHighlight onPress = {() => {
                          this.setModalVisible(!this.state.modalVisible)}}
                          style={{paddingRight:40}}>
                          <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}>Cancel</Text>
                        </TouchableHighlight>
                        <TouchableHighlight onPress={() => {
                          this.setContent(this.state.content, label);
                          this.updateState(this.state.content, label);
                          }} 
                          style={{paddingRight:20}}>
                          <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}> OK </Text>
                        </TouchableHighlight>
                      </View>
                  </View>
                </View>
              </Modal>)
              } else {
                null
              } 
        case 'Fats': case 'Proteins':
          if (this.state.modalVisible !== undefined) {
                return (
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                      Alert.alert('Modal has been closed.');
                  }}>
                    <View style={styles.modal}>
                      <View style={[styles.box]}>
                        <View>
                            <View style={{backgroundColor: '#2391ff', height: 50}}>
                              <Text style={[styles.cardLabel, {alignContent:'center', color:'#FFFFFF'}]}>{label}</Text>
                            </View>
                            <View style={{alignContent: 'center', justifyContent:'center', flexDirection:'row'}}>
                              <TextInput
                                style={styles.inputBox}
                                keyboardType='numeric'
                                onChangeText={(content) => this.setState({content})}
                                onSubmitEditing={()=>{
                                  this.setContent(this.state.content, label);
                                  this.updateState(this.state.content, label);
                                }}
                                value ={(this.state.content!==undefined) ? this.state.content : null}
                                placeholder = {(this.state.content!==undefined) ? this.state.content + ' grams' : 'grams'} 
                                selectionColor = {'gray'}
                                underlineColorAndroid={
                                  isFocused ? 'gray' : '#D3D3D3'
                                }
                                onFocus = {this.handleFocus}
                                onBlur = {this.handleBlur}
                                maxLength={4}
                              />
                              <Text style={{margin:20, marginTop:22, paddingLeft: 6, paddingRight: 5, paddingTop: 5, fontFamily:'ReemKufi', color:'#2391ff', fontSize: 20}}>
                                grams
                              </Text>
                            </View>
                        </View>
                        <View style= {{flex:1, alignContent:'flex-end',flexDirection:'row', justifyContent:'flex-end'}}>
                            <TouchableHighlight onPress = {() => {
                              this.setModalVisible(!this.state.modalVisible)}}
                              style={{paddingRight:40}}>
                              <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}>Cancel</Text>
                            </TouchableHighlight>
                            <TouchableHighlight onPress={() => {
                              this.setContent(this.state.content, label);
                              this.updateState(this.state.content, label);
                              }} 
                              style={{paddingRight:20}}>
                              <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}> OK </Text>
                            </TouchableHighlight>
                          </View>
                      </View>
                    </View>
                  </Modal>)
          } else {
            null
          } 
        case 'Height': case 'Weight':
          if (this.state.modalVisible !== undefined) {
            return (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
              }}>
                <View style={styles.modal}>
                  <View style={[styles.box]}>
                    <View>
                      <View style={{backgroundColor: '#2391ff', height: 50}}>
                        <Text style={[styles.cardLabel, {alignContent:'center', color:'#FFFFFF'}]}>{label}</Text>
                      </View>
                      <View style={{alignContent: 'center', justifyContent:'center', flexDirection:'row'}}>
                        <TextInput
                          style={styles.inputBox}
                          keyboardType='numeric'
                          onChangeText={(content) => this.setState({content})}
                          onSubmitEditing={()=>{
                          this.setContent(this.state.content, label);
                          this.update(this.state.content,label);
                          this.updateData();
                          }}
                          value ={(this.state.content!==undefined) ? this.state.content : null}
                          placeholder = {(this.state.content!==undefined) 
                                          ? (label==='Weight') ? this.state.content + ' kg': this.state.content + ' cm'
                                          : (label==='Weight') ? 'kg':'cm'} 
                          selectionColor = {'gray'}
                          underlineColorAndroid={
                          isFocused ? 'gray' : '#D3D3D3'
                          }
                          onFocus = {this.handleFocus}
                          onBlur = {this.handleBlur}
                          maxLength={3}
                        />
                        <Text style={{margin:20, marginTop:22, paddingLeft: 6, paddingRight: 5, paddingTop: 5, fontFamily:'ReemKufi', color:'#2391ff', fontSize: 20}}>
                          {(label==='Weight') ? 'kg':'cm'}
                        </Text>
                      </View>
                    </View>
                    <View style= {{flex:1, alignContent:'flex-end',flexDirection:'row', justifyContent:'flex-end'}}>
                      <TouchableHighlight onPress = {() => {
                        this.setModalVisible(!this.state.modalVisible)}}
                        style={{paddingRight:40}}>
                        <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}>Cancel</Text>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => {
                        this.setContent(this.state.content, label);
                        this.update(this.state.content,label);
                        this.updateData();
                        }} 
                        style={{paddingRight:20}}>
                        <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}> OK </Text>
                      </TouchableHighlight>
                    </View>
                  </View>
                </View>        
              </Modal>)
          } else {
            null
          }
        default:
          if (this.state.modalVisible !== undefined) {
            return (
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                  Alert.alert('Modal has been closed.');
              }}>
              <View style={styles.modal}>
                <View style={[styles.box]}>
                  <View>
                      <View style={{backgroundColor: '#2391ff', height: 50}}>
                        <Text style={[styles.cardLabel, {alignContent:'center', color:'#FFFFFF'}]}>{label}</Text>
                      </View>
                      <TextInput
                        style={styles.inputBox}
                        onChangeText={(content) => this.setState({content})}
                        onSubmitEditing={()=>{
                          if (label=='Name'){
                            this.setContent(this.state.content, label);
                            this.update(this.state.content,label);
                            this.updateData();
                          } else {
                            this.setContent(this.state.content, label);
                            this.updateState(this.state.content, label);
                          }
                        }}
                        placeholder={label}
                        value = {this.state.content}
                        selectionColor = {'gray'}
                        underlineColorAndroid={
                          isFocused ? 'gray' : '#D3D3D3'
                        }
                        onFocus = {this.handleFocus}
                        onBlur = {this.handleBlur}
                      />
                    </View>
                    <View style = {styles.container}>
                    <View style= {{flex:1, alignContent:'flex-end',flexDirection:'row', justifyContent:'flex-end'}}>
                      <TouchableHighlight onPress = {() => {
                        this.setModalVisible(!this.state.modalVisible)}}
                        style={{paddingRight:40}}>
                        <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}>Cancel</Text>
                      </TouchableHighlight>
                      <TouchableHighlight onPress={() => {
                        if (label=='Name'){
                          this.setContent(this.state.content, label);
                          this.update(this.state.content,label);
                          this.updateData();
                        } else {
                          this.setContent(this.state.content, label);
                          this.updateState(this.state.content, label);
                        }
                        }} 
                        style={{paddingRight:20}}>
                        <Text style={{fontFamily:'ReemKufi', color:'#2391ff', fontSize: 15}}> OK </Text>
                      </TouchableHighlight>
                    </View>
                    </View>
                  </View>
                </View>
              </Modal>)
          } else {
            null
          }  
      }
    }

    constructor(props) {
      super(props);
      this.state = { chosenDate: new Date() };
      this.setDate = this.setDate.bind(this);
    }
  
    setDate(newDate) {
      this.setState({chosenDate: newDate})
    }

    async openTimePicker(label){
      try {
        const {action, hour, minute} = await TimePickerAndroid.open({
          hour: 14,
          minute: 0,
          is24Hour: true, // Will display '2 PM'
        });
        if (action !== TimePickerAndroid.dismissedAction) {
          // Selected hour (0-23), minute (0-59)
          this.setState({ chosenTime: `${(hour)}:${(minute)}`})
          this.setState({ content: this.state.chosenTime})
          this.updateState(this.state.content, label);
        }
      } catch ({code, message}) {
        console.warn('Cannot open time picker', message);
      }
    }

    dateIOS(label){
      this.setDate
      this.setState({ chosenDate: new Date(year, month, day)})
      this.setState({ content: this.state.chosenDate.toLocaleDateString()})
      if (label==='Date') {
        this.updateState(this.state.content, label);
      } else {
        this.update(this.state.content, label);
        this.updateData();
      }
    }

    async openDatePicker(label){
      const isIOS = Platform.OS === 'ios';

      if (isIOS){
          return (
            <View style={styles.container}>
              <DatePickerIOS
                date={this.state.chosenDate}
                onDateChange={this.dateIOS(label)}
              />
            </View>
          )
      } else{
        try {
          const {action, year, month, day} = await DatePickerAndroid.open({
            // Use `new Date()` for current date.
            // May 25 2020. Month 0 is January.
            date: this.state.chosenDate
          });
          if (action !== DatePickerAndroid.dismissedAction) {
            // Selected year, month (0-11), day
            this.setState({ chosenDate: new Date(year, month, day)})
            this.setState({ content: this.state.chosenDate.toLocaleDateString()})
            if (label==='Date') {
              this.updateState(this.state.content, label);
            } else {
              this.update(this.state.content, label);
              this.updateData();
            }
          }
        } catch ({code, message}) {
          console.warn('Cannot open date picker', message);
        }
      }
    }

    render() {
      const {onFocus, onBlur, label, type, content} = this.props
      const {isFocused} = this.state;
      // console.log('this.content', this.content)
      // console.log('this.state.content', this.state.content)
      return (
        <View>
            {/* {this.handleModal(type, label, content)} */}
            <View>
                <TouchableHighlight
                   onPress={() => {
                   this.showModal(label);
                   }}>
                  <View style={styles.label}>
                    <Text style={{flex:4}}>{label}</Text>
                    {(type==='profile')
                      ? <Text style={{marginRight: 10}}>{content}{(this.state.measurement!==undefined)?this.state.measurement:null}</Text>
                      : <Text style={{marginRight: 10}}>{this.state.content}{(this.state.measurement!==undefined)?this.state.measurement:null}</Text>}
                    <Ionicons style={{marginRight: 0}} name={'ios-arrow-forward'} size={18} color={'gray'} />
                  </View>
                </TouchableHighlight>
                {this.openTextModal(label, isFocused, onFocus, onBlur)}
            </View>
        </View>
      );
    }
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
    },
    label: {
        padding: 10,
        fontSize: 18,
        height: 45,
        borderBottomWidth: 1,  
        borderColor: '#DADADA',
        flexDirection: 'row',
    },
    modal: {
      flex: 1,
      alignContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      // height: 250,
      justifyContent: 'center',
      padding: 10,
      // marginBottom: 0, 
    },
    button: {
      paddingLeft: 140,
      paddingRight: 140,
      paddingTop: 3,
      paddingBottom: 3,
      borderRadius: 10,
      backgroundColor: '#F0F0F0'
    },
    box: {
        height: 180,
        // flex: 1,
        // width: 380,
        backgroundColor: '#F9F9F9',
        margin: 10,
    },
    cardLabel: {
        fontSize:25, 
        marginTop:12,
        marginBottom:8,
        marginLeft:18,
        alignItems: 'center',
        fontFamily: 'ReemKufi'
    },
    divider: {
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        marginLeft: 12,
        marginRight: 12
    },
    inputBox : { 
      fontSize: 20,
      height: 40, 
      fontFamily: 'ReemKufi',
      // borderBottomWidth: 1, 
      // borderBottomColor: 'gray', 
      paddingLeft: 6, 
      paddingRight: 5, 
      paddingTop: 2,
      paddingBottom: 2,
      margin: 20,
      // selectionColor: 'gray',
      // underlineColorAndroid: '#D3D3D3',
    }
  });

export default Label