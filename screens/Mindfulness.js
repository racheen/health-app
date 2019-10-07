import React, { Component } from 'react'
import styles from '../Styles.js'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native' 
import Card from '../components/Card.js'

class Mindfulness extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Mindfulness`,
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
                    <Text style={styles.cardQuote}>It’s not the load that brings you down. It is how you carry it. -Lou Holtz</Text>
                    <Card navigation={navigation} type={'list'} title={'Entries'} buttonLabel={'ADD ENTRY'} subtitle={''} color={'#79C8A6'} screen={'mindfulness'} added={added}/>
                </View>
            </ScrollView>
        );
    }
}

export default Mindfulness