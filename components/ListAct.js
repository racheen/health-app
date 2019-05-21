import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity, StyleSheet } from 'react-native'
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

class ListAct extends Component {
    state = {
        items: null
    }

    getData = (type) => {
        if (type=='activity'){
            db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS activity (id integer primary key not null, fitnessact text, duration text, distance text, calories text, date text)',[],(_,results)=>console.log('add table'));
                tx.executeSql('SELECT * FROM activity',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else {
            this.setState({items:'hello'})
        }
        console.log('results', this.state)
    }
    
    componentDidMount() {
        const {color} = this.props
        if (color==='#FF4D3C') {
            type="activity"
        } else if (color==='#82C5E6'){
            type="meal"
        } else if (color==='#096B91'){
            type="sleep"
        } else {
            type="mindfulness";
        }
        this.setState({type:type})
        this.getData(type)
    }

    render() {
        const {color} = this.props
        console.log('results', this.state)
        return (
            <View style={styles.listContainer}>
                {this.state.items != null 
                    ? this.state.items.map(({id, fitnessact, duration, distance, calories, date})=>
                        <ListItem
                            style={{
                                backgroundColor: '#1c9963',
                                borderColor: '#000',
                                borderWidth: 1,
                                padding: 8
                            }}
                            key = {id}
                            color={color} 
                            content={{fitnessact, duration, distance, calories, date}}/>
                    ) 
                    : console.log('no items')
                }
                {/* <ListItem color={color}/>
                <ListItem color={color}/>
                <ListItem color={color}/> */}
            </View>
        );
    }
}

class ListItem extends Component {
 
    render() {
        const {color, content} = this.props
        // console.log('ListItem', {color})
        return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <View style={styles.div1}>
                        <Text style={styles.title}>
                            {content.fitnessact}
                        </Text>
                        <View style={styles.contents}>
                            <Text style={styles.content}>{content.date}</Text>
                            <Text style={styles.content}>{content.duration}</Text>
                            <Text style={styles.content}>{content.distance}m</Text>
                        </View>
                    </View>
                    <Text style={[styles.div1,{flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end'}]}>
                        {content.calories}
                    </Text>
                </View>
        );
    }
}


const styles = StyleSheet.create({
    listContainer: {
        alignItems: 'stretch',
        padding:2
    },
    listItem: {
        flex: 3,
        // alignItems: 'center',
        margin: 3,
        padding: 5,
        borderRadius: 5,
        flexDirection: 'row'
    },
    div1: {
        flex:1,
        height: 30,
        // borderWidth: 1
    },
    title: {
        flex: 1,
        height: 15,
        // borderWidth: 1
    },
    contents: {
        flex: 1,
        // height: 15,
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    content: {
        flex: 1,
        height: 15,
        // padding: 5,
        // borderWidth: 1
    },
});

export default ListAct