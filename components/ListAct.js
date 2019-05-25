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
                tx.executeSql('CREATE TABLE IF NOT EXISTS activity (id integer primary key not null, fitnessact text, duration text, distance text, calories text, date text)');
                tx.executeSql('SELECT * FROM activity order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (type=='meal'){
            db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS meal (id integer primary key not null, mealname text, fats text, proteins text, calories text, date text)');
                tx.executeSql('SELECT * FROM meal order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (type=='pedometer'){
            db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS pedometer (id integer primary key not null, steps text, date text)');
                tx.executeSql('SELECT * FROM pedometer order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        }  else {
            db.transaction(tx => {
                tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (id integer primary key not null, date text, duration text)');
                tx.executeSql('SELECT * FROM sleep order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        }
    }
    
    componentDidMount() {
        const {color, title} = this.props
        if (color==='#FF4D3C') {
            console.log(title)
            if (title==='Pedometer') {type="pedometer"}
            else {type="activity"}
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

    hello = (added) => {
        this.setState({ items: [] })
    }

    render() {
        // console.log(this.state.items)
        const {color, full, added} = this.props
        const type = this.state.type
        switch (type) {
            case 'activity': 
            return (
                <View style={styles.listContainer}>
                    {(added !== []) ? this.getData(type) : null }
                    {full ? 
                        (this.state.items != null 
                        ? this.state.items.reverse().map(({id, fitnessact, duration, distance, calories, date})=>
                            <ListItem
                                key = {id}
                                color={color} 
                                content={{fitnessact, duration, distance, calories, date}}
                                type= {type}/>
                        ) 
                        : null)
                        : (this.state.items != null 
                            ? this.state.items.reverse().slice(0,3).map(({id, fitnessact, duration, distance, calories, date})=>
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{fitnessact, duration, distance, calories, date}}
                                    type= {type}/>
                            ) 
                            : null)
                    }
                </View>
            );
            case 'pedometer': 
            return (
                <View style={styles.listContainer}>
                    {(added !== []) ? this.getData(type) : null }
                    {full ? 
                        (this.state.items != null 
                        ? this.state.items.reverse().map(({id, steps, date})=>
                            <ListItem
                                key = {id}
                                color={color} 
                                content={{steps, date}}
                                type= {type}/>
                        ) 
                        : null)
                        : (this.state.items != null 
                            ? this.state.items.reverse().slice(0,3).map(({id, fitnessact, duration, distance, calories, date})=>
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{fitnessact, duration, distance, calories, date}}
                                    type= {type}/>
                            ) 
                            : null)
                    }
                </View>
            );
            case 'meal': 
            return (
                <View style={styles.listContainer}>
                    {(added !== []) ? this.getData(type) : null }
                    {full ? 
                        (this.state.items != null 
                        ? this.state.items.reverse().map(({id, mealname, fats, proteins, calories, date})=>
                            <ListItem
                                key = {id}
                                color={color} 
                                content={{mealname, fats, proteins, calories, date}}
                                type= {type}/>
                        ) 
                        : null)
                        : (this.state.items != null 
                            ? this.state.items.reverse().slice(0,3).map(({id, mealname, fats, proteins, calories, date})=>
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{mealname, fats, proteins, calories, date}}
                                    type= {type}/>
                            ) 
                            : console.log('no items'))
                    }
                </View>
            );
            default: 
            return (
                <View style={styles.listContainer}>
                    {(added !== []) ? this.getData(type) : null }
                    {full ? 
                        (this.state.items != null 
                        ? this.state.items.reverse().map(({id, duration, date})=>
                            <ListItem
                                key = {id}
                                color={color} 
                                content={{duration, date}}
                                type= {type}/>
                        ) 
                        : null)
                        : (this.state.items != null 
                            ? this.state.items.reverse().slice(0,3).map(({id, duration, date})=>
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{duration, date}}
                                    type= {type}/>
                            ) 
                            : console.log('no items'))
                    }
                </View>
            );
        }
    }
}

class ListItem extends Component {
 
    render() {
        const {color, content, type} = this.props
        // console.log('ListItem', {color})
        switch (type) {
            case 'activity': 
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
            case 'pedometer': 
            return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <View style={styles.div1}>
                        <Text style={[styles.div1,{flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end', fontFamily:'ReemKufi'}]}>
                            {content.date}
                        </Text>
                    </View>
                    <Text style={[styles.div1,{flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end', fontFamily:'ReemKufi'}]}>
                        {content.steps} Steps
                    </Text>
                </View>
            );
            case 'meal': 
            return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <View style={[styles.div1, {fontFamily:'ReemKufi'}]}>
                        <Text style={styles.title}>
                            {content.mealname}
                        </Text>
                        <View style={styles.contents}>
                            <Text style={styles.content}>{content.date}</Text>
                            <Text style={styles.content}>{content.fats}</Text>
                            <Text style={styles.content}>{content.proteins}</Text>
                        </View>
                    </View>
                    <Text style={[styles.div1,{flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end',fontFamily:'ReemKufi'}]}>
                        {content.calories}
                    </Text>
                </View>
            );
            default: 
            return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <View style={styles.div1}>
                        <Text style={[styles.div1,{flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end',fontFamily:'ReemKufi'}]}>
                            {content.date}
                        </Text>
                    </View>
                    <Text style={[styles.div1,{flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end',fontFamily:'ReemKufi'}]}>
                        {content.duration}
                    </Text>
                </View>
            );
        }
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
        // fontFamily:'ReemKufi',
    },
    title: {
        flex: 1,
        height: 15,
        // borderWidth: 1
        fontFamily:'ReemKufi'
    },
    contents: {
        flex: 1,
        // height: 15,
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontFamily:'ReemKufi'
    },
    content: {
        flex: 1,
        height: 15,
        fontFamily:'ReemKufi'
        // padding: 5,
        // borderWidth: 1
    },
});

export default ListAct