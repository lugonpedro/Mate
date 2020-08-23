import React from 'react';
import { View, TextInput, Image, TouchableOpacity, Text } from 'react-native';

import styles from './styles';

export default function Login() {

    function login() {


    }

    return (
        <View style={styles.container}>

            <Image source={require('../../../assets/icon.png')} 
            style={styles.logo}/>

            <TextInput placeholder={"E-mail"}
            style={styles.input}/>

            <TextInput placeholder={"Senha"}
            secureTextEntry={true}
            style={styles.input}/>

            <TouchableOpacity
            style={styles.botao}
            onPress={login}>
                <Text style={styles.botaoText}>Entrar</Text>
            </TouchableOpacity>

        </View>
    );
}