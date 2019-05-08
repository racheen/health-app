import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import styles from '../Styles.js'
import CardItem from './CardItem.js'

class Card extends Component {
    handleCard(title, buttonLabel, subtitle, color, navigation) {
        switch(title) {
            case 'Summary':
                return  (
                    <View>
                        <Text style={styles.cardLabel}>{title}</Text>
                        <View style={styles.divider}/>
                        <CardItem navigation={navigation} title={title} buttonLabel={buttonLabel} subtitle={subtitle} color={color}/>
                    </View>)
            default:
                return (
                    <TouchableOpacity onPress={() => navigation.navigate(title)}> 
                        <Text style={styles.cardLabel}>{title}</Text>
                        <View style={styles.divider}/>
                        <CardItem navigation={navigation} title={title} buttonLabel={buttonLabel} subtitle={subtitle} color={color}/>
                    </TouchableOpacity>)
        }
    }

    handleCardButton(title, buttonLabel, color, navigation) {
        switch(title) {
            case 'Summary':
                return null
            default:
                return (
                <TouchableOpacity onPress={() => navigation.navigate(buttonLabel.replace(/\s+/, ""))}>
                    <Text style = {[styles.button, {color}]}>
                        {buttonLabel}
                    </Text>
                </TouchableOpacity>)
        }
    }

    render() {
        const handlePress = () => false
        const {navigation, title, subtitle, buttonLabel, data, color, height} = this.props
        return (
            <View style={[styles.box, height]}>
                    {this.handleCard(title, buttonLabel, subtitle, color, navigation)}
                <View style = {styles.container}>
                    {this.handleCardButton(title, buttonLabel, color, navigation)}
                </View>
            </View>
        );
    }
}

export default Card