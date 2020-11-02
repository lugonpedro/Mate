import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView } from 'react-native';

import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import 'firebase/firestore';

export default function DriverSelection() {
    const navigation = useNavigation();

    const [nome, setNome] = useState('');
    const [turno, setTurno] = useState('');
    const [local, setLocal] = useState('');
    const [nota, setNota] = useState(0);

    const user = firebase.auth().currentUser.uid;
    const firestore = firebase.firestore();

    function navigateBack() {
        navigation.goBack()
    }

    function goToDriver() {
        navigation.navigate('ServiceDetails')
    }

    useEffect(() => {
        firestore.collection("motorista").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                firestore.collection("motorista").doc(doc.id).onSnapshot(doc => {
                    setNome(doc.data().nome)
                    setTurno(doc.data().turno)
                    setLocal(doc.data().local)
                    setNota(doc.data().nota)
                })
            });
        }).catch(function (error) {
            console.log(error);
        });

    }, [])

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

                <ScrollView>
                    <TouchableOpacity style={styles.card} onPress={goToDriver}>
                        <Text style={styles.textNome}>{nome}</Text>
                        <Text>{turno}</Text>
                        <Text>{local}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{ paddingLeft: 240, paddingRight: 5, fontWeight: 'bold' }}>{nota}</Text>
                            <FontAwesome name="star" size={18} color={"black"} />
                        </View>
                    </TouchableOpacity>
                </ScrollView>

            </View>
        </View >
    );
}