import React, { useState, Fragment } from 'react';
import { View, Image, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

import firebase from 'firebase';
import 'firebase/auth';

export default function Login() {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [seeing, setSeeing] = useState(false);
    const [keyboard, setKeyboard] = useState('default');

    function register() {

        try {
            if (email.length < 10 && senha.length < 6) {
                Alert.alert("Por favor, digite um e-mail valido e uma senha com mais de 6 caracteres");
            } else {
                firebase.auth().createUserWithEmailAndPassword(email, senha).then(resultado => {
                    navigation.goBack()
                });
                Alert.alert("Cadastro realizado com sucesso")
            }
        } catch (error) {
            Alert.alert("Erro ao se cadastrar!");
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
                onChangeText={email => setEmail(email)} />

            <TextInput
                style={styles.input}
                placeholder="Senha"
                keyboardType={keyboard}
                textContentType="password"
                autoCapitalize="none"
                autoCompleteType="password"
                autoCorrect={false}
                secureTextEntry={true}
                onChangeText={senha => setSenha(senha)} />

            {seeing || (
                <Fragment>
                    <TouchableOpacity style={styles.olho} onPress={() => { setSeeing(true) & setKeyboard("visible-password") }}>
                        <FontAwesome name="eye" size={25} color="black" />
                    </TouchableOpacity>
                </Fragment>
            )}

            {seeing && (
                <Fragment>
                    <TouchableOpacity style={styles.olho} onPress={() => { setSeeing(false) & setKeyboard("default") }}>
                        <FontAwesome name="eye-slash" size={25} color="black" />
                    </TouchableOpacity>
                </Fragment>
            )}

            <TouchableOpacity
                style={styles.botao}
                onPress={register}>
                <Text style={styles.botaoText}>Registrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => { navigation.goBack() }}>
                <Text style={styles.botaoText}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}