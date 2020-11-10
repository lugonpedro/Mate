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

    const [confirmed, setConfirmed] = useState(false);
    const [requested, setRequested] = useState(false);

    const [driver, setDriver] = useState(null);

    function goToDrivers() {
        if (nome != '' && cpf != '' && dataNasc != '' && tel != '' &&
            turno != '' && latitudeC != null && latitudeS != null) {
            navigation.navigate('DriverSelection');
        } else {
            Alert.alert("Por favor", "Cadastre seu perfil e escolha a rota");
        }
    }

    function goToDriver() {
        if (nome != '' && cpf != '' && dataNasc != '' && tel != '' &&
            turno != '' && latitudeC != null && latitudeS != null) {
            navigation.navigate('ServiceDetails', {
                uid: driver,
            })
        } else {
            Alert.alert("Por favor", "Cadastre seu perfil e escolha a rota");
        }

    }

    useFocusEffect(
        useCallback(() => {
            userExists();
            return () => {
                userExists();
            };
        }, [requested, confirmed])
    );

    function userExists() {
        firestore.collection("passageiro").doc(user).get().then(doc => {
            if (doc.exists) {
                // firestore.collection("passageiro").doc(user).get().then(doc => {
                setNome(doc.data().nome)
                setCpf(doc.data().cpf)
                setDataNasc(doc.data().dataNasc)
                setTel(doc.data().telefone)
                setTurno(doc.data().turno)
                setLatC(doc.data().latitudeC)
                setLatS(doc.data().latitudeS)
                setDriver(doc.data().motorista)
                setRequested(doc.data().requested)
                setConfirmed(doc.data().confirmed)
                // })
            } else {
                makeUser();
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
            requested: false,
            confirmed: false,
            motorista: null,
            voted: false
        });
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View>
                <Map />

                {requested == false && confirmed == false &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoDrivers}
                            onPress={goToDrivers}>
                            <Text style={styles.botaoText}>Ver Motoristas</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {requested == true && confirmed == false &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoAwaiting}
                            onPress={goToDriver}>
                            <Text style={styles.botaoText}>Aguardando Confirmação</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {confirmed == true &&
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