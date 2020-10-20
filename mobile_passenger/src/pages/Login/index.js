import React from 'react';
import * as Google from 'expo-google-app-auth';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

export default function Login() {
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