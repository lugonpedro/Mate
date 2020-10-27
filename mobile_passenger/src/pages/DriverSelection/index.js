import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DriverSelection() {
    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    function goToDriver() {
        navigation.navigate('ServiceDetails')
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.main}>
                <Text style={{ padding: 15, fontSize: 18, fontWeight: 'bold' }}>Por favor, escolha um motorista</Text>

                {/* array.forEach(element => { */}
                <TouchableOpacity style={styles.card} onPress={goToDriver}>
                    <Text style={styles.textNome}>Nome do Motorista</Text>
                    <Text>Turno</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>Saida</Text>
                        <Text> - </Text>
                        <Text>Chegada</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 240, paddingRight: 5, fontWeight: 'bold'}}>4,5</Text>
                        <FontAwesome name="star" size={18} color={"black"} />
                    </View>
                </TouchableOpacity>
                {/* }); */}
            </View>
        </View >
    );
}