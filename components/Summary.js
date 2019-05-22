import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

class Summary extends Component {
    state = {
        items : null,
        summary : null
    }
    getData = (screen) => {
        if (screen=='activity'){
            db.transaction(tx => {
                // tx.executeSql('DROP TABLE IF EXISTS activity',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS activity (id integer primary key not null, fitnessact text, duration text, distance text, calories text, date text)',[],(_,results)=>console.log('add table'));
                tx.executeSql('select * from activity',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else {
            db.transaction(tx => {
                // tx.executeSql('DROP TABLE IF EXISTS activity',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS meal (id integer primary key not null, mealname text, fats text, proteins text, calories text, date text)',[],(_,results)=>console.log('add table'));
                tx.executeSql('select * from meal',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } 
    }
    componentDidMount(){
        const {screen} = this.props
        console.log('screen', screen)
        this.getData(screen)
    }

    summation = (items, prop) => {
        return items.reduce( function(a, b){
            return parseFloat(a) + parseFloat(b[prop]);
        }, 0);
    };

    render() {
        const {screen} = this.props
        // console.log('screen', screen)
        // this.getData(screen)
        console.log('state', this.state.items)
        // console.log('total duration', duration) 
        if (screen === 'activity'){
            var duration, distance, calories = 0
            this.state.items !== null ? duration = this.summation(this.state.items, "duration") : console.log('items is null')
            this.state.items !== null ? distance = this.summation(this.state.items, "distance") : console.log('items is null')
            this.state.items !== null ? calories = this.summation(this.state.items, "calories") : console.log('items is null')    
            return (
                <View style={{paddingBottom:10, paddingTop:10}}>
                    <SummaryContainer distance={distance} duration={duration} calories={calories} screen={screen}/>
                </View>
            );
        }else{
            var fats, proteins, calories = 0
            this.state.items !== null ? fats = this.summation(this.state.items, "fats") : console.log('items is null')
            this.state.items !== null ? proteins = this.summation(this.state.items, "proteins") : console.log('items is null')
            this.state.items !== null ? calories = this.summation(this.state.items, "calories") : console.log('items is null')    
            return(
                <View style={{paddingBottom:10, paddingTop:10}}>
                    <SummaryContainer fats={fats} proteins={proteins} calories={calories} screen={screen}/>
                </View>
            );
        }
    }
}

class SummaryContainer extends Component {
    render() {
        const {screen} = this.props
        if (screen === 'activity'){
            const {distance, duration, calories} = this.props
            return (
                <View style={styles.summaryContainer}>
                    <SummaryItem title={'DISTANCE'} content={distance}/>
                    <SummaryItem title={'DURATION'} content={duration}/>
                    <SummaryItem title={'CALORIES'} content={calories}/>
                </View>
            );
        }else{
            const {fats, proteins, calories} = this.props
            return(
                <View style={styles.summaryContainer}>
                    <SummaryItem title={'FATS'} content={fats}/>
                    <SummaryItem title={'PROTEINS'} content={proteins}/>
                    <SummaryItem title={'CALORIES'} content={calories}/>
                </View>
            );
        }
    }
}

class SummaryItem extends Component {
    render() {
        const {title, content} = this.props
        return (
                <View style={styles.summaryItem}>
                    <Text style={styles.label}>{title}</Text>
                    <Text style={styles.info}>{content}</Text>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    summaryContainer: {
        // flex: 1,
        alignItems: 'center',
        // justifyContent: 'space-around',
        flexWrap: 'wrap',
        // height: 100,
        flexDirection: 'row',
        // borderWidth: 1
        padding:2
    },
    summaryItem: {
        flex: 3,
        alignItems: 'center',
        justifyContent: 'space-around',
        // flexWrap: 'wrap',
        // height: 100,
        // flexDirection: 'row',
        // borderWidth: 1
        margin: 5
    }
});

export default Summary