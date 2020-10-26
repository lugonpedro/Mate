import React from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
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

    async function loginGoogle() {
        try {
            const result = await Google.logInAsync({
                androidClientId: '804369863474-4vtbm9dsesk1anouteho4olavv2funpk.apps.googleusercontent.com',
                scopes: ['profile', 'email']
            })

            if (result.type === 'success') {
                navigation.navigate('Home')
                this.setState({
                    signedIn: true,
                    name: result.user.name,
                    photoUrl: result.user.photoUrl,
                })
            } else {
                return { cancelled: true }
            }
        } catch (e) {
            return { error: true }
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
                style={styles.buttonSubmit}
                onPress={loginEmailSenha}
            >
                <Text style={styles.submitText}>Acessar</Text>
            </TouchableOpacity>


            <TouchableOpacity
                style={styles.botao}
                onPress={loginGoogle}>
                <Text style={styles.botaoText}>Entrar com Google</Text>
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