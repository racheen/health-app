import React, { Component } from 'react'
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import { Text, View, ScrollView, Button, TouchableOpacity, TextInput, } from 'react-native'

class FormData extends Component {
    constructor(props) {
        super(props);
        this.state = { text: 'Useless Placeholder' };
      }
    render(){
        return(
            <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
            />
        );
    }
}



export default FormData