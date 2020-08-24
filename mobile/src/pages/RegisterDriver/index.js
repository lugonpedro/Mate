import React from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function RegisterDriver() {
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    function register() {
        navigation.navigate('Driver')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <FontAwesome name="arrow-left" size={30} color="#377294" />
                </TouchableOpacity>
            </View>

            <View style={styles.container}>

                <Text style={styles.texto}>Registro de Motorista</Text>
                <TextInput placeholder={"Nome Completo"}
                    style={styles.input} />

                <TextInput placeholder={"Telefone"}
                    keyboardType={'numeric'}
                    style={styles.input} />

                <TextInput placeholder={"Data de Nascimento"}
                    keyboardType={'numeric'}
                    style={styles.input} />

                <TextInput placeholder={"CPF"}
                    keyboardType={'numeric'}
                    style={styles.input} />

                <TextInput placeholder={"CNH"}
                    keyboardType={'numeric'}
                    style={styles.input} />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={register}>
                    <Text style={styles.botaoText}>Cadastrar</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}