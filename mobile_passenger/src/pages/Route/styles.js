import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4A99C7',
        paddingTop: Constants.statusBarHeight,
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
        left: 20,
        width: 70,
        height: 120,
    },
    textInput: {
        width: '100%',
    },
    map: {
        width: '100%',
        height: '100%',
    },
})