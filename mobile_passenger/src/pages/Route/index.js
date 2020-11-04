import React, { useEffect, useState, Fragment } from 'react';
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

    const [service, setService] = useState(false);
    const [driver, setDriver] = useState(null);

    function goToDaySelection() {
        navigation.navigate('DaySelection')
    }

    function goToDriver() {
        navigation.navigate('ServiceDetails', {
            uid: driver,
        })
    }

    useEffect(() => {
        userExists()
    }, [driver])

    // useEffect(() => {
    //     serviceExists()
    // }, [driver])

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
            dias: "",
            turno: "",
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
                            style={styles.botao}
                            onPress={goToDaySelection}>
                            <Text style={styles.botaoText}>Escolher Dia e Turno</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {service &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botao}
                            onPress={goToDriver}>
                            <Text style={styles.botaoText}>Ver Motorista</Text>
                        </TouchableOpacity>
                    </Fragment>
                }


            </View>
        </View>
    );
}