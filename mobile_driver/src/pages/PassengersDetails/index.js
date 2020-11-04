import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import 'firebase/firestore';

export default function PassengersDetails() {
    const navigation = useNavigation();
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser.uid;

    function navigateBack() {
        navigation.goBack()
    }

    function goToDetails() {
        navigation.navigate('ServiceDetails', {
            uid: uid,
        })
    }

    const [list, setList] = useState([]);
    const [uid, setUid] = useState('');

    useEffect(() => {
        firestore.collection("passageiro").where("motorista", "==", user).get().then(querySnapshot => {
            var li = []
            querySnapshot.forEach(doc => {
                li.push({
                    id: doc.id,
                    nome: doc.data().nome,
                    turno: doc.data().turno,
                    tel: doc.data().telefone,
                    nota: doc.data().nota
                })
            })
            setList(li)
        })
    }, [uid])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={navigateBack}>
                    <FontAwesome name="arrow-left" size={30} color="black" />
                </TouchableOpacity>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.main}>
                <Text style={{ padding: 15, fontSize: 18, fontWeight: 'bold' }}>Passageiros</Text>

                <FlatList style={{ width: '100%' }}
                    data={list}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center', padding: 3 }}>
                                <TouchableOpacity style={{
                                    height: 100,
                                    width: 300,
                                    backgroundColor: 'white',
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                    onPressIn={() => { setUid(item.id) }}
                                    onPress={() => {
                                        navigation.navigate('ServiceDetails', {
                                            uid: uid
                                        })
                                    }}
                                >
                                    <Text style={{
                                        fontSize: 24,
                                        fontWeight: 'bold',
                                    }}>{item.nome}</Text>
                                    <Text>{item.turno}</Text>
                                    <Text>Telefone: {item.tel}</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }} />

            </View>
        </View>
    );
}