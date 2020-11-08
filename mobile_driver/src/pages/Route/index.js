import React, { useEffect, useState } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
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

    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [turno, setTurno] = useState('');
    const [latitudeC, setLatC] = useState('');
    const [latitudeS, setLatS] = useState('');

    function goToPassengers() {
        if (nome != '' && cpf != '' && dataNasc != '' && tel != '' &&
            turno != '' && latitudeC != null && latitudeS != null) {
            navigation.navigate('PassengersDetails')
        } else {
            Alert.alert("Por favor", "Cadastre seu perfil e escolha a rota")
        }
    }

    useEffect(() => {
        userExists()
    }, [])

    function userExists() {
        firestore.collection("motorista").doc(user).get().then(doc => {
            if (doc.exists) {
                firestore.collection("motorista").doc(user).onSnapshot(doc => {
                    setNome(doc.data().nome)
                    setCpf(doc.data().cpf)
                    setDataNasc(doc.data().dataNasc)
                    setTel(doc.data().telefone)
                    setTurno(doc.data().turno)
                    setLatC(doc.data().latitudeC)
                    setLatS(doc.data().latitudeS)
                })
            } else {
                makeUser()
            }
        });
    }

    function makeUser() {
        firestore.collection("motorista").doc(user).set({
            nome: "",
            cpf: "",
            telefone: "",
            dataNasc: "",
            turno: "",
            local: "",
            dias: [],
            nota: 3,
            latitudeC: null,
            longitudeC: null,
            latitudeS: null,
            longitudeS: null,
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
                    onPress={goToPassengers}>
                    <Text style={styles.botaoText}>Ver Passageiros</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}