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
        const {added} = this.props.navigation.state.params
        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.cardQuote}>You are what you eat.</Text>
                    <Card navigation={navigation} type={'sum'} title={'Summary'} buttonLabel={''} subtitle={''} color={''} screen={'meal'} added={added}/>
                    <Card navigation={navigation} type={'chart'} title={'Nutrient Chart'} buttonLabel={'DETAILS'} subtitle={''} color={'#82C5E6'}  screen={'meal'} added={added}/>
                    <Card navigation={navigation} type={'list'} title={'Meals'} buttonLabel={'ADD MEAL'} subtitle={''} color={'#82C5E6'} screen={'meal'} added={added}/>
                    <Text style={styles.cardQuote}>http://online-fel-mealplan.tripod.com/foodex.html</Text>
                </View>
            </ScrollView>
        );
    }
}

export default Activity