import React, { useState, useEffect, Fragment } from 'react';
import { View, Image, Text, TextInput, TouchableOpacity, Button, Alert, Linking } from 'react-native';
import styles from './styles';
import logo from '../../../assets/icon.png';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import firebase from 'firebase';
import 'firebase/firestore';

export default function ServiceDetails({ route }) {
    const navigation = useNavigation();
    const firestore = firebase.firestore();

    function navigateBack() {
        navigation.goBack();
    }

    const { uid } = route.params;
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [cpf, setCpf] = useState('');
    const [dias, setDias] = useState([]);
    const [confirmed, setConfirmed] = useState(false);

    useEffect(() => {
        getPassenger();
    }, [confirmed])

    function getPassenger() {
        firestore.collection("passageiro").doc(uid).get().then(doc => {
            setNome(doc.data().nome)
            setTel(doc.data().telefone)
            setCpf(doc.data().cpf)
            setDias(doc.data().dias)
            setConfirmed(doc.data().confirmed)
        });
    }

    function areYouSureRefuse() {
        Alert.alert(
            'Cuidado',
            'Tem certeza que deseja recusar o passageiro?',
            [
                {
                    text: 'Não',
                    onPress: () => { },
                    style: 'cancel'
                },
                { text: 'Sim, recusar', onPress: () => refusePassenger() }
            ],
            { cancelable: false }
        );
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

    function acceptPassenger() {
        firestore.collection("passageiro").doc(uid).update({
            confirmed: true,
            requested: false
        }).then(resultado => {
            setConfirmed(true);
        })
    }

    function refusePassenger() {
        firestore.collection("passageiro").doc(uid).update({
            motorista: null,
            requested: false
        }).then(resultado => {
            navigateBack();
        })
    }

    function dropService() {
        firestore.collection("passageiro").doc(uid).update({
            motorista: null,
            confirmed: false,
        }).then(resultado => {
            navigateBack();
        })
    }

    function sendWpp() {
        Linking.openURL(`whatsapp://send?phone=55${tel}&text=""`);
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
                <TextInput placeholder={"Nome do Passageiro"}
                    style={styles.input}
                    defaultValue={nome}
                    editable={false}
                />

                <TextInput placeholder={"Telefone"}
                    style={styles.input}
                    defaultValue={tel}
                    editable={false} />

                <TextInput placeholder={"CPF"}
                    style={styles.input}
                    defaultValue={cpf}
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

                {confirmed &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoCancelar}
                            onPress={() => { areYouSure() }}>
                            <Text style={styles.botaoText}>Cancelar Serviço</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {confirmed ||
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoAceitar}
                            onPress={() => { acceptPassenger() }}>
                            <Text style={styles.botaoText}>Aceitar Passageiro</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.botaoRecusar}
                            onPress={() => { areYouSureRefuse() }}>
                            <Text style={styles.botaoText}>Recusar Passageiro</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                <TouchableOpacity
                    style={styles.botaoWpp}
                    onPress={() => { sendWpp() }}>
                    <Text style={styles.botaoText}>Conversar pelo WhatsApp</Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}