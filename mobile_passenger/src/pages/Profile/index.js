import React from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

import logo from '../../../assets/icon.png';

export default function Profile() {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo}/>
            </View>

            <View style={styles.main}>
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

            </View>
        </View>
    );
}