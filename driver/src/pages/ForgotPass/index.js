import React, { useState } from 'react';
import { View, Image, TouchableOpacity, Text, Alert, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import firebase from 'firebase';
import 'firebase/auth';

export default function ForgotPass() {

    const navigation = useNavigation();
    const [email, setEmail] = useState('');

    function forgot() {

        try {
            if (email.length < 10) {
                Alert.alert("E-mail invalido");
            } else {
                firebase.auth().sendPasswordResetEmail(email).then(resultado => {
                    Alert.alert("Redefinir senha enviada pro e-mail!");
                    navigation.goBack();
                });
            }
        } catch (error) {
            Alert.alert("Erro ao solicitar redefinicao!");
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

            <TouchableOpacity
                style={styles.botao}
                onPress={forgot}>
                <Text style={styles.botaoText}>Redefinir Senha</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.botaoVoltar}
                onPress={() => navigation.goBack()}>
                <Text style={styles.botaoText}>Voltar</Text>
            </TouchableOpacity>

        </View>
    );
}