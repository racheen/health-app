import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal, Alert, TextInput} from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { connect } from 'react-redux'
import { getProfile } from '../actions/profile';
import { Constants, SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

class Profile extends React.Component {  
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
      tx.executeSql('select * from profile',[],(tx,results)=>(this.setState({profile:results.rows.item(0)})));
      // tx.executeSql('select * from profile',[],(tx,results)=>(console.log('db',results)));
    });
  }

  render() {
    console.log('state', this.state.profile)
    return (
      <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
        <Label label={'Name'} content={this.state.profile.name} updateState={this.getData}/>
        <Label label={'Gender'} content={this.state.profile.gender} updateState={this.getData}/>
        {/* <Label label={'Date of Birth'} content={this.state.profile.dob}/>
        <Label label={'Height'} content={this.state.profile.height}/>
        <Label label={'Weight'} content={this.state.profile.weight}/> */}
      </View>
    );
  }
}

class Label extends React.Component {
  state = {
    modalVisible: false,
    content: this.props.content
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
          if (content === 'female' || content === 'male'){
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
          if (content === 'female' || content === 'male'){
            return(
              db.transaction(tx => {
                tx.executeSql(`update profile set dob = ? where id=1;`, [content]);
                tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
              })
            )
          }else {
            return(
             null
            )
          }
      case 'Height':
          if (isNaN(content)){
            return(
              db.transaction(tx => {
                tx.executeSql(`update profile set height = ? where id=1;`, [content]);
                tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
              })
            )
          }else {
            return(
             null
            )
          }
      case 'Weight':
          if (isNaN(content)){
            return(
              db.transaction(tx => {
                tx.executeSql(`update profile set weight = ? where id=1;`, [content]);
                tx.executeSql('select * from profile',[],(_,{rows})=>console.log(JSON.stringify(rows)));
              })
            )
          }else {
            return(
             null
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

  setContent(content) {
    this.setState({content: content,
                   modalVisible: false})
  }

  updateData = () => {
    this.props.updateState()
  }

  render() {
    const {label} = this.props
    this.content = this.props.content
    console.log('this.content', this.content)
    console.log('this.state.content', this.state.content)
    let IconComponent = Ionicons
    return (
      <View style={styles.label}>
        <Text style={{flex:4}}>{label}</Text>
        <Text style={{flex:1, marginRight: 0}}>{this.props.content}</Text>
        <TouchableHighlight
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <IconComponent style={{marginRight: 0}} name={'ios-arrow-forward'} size={18} color={'gray'} />
        </TouchableHighlight>

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
              <Text style={[styles.cardLabel, {alignContent:'center'}]}>{label}</Text>
              <View style={styles.divider}/>
              <TextInput
                style={{height: 40, borderWidth: 1, borderBottomColor: 'gray', padding:10}}
                onChangeText={(content) => this.setState({content})}
                onSubmitEditing={()=>{
                  this.setContent(this.state.content);
                  this.update(this.state.content,label);
                  this.updateData();
                }}
                placeholder={label}
                value = {this.state.content}
              />
            </View>
            <View style = {styles.container}>
              <TouchableHighlight onPress={() => {
                this.setContent(this.state.content);
                this.update(this.state.content,label);
                this.updateData();
                }} 
                style={{paddingBottom:10, paddingTop:10}}>
                <Text style = {styles.button}>
                  OK
                </Text>
              </TouchableHighlight>
              <TouchableHighlight onPress = {() => {this.setModalVisible(!this.state.modalVisible)}}>
                <Text style={styles.button}>Cancel</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Modal>
        </View>
          
      
    );
  }
}

const styles = StyleSheet.create({
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
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // width: 400,
  },
  box: {
      height: 210,
      // flex: 1,
      // width: 380,
      backgroundColor: '#F9F9F9',
      margin: 10,
      borderRadius: 5,
  },
  cardLabel: {
      fontSize:20, 
      marginTop:12,
      marginBottom:8,
      marginLeft:18,
      alignItems: 'center'
  },
  divider: {
      borderBottomColor: '#BDBDBD',
      borderBottomWidth: 1,
      marginLeft: 12,
      marginRight: 12
  },
});

function mapStateToProps (profile) {
  return {
      profile
  }
}

function mapDispatchToProps (dispatch) {
  return {
    saveProfile: (profile)=> dispatch(saveProfile(profile))
  }
}

// export default connect(mapStateToProps, mapDispatchToProps)(Profile)
export default Profile