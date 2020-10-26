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
    botaoForgotPass: {
        width: 300,
        height: 42,
        backgroundColor: "#377294",
        marginTop: 10,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    botoes: {
        marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    //Testando layout imput e button 
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 22,
        borderRadius: 7,
        padding: 10
    },

    buttonSubmit: {
        backgroundColor: '#59BFFF',
        width: '90%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7
    },
    submitText: {
        color: '#FFF',
        fontSize: 19
    },
})