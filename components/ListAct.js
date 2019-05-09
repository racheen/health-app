import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native'

class ListAct extends Component {
 
    render() {
        const {color} = this.props
        return (
            <View style={styles.listContainer}>
                <ListItem color={color}/>
                <ListItem color={color}/>
                <ListItem color={color}/>
            </View>
        );
    }
}

class ListItem extends Component {
 
    render() {
        const {color} = this.props
        // console.log('ListItem', {color})
        return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <Text style={styles.label}>STEPS</Text>
                    <Text style={styles.info}>43853</Text>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    listContainer: {
        // flex: 1,
        alignItems: 'stretch',
        // justifyContent: 'space-around',
        // height: 100,
        // flexDirection: 'row',
        // borderWidth: 1,
        padding:2
    },
    listItem: {
        flex: 3,
        alignItems: 'center',
        // flexWrap: 'wrap',
        // height: 100,
        // flexDirection: 'row',
        // borderWidth: 1,
        margin: 3,
        padding: 5,
        // backgroundColor: '#FDBAAF'
    }
});

export default ListAct