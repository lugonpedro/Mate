import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';

import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import 'firebase/firestore';

const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.title}</Text>
    </TouchableOpacity>
);

export default function DriverSelection() {
    const navigation = useNavigation();

    const firestore = firebase.firestore();

    const [uid, setUid] = useState('');

    function navigateBack() {
        navigation.goBack()
    }

    function goToDriver() {
        navigation.navigate('ServiceDetails')
    }

    const DATA = [];

    useEffect(() => {
        firestore.collection("motorista").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                firestore.collection("motorista").doc(doc.id).onSnapshot(doc => {
                    DATA.push(`id: ${doc.id}, 
                        nome: ${doc.data().nome}, 
                        turno: ${doc.data().turno},
                        local: ${doc.data().local},
                        nota: ${doc.data().nota}},`)
                })
            });
        }).catch(function (error) {
            console.log(error);
        });
        console.log(DATA)
    }, [])

    const renderItem = ({ item }) => {
        return <Item item={item} onPress={() => setSelectedId(item.id)} />;
    };

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

                    <FlatList
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        extraData={uid}
                    />
                
                
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