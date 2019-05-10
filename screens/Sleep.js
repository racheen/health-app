import React, { Component } from 'react'
import styles from '../Styles.js'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native' 
import Card from '../components/Card.js'

class Activity extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Activity`,
            // headerTitleStyle: {marginLeft:127},
            headerStyle : {paddingBottom:30},
        }
    }

    render() {
        const {navigation} = this.props
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.cardQuote}>Avoid strenours mental activity before bed.</Text>
                    <View style={styles.category}></View>
                    <Card navigation={navigation} type={'chart'} title={'Sleep'} buttonLabel={'ADD SLEEP'} subtitle={''} color={'#096B91'} category={''}/>
                </View>
            </ScrollView>
        );
    }
}

export default Activity