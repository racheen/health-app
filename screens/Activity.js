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
                    <Text style={styles.cardQuote}>Reading is to the mind what exercise is to the body -Joseph Addison</Text>
                    <Card navigation={navigation} type={'sum'} title={'Summary'} buttonLabel={''} subtitle={''} color={''}/>
                    {/* <Card navigation={navigation} type={'chart'} title={'Pedometer'} buttonLabel={'ADD STEPS'} subtitle={''} color={'#FF4D3C'}/> */}
                    <Card navigation={navigation} type={'list'} title={'Activities'} buttonLabel={'ADD ACTIVITY'} subtitle={''} color={'#FF4D3C'}/>
                </View>
            </ScrollView>
        );
    }
}

export default Activity