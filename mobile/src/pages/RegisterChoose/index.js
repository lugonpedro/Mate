import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

import styles from './styles';

export default function RegisterChoose() {
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    function registerPassenger() {
        navigation.navigate('RegisterPassenger')
    }

    function registerDriver() {
        navigation.navigate('RegisterDriver')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <FontAwesome name="arrow-left" size={30} color="#377294" />
                </TouchableOpacity>
            </View>
            <View style={styles.container}>

                <View style={styles.box}>
                    <Text>
                        Sim eu sou um
                </Text>
                    <TouchableOpacity style={styles.botao} onPress={registerPassenger}>
                        <Text style={styles.botaoText}>Passageiro!</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.box}>
                    <Text>
                        Sim eu sou um
                </Text>
                    <TouchableOpacity style={styles.botao} onPress={registerDriver}>
                        <Text style={styles.botaoText}>Motorista!</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
}