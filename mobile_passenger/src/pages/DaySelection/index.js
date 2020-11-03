import React, { useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import Dias from '../../components/Dias';
import styles from './styles';
import logo from '../../../assets/icon.png';
import { Picker } from '@react-native-community/picker';

import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import 'firebase/firestore';

export default function DaySelection() {
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser.uid;

    const [turno, setTurno] = useState("Manha");

    const navigation = useNavigation();

    function navigateBack() {
        navigation.goBack()
    }

    async function save() {
        await firestore.collection("passageiro").doc(user).update({
            turno: turno,
        }).then(resultado => {
            navigation.navigate('DriverSelection')
        })
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

                <Picker
                    selectedValue={turno} onValueChange={turno => setTurno(turno)} mode={"dropdown"}
                    style={{ height: 50, width: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <Picker.Item label="Matutino" value="Manha" />
                    <Picker.Item label="Vespertino" value="Tarde" />
                    <Picker.Item label="Noturno" value="Noite" />
                </Picker>

                <TouchableOpacity
                    style={styles.botao}
                    onPress={save}>
                    <Text style={styles.botaoText}>Ver Motoristas</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
}