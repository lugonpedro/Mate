import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A99C7',
        paddingTop: Constants.statusBarHeight,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 60,
        paddingTop: 2,
        elevation: 10,
    },
    logo: {
        left: 10,
        width: 70,
        height: 120,
    },
    botaoTextFlatlist: {
        fontSize: 16,
        color: 'black',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    botao: {
        marginTop: 300,
        width: 350,
        height: 42,
        backgroundColor: "#5DC1FB",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoText: {
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
})