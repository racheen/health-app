import React, { Component } from 'react'
import { Text, View, StyleSheet,  TouchableOpacity } from 'react-native'

class Menu extends Component {

    render() {
        const {navigation, title, color} = this.props
        return (
            <TouchableOpacity onPress={() => navigation.navigate(title.replace(/\s+/, ""), {color:color, title:title})}> 
                <View style={[styles.box, {backgroundColor:color}]}>
                <Text style={{fontFamily:'ReemKufi', fontSize:20}}>{title}</Text>
                </View>
            </TouchableOpacity>
        );
    }
}


const styles = StyleSheet.create({
    box:{
        height: 154,
        width: 154,
        margin: 10,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
    }
  });

export default Menu