import React, { useState, Fragment, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';

import logo from '../../../assets/icon.png';

import firebase from 'firebase';
import 'firebase/firestore';


export default function Profile() {
    const navigation = useNavigation();
    const firestore = firebase.firestore();

    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [editable, setEditable] = useState(false);

    const user = firebase.auth().currentUser;

    useEffect(() => {
        getUser()
        destrinchador = firestore.collection("passageiro").doc
            (user.uid).onSnapshot(doc => {
                setNome(doc.data().nome)
                setTel(doc.data().telefone)
                setCpf(doc.data().cpf)
                setDataNasc(doc.data().dataNasc)
            })

    });

    getUser = async () => {
        const userDocument = await firestore.collection("passageiro").doc(user.uid).get();
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.main}>
                <TextInput placeholder={"Nome Completo"}
                    style={styles.input}
                    defaultValue={nome}
                    editable={editable}
                />

                <TextInput placeholder={"Telefone"}
                    keyboardType={'numeric'}
                    maxLength={11}
                    style={styles.input}
                    defaultValue={tel}
                    editable={editable} />

                <TextInput placeholder={"Data de Nascimento"}
                    keyboardType={'numeric'}
                    maxLength={8}
                    style={styles.input}
                    defaultValue={dataNasc}
                    editable={editable} />

                <TextInput placeholder={"CPF"}
                    keyboardType={'numeric'}
                    maxLength={11}
                    style={styles.input}
                    defaultValue={cpf}
                    editable={editable} />

                {editable || (
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoEditar}
                            onPress={() => { setEditable(true) }}>
                            <Text style={styles.botaoText}>Editar</Text>
                        </TouchableOpacity>
                    </Fragment>
                )}

                {editable && (
                    <Fragment>
                        <TouchableOpacity
                            style={styles.botaoSalvar}
                            onPress={() => { setEditable(false) }}>
                            <Text style={styles.botaoText}>Salvar Edicao</Text>
                        </TouchableOpacity>
                    </Fragment>
                )}

            </View>
        </View>
    );
}