import React, { useEffect, useState, Fragment } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Button, Alert } from 'react-native';
import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import 'firebase/firestore';

export default function ServiceDetails({ route }) {
    const navigation = useNavigation();
    const firestore = firebase.firestore();
    const user = firebase.auth().currentUser.uid;

    function navigateBack() {
        navigation.goBack()
    }

    const { uid } = route.params;
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [local, setLocal] = useState('');
    const [dias, setDias] = useState([]);
    const [nota, setNota] = useState(0);

    const [service, setService] = useState(false);
    const [driver, setDriver] = useState(null);

    useEffect(() => {
        firestore.collection("motorista").doc(uid).onSnapshot(doc => {
            setNome(doc.data().nome)
            setTel(doc.data().telefone)
            setLocal(doc.data().local)
            setDias(doc.data().dias)
            setNota(doc.data().nota)
        })
    }, [])

    useEffect(() => {
        serviceExists()
    }, [driver])

    function serviceExists() {
        firestore.collection("passageiro").doc(user).get().then(doc => {
            setDriver(doc.data().motorista)
        })
        if (driver != null) {
            setService(true)
        }
    }

    async function getService() {
        await firestore.collection("passageiro").doc(user).update({
            motorista: uid,
        }).then(resultado => {

        })
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    }

    function areYouSure() {
        Alert.alert(
            'Cuidado',
            'Tem certeza que deseja cancelar o serviço?',
            [
                {
                    text: 'Não',
                    onPress: () => { },
                    style: 'cancel'
                },
                { text: 'Sim, cancelar serviço', onPress: () => dropService() }
            ],
            { cancelable: false }
        );
    }

    async function dropService() {
        await firestore.collection("passageiro").doc(user).update({
            motorista: null,
        }).then(resultado => {

        })
        navigation.reset({ index: 0, routes: [{ name: 'Home' }] })
    }

    function giveNote(givenNote) {
        var newNote = (nota + givenNote)/2
        firestore.collection("motorista").doc(uid).update({
            nota: newNote,
        }).then(resultado => {
            setNota(newNote)
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
                <TextInput placeholder={"Nome do Motorista"}
                    style={styles.input}
                    defaultValue={nome}
                    editable={false}
                />

                <TextInput placeholder={"Telefone"}
                    style={styles.input}
                    defaultValue={tel}
                    editable={false} />

                <TextInput placeholder={"Local de Trabalho"}
                    style={styles.input}
                    defaultValue={local}
                    editable={false} />

                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingTop: 10 }}>Dias de Trabalho</Text>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    padding: 10,
                }}>
                    {dias.map((item, key) => (
                        <Button key={key} title={item} color={'black'}>
                        </Button>)
                    )}
                </View>

                {service ||
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoSolicitar}
                            onPress={() => { getService() }}>
                            <Text style={styles.botaoText}>Solicitar Serviço</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {service &&
                    <Fragment>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 1 }}>Nota:</Text>
                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => {giveNote(1)}}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }}>1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => {giveNote(2)}}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => {giveNote(3)}}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => {giveNote(4)}}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => {giveNote(5)}}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 5}}>5</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={styles.botaoCancelar}
                            onPress={() => { areYouSure() }}>
                            <Text style={styles.botaoText}>Cancelar Serviço</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

            </View>
        </View>
    );
}