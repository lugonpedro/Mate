import React, { useState } from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Image, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import firebase from '../../config/firebase';
import 'firebase/auth';

export default function Login() {


    const [email, setEmail] = useState();
    const [senha, setSenha] = useState();

    function loginEmailSenha() {
        firebase.auth().signInWithEmailAndPassword(email, senha).then(resultado => {
            Alert.alert("USUÁRIO LOGADO!");
            console.log('USUÁRIO LOGADO!');
        }).catch(erro => {
            Alert.alert(erro);
            console.log("Erro ao logar!");

        });
    }

    const navigation = useNavigation();

    state = {
        signedIn: false,
        name: '',
        photoUrl: '',
    };

    function loginDev() {
        navigation.navigate('Home')
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
                onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setSenha(e.target.value)}
            />

            <TouchableOpacity
                style={styles.botao}
                onPress={loginEmailSenha}
            >
                <Text style={styles.botaoText}>Acessar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botao}
                onPress={loginDev}>
                <Text style={styles.botaoText}>Entrar como Dev</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
                style={styles.botao}
                onPress={loginFacebook}>
                <Text style={styles.botaoText}>Entrar com Facebook</Text>
            </TouchableOpacity> */}

        </View>
    );
}