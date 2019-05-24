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
                    {/* <View style={styles.category}>
                        <View style={styles.categoryDay}>
                            <Text>Day</Text>
                        </View>
                        <View style={styles.categoryWeek}>
                            <Text>Week</Text>
                        </View>
                        <View style={styles.categoryMonth}>
                            <Text>Month</Text>
                        </View>
                        <View style={styles.categoryYear}>
                            <Text>Year</Text>
                        </View>
                    </View> */}
                    <Card navigation={navigation} type={'chart'} title={'Sleep Details'} buttonLabel={'ADD SLEEP'} subtitle={''} color={'#096B91'} category={''} screen={'sleep'}/>
                </View>
            </ScrollView>
        );
    }
}

export default Activity