import React from 'react';
import { View, Image, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import styles from './styles';
import logo from '../../../assets/icon.png';
import Turno from '../../components/Turno';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DaySelection() {
    const navigation = useNavigation();

    state = {
        dias: [
            { id: "Segunda", name: 'SEG' },
            { id: "Terca", name: 'TER' },
            { id: "Quarta", name: 'QUA' },
            { id: "Quinta", name: 'QUI' },
            { id: "Sexta", name: 'SEX' },
            { id: "Sabado", name: 'SAB' },
        ],
    };

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

            <View>
                <SafeAreaView style={{ alignItems: 'center' }}>
                    <Text style={{ paddingTop: 15, fontSize: 18, fontWeight: 'bold' }}>Selecione os dias</Text>
                    <FlatList
                        data={state.dias}
                        keyExtractor={item => item.id}
                        numColumns={6}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.item}>
                                    <TouchableOpacity style={styles.botaoFlatlist} onPress={() => alert(item.id)}>
                                        <Text>{item.name}</Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        }} />
                    <Text style={{ paddingTop: 30, fontSize: 18, fontWeight: 'bold' }}>Selecione o turno</Text>
                    <Turno/>
                    <TouchableOpacity
                        style={styles.botao}
                        onPress={() => navigation.navigate('DriverSelection')}>
                        <Text style={styles.botaoText}>Ver Motoristas</Text>
                    </TouchableOpacity>
                </SafeAreaView>
            </View>
        </View>
    );
}