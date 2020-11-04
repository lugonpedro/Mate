import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A99C7',
        paddingTop: Constants.statusBarHeight,
    },
    main: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 60,
        paddingTop: 2,
        elevation: 10,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
    },
    logo: {
        left: 10,
        width: 70,
        height: 120,
    },
    input: {
        marginTop: 10,
        padding: 10,
        width: 300,
        backgroundColor: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
        borderRadius: 3,
    },
    botaoEditar: {
        marginTop: 200,
        width: 350,
        height: 42,
        backgroundColor: "#326888",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoSalvar: {
        marginTop: 200,
        width: 350,
        height: 42,
        backgroundColor: "#5DC1FB",
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
})