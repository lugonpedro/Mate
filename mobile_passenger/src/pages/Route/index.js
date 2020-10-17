import React from 'react';
import { View, Image, Text, Alert, TouchableOpacity } from 'react-native';
import SearchEsta from '../../components/SearchEsta';
import SearchVai from '../../components/SearchVai';
import Map from '../../components/Map';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import logo from '../../../assets/icon.png';

export default function Route() {
    const navigation = useNavigation();

    function daySelection() {
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
                    onPress={daySelection}>
                    <Text style={styles.botaoText}>Escolher Dia e Hora</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}