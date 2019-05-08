import React from 'react'
import { BarChart, Grid } from 'react-native-svg-charts'
 
class BarChartExample extends React.PureComponent {
 
    render() {
 
        const fill = '#FDBAAF'
        const data   = [10, 6, 3, 2, 8, 6, 6]
 
        return (
            <BarChart
                style={{ height: 110}}
                data={ data }
                svg={{ fill }}
                contentInset={{ top: 10, bottom: 10 }}
                spacingInner={0.5}
                spacingOuter={.8}
            >
                {/* <Grid/> */}
            </BarChart>
        )
    }
 
}

export default BarChartExample