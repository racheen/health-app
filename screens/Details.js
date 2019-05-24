import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity} from 'react-native'
import styles from '../Styles.js'
import ListAct from '../components/ListAct.js';

class Details extends Component {
    static navigationOptions = ({ navigation }) => {
        const {title} = navigation.state.params
        return {
            title: title,
            // headerTitleStyle: {marginLeft:127},
            headerStyle : {paddingBottom:30},
        }
    }
    
    render() {
        const {navigation} = this.props
        const {color} = navigation.state.params
        const {title} = navigation.state.params
        return (
            <ScrollView>
                <View style={[styles.container, {alignItems:'stretch', margin:10}]}>
                    <ListAct title={title} color={color} full={true}></ListAct>
                </View>
            </ScrollView>
        );
    }
}

export default Details