import React, { useEffect, useState, Fragment } from 'react';
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
    const user = firebase.auth().currentUser.uid;

    function navigateBack() {
        navigation.goBack();
    }

    const { uid } = route.params;
    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [local, setLocal] = useState('');
    const [dias, setDias] = useState([]);
    const [nota, setNota] = useState(0);

    const [requested, setRequested] = useState(false);
    const [confirmed, setConfirmed] = useState(false);
    const [voted, setVoted] = useState(false);

    var notaExponencial = nota.toExponential(2);
    var notaFormatada = notaExponencial.slice(0, 4);

    useEffect(() => {
        serviceExists();
    }, [requested, confirmed, voted])

    function serviceExists() {
        firestore.collection("motorista").doc(uid).onSnapshot(doc => {
            setNome(doc.data().nome)
            setTel(doc.data().telefone)
            setLocal(doc.data().local)
            setDias(doc.data().dias)
            setNota(doc.data().nota)
        })

        firestore.collection("passageiro").doc(user).get().then(doc => {
            setRequested(doc.data().requested)
            setConfirmed(doc.data().confirmed)
            setVoted(doc.data().voted)
        })
    }

    function makeRequest() {
        firestore.collection("passageiro").doc(user).update({
            motorista: uid,
            requested: true
        }).then(resultado => {
            serviceExists();
            Alert.alert("Serviço solicitado", "Favor aguarde confirmação");
        })
    }

    function cancelRequest() {
        firestore.collection("passageiro").doc(user).update({
            motorista: null,
            requested: false
        }).then(resultado => {
            serviceExists();
        })
    }

    function areYouSureCancel() {
        Alert.alert(
            'Cuidado',
            'Tem certeza que deseja cancelar a solicitação?',
            [
                {
                    text: 'Não',
                    onPress: () => { },
                    style: 'cancel'
                },
                { text: 'Sim, cancelar solicitação', onPress: () => cancelRequest() }
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

    function dropService() {
        firestore.collection("passageiro").doc(user).update({
            motorista: null,
            confirmed: false
        }).then(resultado => {
            navigateBack();
        })
    }

    function giveNote(givenNote) {
        var newNote = (nota + givenNote) / 2
        firestore.collection("motorista").doc(uid).update({
            nota: newNote,
        }).then(resultado => {
            setNota(newNote);
        })

        firestore.collection("passageiro").doc(user).update({
            voted: true
        }).then(resultado => {
            setVoted(true);
            Alert.alert("Obrigado pelo feedback!");
        })
    }

    function sendWpp() {
        Linking.openURL(`whatsapp://send?phone=55${tel}&text=`);
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

                {confirmed == true && voted == false &&
                    <Fragment>
                        <View style={{ flexDirection: 'row', padding: 10 }}>
                            <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 1, paddingRight: 5 }}>Nota:</Text>
                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => { giveNote(1) }}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }}>1</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => { giveNote(2) }}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => { giveNote(3) }}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => { giveNote(4) }}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ padding: 5 }}
                                onPress={() => { giveNote(5) }}
                            >
                                <FontAwesome name="star" size={24} color="black" />
                                <Text style={{ fontSize: 18, fontWeight: 'bold', paddingLeft: 5 }}>5</Text>
                            </TouchableOpacity>
                        </View>
                    </Fragment>
                }

                {confirmed == true && voted == true &&
                    <Fragment>
                        <Text style={{ fontSize: 22, fontWeight: 'bold', padding: 10, paddingRight: 5 }}>Nota: {notaFormatada}</Text>
                    </Fragment>
                }

                {requested == false && confirmed == false &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoSolicitar}
                            onPress={() => { makeRequest() }}>
                            <Text style={styles.botaoText}>Solicitar Serviço</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {requested == true && confirmed == false &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoSolicitado}
                            onPress={() => { areYouSureCancel() }}>
                            <Text style={styles.botaoText}>Cancelar Solicitação</Text>
                        </TouchableOpacity>
                    </Fragment>
                }

                {confirmed == true &&
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoCancelar}
                            onPress={() => { areYouSure() }}>
                            <Text style={styles.botaoText}>Cancelar Serviço</Text>
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