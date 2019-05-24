import React, { Component } from 'react'
import { Text, View, StyleSheet,  TouchableOpacity } from 'react-native'

class Menu extends Component {
    render() {
        const {navigation, title, color} = this.props
        return (
            <TouchableOpacity onPress={() => navigation.navigate(title.replace(/\s+/, ""), {color:color, title:title})}> 
                <View style={[styles.box, {backgroundColor:color}]}>
                <Text>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    box:{
        height: 300,
        width: 153,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }
  });

export default Menu