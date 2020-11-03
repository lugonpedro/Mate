import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';

import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import 'firebase/firestore';

export default function DriverSelection() {
    const navigation = useNavigation();
    const data = [];
    const firestore = firebase.firestore();

    function navigateBack() {
        navigation.goBack()
    }

    function goToDriver() {
        navigation.navigate('ServiceDetails')
    }

    // DATA = `{id: '${doc.id}', 
    //             nome: '${doc.data().nome}', 
    //             turno: '${doc.data().turno}',
    //             local: '${doc.data().local}',
    //             nota: '${doc.data().nota}}',`


    useEffect(() => {
        getDrivers();
    }, [])

    function getDrivers() {
        firestore.collection("motorista").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                console.log()   
            });
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

            <View style={styles.main}>
                <Text style={{ padding: 15, fontSize: 18, fontWeight: 'bold' }}>Por favor, escolha um motorista</Text>

                {data}

                {/* <TouchableOpacity style={styles.card} onPress={goToDriver}>
                    <Text style={styles.textNome}>{nome}</Text>
                    <Text>{turno}</Text>
                    <Text>{local}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ paddingLeft: 240, paddingRight: 5, fontWeight: 'bold' }}>{nota}</Text>
                        <FontAwesome name="star" size={18} color={"black"} />
                    </View>
                </TouchableOpacity> */}

            </View>
        </View >
    );
}