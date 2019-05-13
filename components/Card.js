import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity } from 'react-native'
import styles from '../Styles.js'
import CardItem from './CardItem.js'

class Card extends Component {
    handleCard(title, buttonLabel, subtitle, color, navigation, type) {
        switch(type) {
            case 'form':
                return  (
                    <View>
                        <Text style={[styles.cardLabel, {alignContent:'center'}]}>{title}</Text>
                        <View style={styles.divider}/>
                        <CardItem navigation={navigation} title={title} buttonLabel={buttonLabel} subtitle={subtitle} color={color} type={type}/>
                    </View>)
            case 'sum':
                return  (
                    <View>
                        <Text style={styles.cardLabel}>{title}</Text>
                        <View style={styles.divider}/>
                        <CardItem navigation={navigation} title={title} buttonLabel={buttonLabel} subtitle={subtitle} color={color} type={type}/>
                    </View>)
            case 'quote':
                return  (
                    <TouchableOpacity onPress={() => navigation.navigate(title.replace(/\s+/, ""))}> 
                        <Text style={styles.cardLabel}>{title}</Text>
                        <View style={styles.divider}/>
                        <Text style={[styles.cardQuote, {color}]}>How are you today</Text>
                    </TouchableOpacity>)
            default:
                return (
                    <TouchableOpacity onPress={() => navigation.navigate(title.replace(/\s+/, ""), {color:color, title:title})}> 
                        <Text style={styles.cardLabel}>{title}</Text>
                        <View style={styles.divider}/>
                        <CardItem navigation={navigation} title={title} buttonLabel={buttonLabel} subtitle={subtitle} color={color} type={type}/>
                    </TouchableOpacity>)
        }
    }

    handleCardButton(title, buttonLabel, color, navigation, type) {
        switch(type) {
            case 'sum':
                return null
            case 'quote':
                return null
            case 'form':
                return (
                    <TouchableOpacity onPress={() => navigation.navigate()} style={{paddingBottom:10, paddingTop:10}}>
                        <Text style = {[styles.button, color='black']}>
                            OK
                        </Text>
                    </TouchableOpacity>
                )
            default:
                return (
                <TouchableOpacity onPress={() => navigation.navigate(buttonLabel.replace(/\s+/, ""))} style={{paddingBottom:10, paddingTop:10}}>
                    <Text style = {[styles.button, {color}]}>
                        {buttonLabel}
                    </Text>
                </TouchableOpacity>)
        }
    }

    render() {
        const handlePress = () => false
        const {navigation, title, subtitle, buttonLabel, data, color, type} = this.props
        return (
            <View style={[styles.box]}>
                {this.handleCard(title, buttonLabel, subtitle, color, navigation, type)}
                <View style = {styles.container}>
                    {this.handleCardButton(title, buttonLabel, color, navigation, type)}
                </View>
            </View>
        );
    }
}

export default Card