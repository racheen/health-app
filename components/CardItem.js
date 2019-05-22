import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import BarChartExample from './BarChart.js'
import styles from '../Styles.js'
import Summary from './Summary.js'
import ListAct from './ListAct.js'
import FormData from './FormData.js'

class CardItem extends Component {
    handleCardItem(title, color, type, screen) {
        switch(type) {
            case 'form':
                return <FormData title={title}/>
            case 'sum':
                return <Summary screen={screen}/>
            case 'list':
                return <ListAct color={color} full={false}/>
            default:
                return <BarChartExample color={color} screen={screen}/>
        }

    }

    render() {
        const handlePress = () => false
        const {title, subtitle, buttonLabel, data, color, type, screen} = this.props
        return (
            <View style={styles.data}>
                {this.handleCardItem(title, color, type, screen)}
            </View>
        )
    }
}

export default CardItem