import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#4A99C7',
    },
    logo: {
        width: 300,
        height: 100,
        left: 10,
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
    botao: {
        width: 300,
        height: 42,
        backgroundColor: "#377294",
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    botaoText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
    },
    botaoDebaixo: {
        backgroundColor: '#377294',
        borderRadius: 4,
        height: 42,
        width: 140,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    botoes: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})