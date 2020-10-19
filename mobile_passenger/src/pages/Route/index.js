import React from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Map from '../../components/Map';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import logo from '../../../assets/icon.png';

export default function Route() {
    const navigation = useNavigation();

    function goToDaySelection() {
        navigation.navigate('DaySelection')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View>
                <Map />
                <TouchableOpacity
                    style={styles.botao}
                    onPress={goToDaySelection}>
                    <Text style={styles.botaoText}>Escolher Dia e Turno</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}