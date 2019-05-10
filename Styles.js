import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        // width: 400,
    },
    box: {
        // height: 210,
        width: 380,
        backgroundColor: '#F9F9F9',
        marginTop: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 5,
    },
    cardLabel: {
        fontSize:20, 
        marginTop:12,
        marginBottom:8,
        marginLeft:18
    },
    divider: {
        borderBottomColor: '#BDBDBD',
        borderBottomWidth: 1,
        marginLeft: 12,
        marginRight: 12
    },
    data: {
          marginTop: 5,
          marginBottom: 5,
          marginLeft: 15,
          marginRight: 15,
        //   flex: 1,
        //   alignItems: 'center'
        //   height: 200,
    },
    button: {
        paddingLeft: 140,
        paddingRight: 140,
        paddingTop: 3,
        paddingBottom: 3,
        borderRadius: 10,
        backgroundColor: '#F0F0F0'
    },
    cardQuote: {
        fontSize: 25,
        lineHeight: 40,
        alignItems: 'center',
        letterSpacing: .1,
        paddingTop: 25,
        paddingLeft: 30,
        paddingRight: 30,
        paddingBottom: 10
    },
    category:{
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'stretch',
        // borderWidth: 1,
        marginLeft: 25,
        marginRight: 25,
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
        height: 21,
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