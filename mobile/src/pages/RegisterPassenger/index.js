import React from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function RegisterPassenger() {
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    function register() {
        navigation.navigate('')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <FontAwesome name="arrow-left" size={30} color="#377294" />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>
                <Image source={require('../../../assets/icon.png')}
                    style={styles.logo} />

                <TextInput placeholder={"E-mail"}
                    style={styles.input} />

                <TextInput placeholder={"Senha"}
                    secureTextEntry={true}
                    style={styles.input} />

                <TextInput placeholder={"Confirme sua senha"}
                    secureTextEntry={true}
                    style={styles.input} />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => {}}>
                    <Text style={styles.botaoText}>Continuar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}