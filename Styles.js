import { StyleSheet } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';


export default EStyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // width: 400,
    },
    box: {
        // height: 210,
        width: "370rem",
        backgroundColor: '#FFFFFF',
        marginTop: "10rem",
        marginLeft: "10rem",
        marginRight: "10rem",
        borderRadius: "20rem",
        borderWidth: "1rem",
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: "10rem",
    },
    cardLabel: {
        fontSize:"20rem", 
        marginTop:"12rem",
        marginBottom:"8rem",
        marginLeft:"18rem",
        fontFamily:'ReemKufi'
    },
    divider: {
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: "1rem",
        marginLeft: "12rem",
        marginRight: "12rem"
    },
    data: {
          marginTop: "5rem",
          marginBottom: "5rem",
          marginLeft: "15rem",
          marginRight: "15rem",
        //   flex: 1,
        //   alignItems: 'center'
        //   height: 200,
    },
    button: {
        paddingLeft: "140rem",
        paddingRight: "140rem",
        paddingTop: "3rem",
        paddingBottom: "3rem",
        borderRadius: "10rem",
        backgroundColor: '#F0F0F0',
        fontFamily:'ReemKufi'
    },
    cardQuote: {
        fontSize: "25rem",
        lineHeight: "40rem",
        alignItems: 'center',
        letterSpacing: ".1rem",
        paddingTop: "25rem",
        paddingLeft: "30rem",
        paddingRight: "30rem",
        paddingBottom: "10rem",
        width: "380rem",
        backgroundColor: '#FFFFFF',
        marginTop: "10rem",
        marginLeft: "5rem",
        marginRight: "5rem",
        marginBottom: "10rem",
        borderRadius: "20rem",
        borderWidth: "1rem",
        borderColor: '#ddd',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        fontFamily: 'ReemKufi'
    },
    category:{
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        // borderWidth: 1,
        marginLeft: "25rem",
        marginRight: "25rem",
    },
    categoryDay:{
        alignItems: 'center',
        flex:1,
        // width: 86,
        // alignItems: 'stretch',
        height: 21,
        // marginLeft:17,
        // marginTop: 92,
        backgroundColor:'#F9F9F9',
        borderWidth: 1,
        borderColor: '#6EB1CB',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
    },
    categoryWeek:{
        alignItems: 'center',
        // width: 86,
        flex:1,
        height: "21rem",
        // marginLeft:17,
        // marginTop: 92,
        backgroundColor:'#F9F9F9',
        borderWidth: 1,
        borderColor: '#6EB1CB',
    },
    categoryMonth:{
        alignItems: 'center',
        flex:1,
        // width: 86,
        height: 21,
        // marginLeft:17,
        // marginTop: 92,
        backgroundColor:'#F9F9F9',
        borderWidth: 1,
        borderColor: '#6EB1CB',
    },
    categoryYear:{
        alignItems: 'center',
        flex:1,
        // width: 86,
        height: 21,
        // marginLeft:17,
        // marginTop: 92,
        backgroundColor:'#F9F9F9',
        borderWidth: 1,
        borderColor: '#6EB1CB',
        borderTopRightRadius: 10,
        borderBottomRightRadius: 10,
    },
    listContainer: {
        // flex: 1,
        alignItems: 'stretch',
        // justifyContent: 'space-around',
        // height: 100,
        // flexDirection: 'row',
        // borderWidth: 1,
        padding:2
    },
    listItem: {
        flex: 3,
        alignItems: 'center',
        // flexWrap: 'wrap',
        // height: 100,
        // flexDirection: 'row',
        // borderWidth: 1,
        margin: 3,
        padding: 5,
        // backgroundColor: '#FDBAAF'
        borderRadius: 5
    }
});