import React, { Component } from 'react'
import { Text, View, StyleSheet,  TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';


class Menu extends Component {

    render() {
        const {navigation, title, color} = this.props
        return (
            <View style={styles.contentContainer}>
                <TouchableOpacity onPress={() => navigation.navigate(title.replace(/\s+/, ""), {color:color, title:title})}> 
                    <View style={[styles.box, {backgroundColor:color}]}>
                    <Text style={{fontFamily:'ReemKufi', fontSize:20}}>{title}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
}


const styles = EStyleSheet.create({
    box:{
        height: "150rem",
        width: "150rem",
        margin: "10rem",
        borderRadius: "20rem",
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: '1rem',
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 10,
    },
    // contentContainer:{
    //     flex: 1,
    //     // aspectRatio: 2,
    //     flexDirection: "column",
    // }
  });

export default Menu