import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import BarChartExample from './BarChart.js'
import styles from '../Styles.js'
import Summary from './Summary.js'
import ListAct from './ListAct.js'
import FormData from './FormData.js'

class CardItem extends Component {
    handleCardItem(title, color, type) {
        switch(type) {
            case 'form':
                return <FormData title={title}/>
            case 'sum':
                return <Summary/>
            case 'list':
                return <ListAct color={color} full={false}/>
            default:
                return <BarChartExample color={color}/>
        }

    }

    render() {
        const handlePress = () => false
        const {title, subtitle, buttonLabel, data, color, type} = this.props
        return (
            <View style={styles.data}>
                {this.handleCardItem(title, color, type)}
            </View>
        )
    }
}

export default CardItem