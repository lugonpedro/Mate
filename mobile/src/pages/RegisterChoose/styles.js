import { StyleSheet } from 'react-native';
import Constants from 'expo-constants';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A99C7',
    },
    header: {
        paddingTop: Constants.statusBarHeight+20,
        marginRight: 310,
    },
    box: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        margin: 50,
    },
    botaoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    botao: {
        width: 150,
        height: 42,
        backgroundColor: "#377294",
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
});