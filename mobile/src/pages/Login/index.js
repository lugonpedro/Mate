import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Login() {
    const navigation = useNavigation();

    function login() {

    }

    function register() {
        navigation.navigate('Register')
    }

    function forgotpass() {

    }

    return (
        <View style={styles.container}>

            <Image source={require('../../../assets/icon.png')}
                style={styles.logo} />

            <TextInput placeholder={"E-mail"}
                style={styles.input} />

            <TextInput placeholder={"Senha"}
                secureTextEntry={true}
                style={styles.input} />

            <TouchableOpacity
                style={styles.botao}
                onPress={login}>
                <Text style={styles.botaoText}>Entrar</Text>
            </TouchableOpacity>

            <View 
            style={styles.botoes}>
                <TouchableOpacity
                    style={styles.botaoDebaixo}
                    onPress={register}>
                    <Text style={styles.botaoText}>Registrar-se</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.botaoDebaixo}
                    onPress={forgotpass}>
                    <Text style={styles.botaoText}>Esqueci a senha</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}