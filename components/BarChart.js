import React from 'react'
import { BarChart, Grid, StackedBarChart } from 'react-native-svg-charts'
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
                // tx.executeSql('DROP TABLE IF EXISTS activity',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS activity (id integer primary key not null, fitnessact text, duration text, distance text, calories text, date text)',[],(_,results)=>console.log('add table'));
                tx.executeSql('select * from activity',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else if (screen=='meal') {
            db.transaction(tx => {
                // tx.executeSql('DROP TABLE IF EXISTS activity',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS meal (id integer primary key not null, mealname text, fats text, proteins text, calories text, date text)',[],(_,results)=>console.log('add table'));
                tx.executeSql('select * from meal',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } else {
            db.transaction(tx => {
                // tx.executeSql('DROP TABLE IF EXISTS activity',[],(_,results)=>console.log('drop table'));
                tx.executeSql('CREATE TABLE IF NOT EXISTS sleep (id integer primary key not null, date text, duration text)',[],(_,results)=>console.log('add table'));
                tx.executeSql('select * from sleep',[],(tx,results)=>this.setState({items:results.rows._array}));
            })
        } 
    }
    componentDidMount(){
        const {screen} = this.props
        console.log('screen', screen)
        this.getData(screen)
    }

    render() {
        const {color, screen} = this.props
        // console.log('color', color)
        console.log(this.state.items)
        var data = []
        var fill = color
        if (screen=='activity'){
            return (
                <BarChart
                    style={{ height: 110}}
                    data={ [0,0,0,0,0,0,0] }
                    svg={{ fill }}
                    contentInset={{ top: 10, bottom: 10 }}
                    spacingInner={0.5}
                    spacingOuter={.8}
                >
                {/* <Grid/> */}
                </BarChart>
            )            
        } else if (screen=='meal') {
            this.state.items !== null 
                ? (this.state.items.length > 7 
                    ? data = this.state.items.slice((this.state.items.length-7),this.state.items.length) 
                    : data = this.state.items.slice(0,7))
                : console.log('state is null')
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
                ? (this.state.items.length > 7 
                    ? this.state.items.slice((this.state.items.length-7),this.state.items.length).map(({id, duration})=>data.push(parseInt(duration.split(" ")[0])))
                    : this.state.items.slice(0,7).map(({id, duration})=>data.push(parseInt(duration.split(" ")[0]))))
                : data = [0,0,0,0,0,0,0] && console.log('state is null')
                return (
                    <BarChart
                        style={{ height: 110}}
                        data={ data }
                        svg={{ fill }}
                        contentInset={{ top: 10, bottom: 10 }}
                        spacingInner={0.5}
                        spacingOuter={.8}
                    />
                )  
            }
        
    }
 
}

export default BarChartExample