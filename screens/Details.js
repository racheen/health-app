import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from '../Styles.js'
import ListAct from '../components/ListAct.js';

class Details extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: `Activities`,
            // headerTitleStyle: {marginLeft:127},
            headerStyle : {paddingBottom:30},
        }
    }

    render() {
        const {navigation} = this.props
        const {color} = navigation.state.params
        return (
            <ScrollView>
                <View style={[styles.container, {alignItems:'stretch', margin:10}]}>
                    <ListAct color={color}></ListAct>
                </View>
            </ScrollView>
        );
    }
}

export default Details