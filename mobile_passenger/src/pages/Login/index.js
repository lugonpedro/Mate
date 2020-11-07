import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import firebase from 'firebase';
import 'firebase/auth';

export default function Login() {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    function login() {

        try {
            if (email.length < 10 && senha.length < 6) {
                Alert.alert("Credenciais invalidas");
            } else {
                firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
                    navigation.navigate('Home')
                });
            }
        } catch (error) {
            Alert.alert("Erro ao logar!");
            console.log(erro);
        }
    }

    return (
        <View style={styles.container}>

            <Image source={require('../../../assets/icon.png')}
                style={styles.logo} />

            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoCapitalize="none"
                autoCompleteType="email"
                autoCorrect={false}
                onChangeText={email => setEmail(email)}
            />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                //keyboardType="visible-password"
                textContentType="password"
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={senha => setSenha(senha)}
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={login}>
                <Text style={styles.botaoText}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botao}
                onPress={() => navigation.navigate('ForgotPass')}>
                <Text style={styles.botaoText}>Esqueci a Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoRegister}
                onPress={() => navigation.navigate('Register')}>
                <Text style={styles.botaoText}>Registrar</Text>
            </TouchableOpacity>

        </View>
    );
}