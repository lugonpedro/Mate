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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingHorizontal: 20,
        height: 65,
        paddingTop: 2,
    },
    headerText: {
        left: 10,
        fontSize: 30,
        fontWeight: 'bold',
    },
    logo: {
        left: 20,
        width: 70,
        height: 120,
    },
})