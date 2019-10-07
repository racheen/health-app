import React, { Component } from 'react'
import { Text, View, ScrollView, Button, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import { SQLite } from 'expo';
import EStyleSheet from 'react-native-extended-stylesheet';

const db = SQLite.openDatabase('db.db');

class ListAct extends Component {
    state = {
        items: null
    }

    getData = (type) => {
        if (type=='activity'){
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM activity order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (type=='meal'){
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM meal order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (type=='pedometer'){
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM pedometer order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (type=='mindfulness'){
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM mindfulness order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        }  else {
            db.transaction(tx => {
                tx.executeSql('SELECT * FROM sleep order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        }
    }
    
    componentDidMount() {
        const {color, title} = this.props
        let type = ""
        if (color==='#FF4D3C') {
            // console.log(title)
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

    _onLongPressButton(id, type){
        Alert.alert(
            'Delete Data',
            'Are you sure you want to delete this entry?',
            [
                {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
                },
                {text: 'DELETE', onPress: () => this.deleteData(id, type)},
            ],
            {cancelable: false},
        )
      }

    deleteData (id, type) {
        // console.log(this.state.items)
        // console.log(type)
        // console.log(id)
        if (type=='activity'){
            db.transaction(tx => {
                tx.executeSql('DELETE FROM activity WHERE id=?',[id]);
            })
        } else if (type=='meal'){
            db.transaction(tx => {
                tx.executeSql('DELETE FROM meal WHERE id=?',[id]);
            })
        } else if (type=='pedometer'){
            db.transaction(tx => {
                tx.executeSql('DELETE FROM pedometer WHERE id=?',[id]);
            })
        } else if (type=='mindfulness'){
            db.transaction(tx => {
                tx.executeSql('DELETE FROM mindfulness WHERE id=?',[id]);
            })
        }  else {
            db.transaction(tx => {
                tx.executeSql('DELETE FROM sleep WHERE id=?',[id]);
            })
        }
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
                            <TouchableOpacity 
                                key={id}
                                onLongPress={()=>this._onLongPressButton(id, type)}
                                >
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{fitnessact, duration, distance, calories, date}}
                                    type= {type}/>
                            </TouchableOpacity>
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
                            <TouchableOpacity 
                                key={id}
                                onLongPress={()=>this._onLongPressButton(id, type)}
                                >
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{steps, date}}
                                    type= {type}/>
                            </TouchableOpacity>
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
                            <TouchableOpacity 
                                key={id}
                                onLongPress={()=>this._onLongPressButton(id, type)}
                                >
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{mealname, fats, proteins, calories, date}}
                                    type= {type}/>
                            </TouchableOpacity>
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
                            : null)
                    }
                </View>
            );
            case 'mindfulness': 
            return (
                <View style={styles.listContainer}>
                    {(added !== []) ? this.getData(type) : null }
                    {full ? 
                        (this.state.items != null 
                        ? this.state.items.reverse().map(({id, q1, q2, q3, date})=>
                            <TouchableOpacity 
                                key={id}
                                onLongPress={()=>this._onLongPressButton(id, type)}
                                >
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{q1, q2, q3, date}}
                                    type= {type}/>
                            </TouchableOpacity>
                        ) 
                        : null)
                        : (this.state.items != null 
                            ? this.state.items.reverse().slice(0,3).map(({id, q1, q2, q3, date})=>
                                <ListItem
                                    key = {id}
                                    color={color} 
                                    content={{q1, q2, q3, date}}
                                    type= {type}/>
                            ) 
                            : null)
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
                            <TouchableOpacity 
                                key={id}
                                onLongPress={()=>this._onLongPressButton(id, type)}
                                >
                                <ListItem
                                key = {id}
                                color={color} 
                                content={{duration, date}}
                                type= {type}/>
                            </TouchableOpacity> 
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
                            : null)
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
                            <Text style={[styles.content, {marginLeft:10}]}>{content.duration}</Text>
                            <Text style={[styles.content, {marginRight:5}]}>{content.distance}m</Text>
                        </View>
                    </View>
                    <Text style={[styles.div1,{color:'#FFFFFF', flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end', marginRight:3}]}>
                        {content.calories} kcal
                    </Text>
                </View>
            );
            case 'pedometer': 
            return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <View style={styles.div1}>
                        <Text style={[styles.div1,{color:'#FFFFFF', flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end', fontFamily:'ReemKufi'}]}>
                            {content.date}
                        </Text>
                    </View>
                    <Text style={[styles.div1,{color:'#FFFFFF', flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end', fontFamily:'ReemKufi'}]}>
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
                            <Text style={styles.content}>{content.fats}g</Text>
                            <Text style={styles.content}>{content.proteins}g</Text>
                        </View>
                    </View>
                    <Text style={[styles.div1,{color:'#FFFFFF', flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end',fontFamily:'ReemKufi'}]}>
                        {content.calories}kcal
                    </Text>
                </View>
            );
            case 'mindfulness': 
            return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <View style={styles.div1}>
                        <Text style={[styles.div1,{padding:3, color:'#FFFFFF', flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end',fontFamily:'ReemKufi'}]}>
                            Diary: {content.date}
                        </Text>
                    </View>
                </View>
            );
            default: 
            return (
                <View style={[styles.listItem, {backgroundColor:color}]}>
                    <View style={styles.div1}>
                        <Text style={[styles.div1,{color:'#FFFFFF', flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end',fontFamily:'ReemKufi'}]}>
                            {content.date}
                        </Text>
                    </View>
                    <Text style={[styles.div1,{color:'#FFFFFF', flexDirection:'row',justifyContent:'flex-end',fontSize:25, alignContent:'flex-end',fontFamily:'ReemKufi'}]}>
                        {content.duration}
                    </Text>
                </View>
            );
        }
    }
}


const styles = EStyleSheet.create({
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
        fontFamily:'ReemKufi',
        color: '#FFFFFF'
    },
    contents: {
        flex: 1,
        // height: 15,
        // borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        fontFamily:'ReemKufi',
        color: '#FFFFFF'
    },
    content: {
        flex: 1,
        height: 15,
        fontFamily:'ReemKufi',
        // padding: 5,
        // borderWidth: 1
        color:'#FFFFFF',
    },
});

export default ListAct