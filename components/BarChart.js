import React from 'react'
import { BarChart, Grid, StackedBarChart, Text } from 'react-native-svg-charts'
import { SQLite } from 'expo';

const db = SQLite.openDatabase('db.db');

class BarChartExample extends React.PureComponent {
    state = {
        items : null,
        summary : null
    }
    getData = (screen) => {
        if (screen=='activity'){
            db.transaction(tx => {
                // tx.executeSql('DROP TABLE IF EXISTS pedometer',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS pedometer (id integer primary key not null, date text, steps text)');
                tx.executeSql('select * from pedometer',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (screen=='meal') {
            db.transaction(tx => {
                // tx.executeSql('DROP TABLE IF EXISTS activity',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS meal (id integer primary key not null, mealname text, fats text, proteins text, calories text, date text)');
                tx.executeSql('select * from meal',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else {
            db.transaction(tx => {
                // tx.executeSql('DROP TABLE IF EXISTS sleep',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (id integer primary key not null, date text, duration text)');
                tx.executeSql('select * from sleep',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } 
    }
    componentDidMount(){
        const {screen} = this.props
        this.getData(screen)
    }

    render() {
        const {color, screen} = this.props
        let data = []
        let fill = color
        if (screen=='activity'){
            this.state.items !== null 
                ? data = this.state.items.reverse().slice(0,7) 
                : null
            const colors = [ color ]
            const keys   = [ 'steps' ]
            return (
                <StackedBarChart
                    style={ { height: 200 } }
                    keys={ keys }
                    colors={ colors }
                    data={ data }
                    showGrid={ false }
                    contentInset={ { top: 30, bottom: 30 } }
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
                    style={ { height: 200 } }
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
            return (
                <StackedBarChart
                    style={ { height: 200 } }
                    keys={ keys }
                    colors={ colors }
                    data={ data }
                    showGrid={ false }
                    contentInset={ { top: 30, bottom: 30 } }
                />
            )
        }
        
    }
 
}

export default BarChartExample