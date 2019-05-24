import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import BarChartExample from './BarChart.js'
import styles from '../Styles.js'
import Summary from './Summary.js'
import ListAct from './ListAct.js'
import FormData from './FormData.js'

class CardItem extends Component {
    handleCardItem(title, color, type, screen, added) {
        switch(type) {
            case 'form':
                return <FormData title={title}/>
            case 'sum':
                return <Summary screen={screen}/>
            case 'list':
                return <ListAct color={color} full={false} added={added === undefined ? [] : added}/>
            default:
                return <BarChartExample color={color} screen={screen}/>
        }

    }

    render() {
        const handlePress = () => false
        const {title, subtitle, buttonLabel, data, color, type, screen, added} = this.props
        return (
            <View style={styles.data}>
                {this.handleCardItem(title, color, type, screen, added)}
            </View>
        )
    }
}

export default CardItem