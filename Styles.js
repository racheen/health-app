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
    }
});