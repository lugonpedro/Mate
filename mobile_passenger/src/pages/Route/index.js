import React, { useEffect } from 'react';
import { View, Image, TouchableOpacity, Text } from 'react-native';
import Map from '../../components/Map';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import logo from '../../../assets/icon.png';

import firebase from 'firebase';
import 'firebase/firestore';

export default function Route() {
    const firestore = firebase.firestore();
    const navigation = useNavigation();

    const user = firebase.auth().currentUser.uid;

    function goToDaySelection() {
        navigation.navigate('DaySelection')
    }

    useEffect(() => {
        // fazer um if caso o usuario ja seja cadastrado nao fazer o makeUser
        makeUser()
    }, [])

    async function makeUser() {
        const userDocument = await firestore.collection("passageiro").doc(user).set({
            nome: "",
            cpf: "",
            telefone: "",
            dataNasc: "",
            latitudeC: "",
            longitudeC: "",
            latitudeS: "",
            longitudeS: "",
            motorista: ""
        });
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