import React, { useState, Fragment, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text } from 'react-native';

import styles from './styles';
import logo from '../../../assets/icon.png';

import firebase from 'firebase';
import 'firebase/firestore';

export default function Profile() {
    const firestore = firebase.firestore();

    const [nome, setNome] = useState('');
    const [tel, setTel] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [editable, setEditable] = useState(false);

    const user = firebase.auth().currentUser.uid;

    useEffect(() => {
        firestore.collection("motorista").doc(user).onSnapshot(doc => {
            setNome(doc.data().nome)
            setTel(doc.data().telefone)
            setCpf(doc.data().cpf)
            setDataNasc(doc.data().dataNasc)
        })
    }, [editable]);

    async function update() {
        await firestore.collection("motorista").doc(user).update({
            nome: nome,
            telefone: tel,
            dataNasc: dataNasc,
            cpf: cpf
        }).then(resultado => {
            setEditable(false)
        })
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
                    onChangeText={nome => setNome(nome)}
                    />

                <TextInput placeholder={"Telefone"}
                    keyboardType={'numeric'}
                    maxLength={11}
                    style={styles.input}
                    defaultValue={tel}
                    editable={editable}
                    onChangeText={tel => setTel(tel)}
                     />

                <TextInput placeholder={"Data de Nascimento"}
                    keyboardType={'numeric'}
                    maxLength={8}
                    style={styles.input}
                    defaultValue={dataNasc}
                    editable={editable} 
                    onChangeText={dataNasc => setDataNasc(dataNasc)}
                    />

                <TextInput placeholder={"CPF"}
                    keyboardType={'numeric'}
                    maxLength={11}
                    style={styles.input}
                    defaultValue={cpf}
                    editable={editable} 
                    onChangeText={cpf => setCpf(cpf)}
                    />

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
                            onPress={update}>
                            <Text style={styles.botaoText}>Salvar Edicao</Text>
                        </TouchableOpacity>
                    </Fragment>
                )}

            </View>
        </View>
    );
}