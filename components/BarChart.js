import React from 'react'
import { View, BarChart, Grid, StackedBarChart, Text } from 'react-native-svg-charts'
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

class BarChartExample extends React.Component {
    state = {
        items : null,
        summary : null
    }
    getData = (screen) => {
        if (screen=='activity'){
            db.transaction(tx => {
                tx.executeSql('select * from pedometer order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (screen=='meal') {
            db.transaction(tx => {
                tx.executeSql('select * from meal order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else {
            db.transaction(tx => {
                tx.executeSql('select * from sleep order by date',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } 
    }

    componentDidMount(){
        const {screen} = this.props
        this.getData(screen)
    }

    render() {
        const {color, screen, added} = this.props
        let data = []
        let fill = color
        if (added !== []) {this.getData(screen)};
        // if (this.state.items === null) {
        //     return (
        //         <View>
        //             <Text>Hello</Text>
        //         </View>
        //     )
        // }
        if (screen=='activity'){
            this.state.items !== null 
                ? data = this.state.items.reverse().slice(0,7) 
                : null
            const colors = [ color ]
            const keys   = [ 'steps' ]
            return (
                <StackedBarChart
                    style={ { height: 150 } }
                    keys={ keys }
                    colors={ colors }
                    data={ data }
                    showGrid={ false }
                    contentInset={ { top: 30, bottom: 30, left: 10, right: 10 } }
                />
            )          
        } else if (screen=='meal') {
            this.state.items !== null 
                ? data = this.state.items.reverse().slice(0,7)
                : null
            const colors = [ color, '#1263AD', '#5BE500' ]
            const keys   = [ 'fats', 'proteins', 'calories' ]
            return (
                <StackedBarChart
                    style={ { height: 150 } }
                    keys={ keys }
                    colors={ colors }
                    data={ data }
                    showGrid={ false }
                    contentInset={ { top: 30, bottom: 30 } }
                />
            )
        } else {          
            this.state.items !== null 
                ? data = this.state.items.reverse().slice(0,7) 
                : null
            const colors = [ color ]
            const keys   = [ 'duration' ]
            let data2 = []
            data.map(({id, duration, date})=>{
                // console.log(duration.split(':')[0])
                let obj = {}
                obj['date'] = date
                obj['id'] = id
                obj['duration'] = duration.split(':')[0]
                data2.push(obj)
            })
            // console.log(data2)
            return (
                <StackedBarChart
                    style={ { height: 150 } }
                    keys={ keys }
                    colors={ colors }
                    data={ data2 }
                    showGrid={ false }
                    contentInset={ { top: 30, bottom: 30 } }
                />
            )
            // return (null)
        }
        
    }
 
}

export default BarChartExample