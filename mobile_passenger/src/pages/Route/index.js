import React, { useState, Fragment, useCallback } from 'react';
import { View, Image, TouchableOpacity, Text, Alert } from 'react-native';
import Map from '../../components/Map';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

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

    const [service, setService] = useState(false);
    const [driver, setDriver] = useState(null);

    function goToDrivers() {
        firestore.collection("passageiro").doc(user).onSnapshot(doc => {
            setNome(doc.data().nome)
            setCpf(doc.data().cpf)
            setDataNasc(doc.data().dataNasc)
            setTel(doc.data().telefone)
            setTurno(doc.data().turno)
            setLatC(doc.data().latitudeC)
            setLatS(doc.data().latitudeS)
        })
        if (nome != '' && cpf != '' && dataNasc != '' && tel != '' &&
            turno != '' && latitudeC != null && latitudeS != null) {
                navigation.navigate('DriverSelection')
        } else {
            Alert.alert("Por favor", "Cadastre seu perfil e escolha a rota")
        }
    }

    function goToDriver() {
        navigation.navigate('ServiceDetails', {
            uid: driver,
        })
    }

    useFocusEffect(
        useCallback(() => {
            userExists()
            return () => {
                serviceExists()
            };
        }, [driver])
    );

    function userExists() {
        firestore.collection("passageiro").doc(user).get().then(doc => {
            if (doc.exists) {
                serviceExists()
            } else {
                makeUser()
            }
        });
    }

    function makeUser() {
        firestore.collection("passageiro").doc(user).set({
            nome: "",
            cpf: "",
            telefone: "",
            dataNasc: "",
            turno: "",
            dias: [],
            latitudeC: null,
            longitudeC: null,
            latitudeS: null,
            longitudeS: null,
            motorista: null
        });
    }

    function serviceExists() {
        firestore.collection("passageiro").doc(user).get().then(doc => {
            setDriver(doc.data().motorista)
        })
        if (driver == null) {
            setService(false)
        } else {
            setService(true)
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View>
                <Map />

                {service ||
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoDrivers}
                            onPress={goToDrivers}>
                            <Text style={styles.botaoText}>Ver Motoristas</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {service &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoDriver}
                            onPress={goToDriver}>
                            <Text style={styles.botaoText}>Ver Motorista</Text>
                        </TouchableOpacity>
                    </Fragment>
                }
            </View>
        </View>
    );
}