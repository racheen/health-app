import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import BarChartExample from './BarChart.js'
import styles from '../Styles.js'
import Summary from './Summary.js'

class CardItem extends Component {
    handleCardItem(title) {
        switch(title) {
            case 'Summary':
                return <Summary/>
            case 'Activity':
                return <BarChartExample/>
            default:
                return <BarChartExample/>
        }

    }

    render() {
        const handlePress = () => false
        const {title, subtitle, buttonLabel, data} = this.props
        return (
            <View style={styles.data}>
                {this.handleCardItem(title)}
            </View>
        )
    }
}

export default CardItem