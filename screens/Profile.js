import React, { Component } from 'react'
import { StyleSheet, Text, View, TouchableHighlight, Modal, Alert, TextInput} from 'react-native'
import Styles from '../Styles';
import { Ionicons } from '@expo/vector-icons';

class Profile extends React.Component {
  state = {
    content: '',
  }
    render() {
      return (
        <View style={{ flex: 1, marginLeft: 10, marginRight: 10 }}>
          <Label label={'Name'} content={this.state.content}/>
          <Label label={'Gender'} content={this.state.content}/>
          <Label label={'Date of Birth'} content={this.state.content}/>
          <Label label={'Height'} content={this.state.content}/>
          <Label label={'Weight'} content={this.state.content}/>
        </View>
      );
    }
}

class Label extends React.Component {
  state = {
    modalVisible: false,
    content: 'hi',
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible})
  }

  setContent(content) {
    this.setState({content: content,
                   modalVisible: false})
  }

  render() {
    const {label} = this.props
    let IconComponent = Ionicons
    return (
      <View style={styles.label}>
        <Text style={{flex:4}}>{label}</Text>
        <Text style={{flex:1, marginRight: 0}}>{this.state.content}</Text>
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
                placeholder='hello'
              />
            </View>
            <View style = {styles.container}>
              <TouchableHighlight onPress={() => this.setContent(this.state.content)} style={{paddingBottom:10, paddingTop:10}}>
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

export default Profile