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
    main: {
        alignItems: 'center',
    },
    card: {
        height: 100,
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textNome: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    textNota: {
        paddingLeft: 250,
    },
})