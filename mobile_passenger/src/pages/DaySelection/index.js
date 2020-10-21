import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import logo from '../../../assets/icon.png';
import Turno from '../../components/Turno';
import Dias from '../../components/Dias';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DaySelection() {
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={{ alignItems: 'center' }}>
                
                <Text style={{ paddingTop: 15, fontSize: 18, fontWeight: 'bold' }}>Selecione os dias</Text>
                <Dias />

                <Text style={{ paddingTop: 30, fontSize: 18, fontWeight: 'bold' }}>Selecione o turno</Text>
                <Turno />

                <TouchableOpacity
                    style={styles.botao}
                    onPress={() => navigation.navigate('DriverSelection')}>
                    <Text style={styles.botaoText}>Ver Motoristas</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}