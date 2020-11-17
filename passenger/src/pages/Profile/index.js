import React, { useState, Fragment, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Image, Text, Button } from 'react-native';
import { Picker } from '@react-native-community/picker';
import Dias from '../../components/Dias';
import { TextInputMask } from 'react-native-masked-text'

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
    const [dias, setDias] = useState([]);
    const [turno, setTurno] = useState('');

    const [editable, setEditable] = useState(false);

    const user = firebase.auth().currentUser.uid;

    useEffect(() => {
        firestore.collection("passageiro").doc(user).onSnapshot(doc => {
            setNome(doc.data().nome)
            setTel(doc.data().telefone)
            setCpf(doc.data().cpf)
            setDataNasc(doc.data().dataNasc)
            setDias(doc.data().dias)
            setTurno(doc.data().turno)
        })
    }, [editable]);

    function update() {
        firestore.collection("passageiro").doc(user).update({
            nome: nome,
            telefone: tel,
            cpf: cpf,
            dataNasc: dataNasc,
            turno: turno
        }).then(resultado => {
            setEditable(false);
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logo} style={styles.logo} />
            </View>

            <View style={styles.main}>

                {editable || (
                    <Fragment>
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
                    </Fragment>
                )}

                {editable && (
                    <Fragment>
                        <Dias />
                    </Fragment>
                )}

                <TextInput placeholder={"Nome Completo"}
                    style={styles.input}
                    maxLength={24}
                    defaultValue={nome}
                    editable={editable}
                    onChangeText={nome => setNome(nome)}
                />

                <TextInputMask
                    placeholder={"Telefone"}
                    type={'cel-phone'}
                    options={{ maskType: 'BRL', withDDD: true }}
                    editable={editable}
                    style={styles.input}
                    value={tel}
                    onChangeText={tel => setTel(tel)}
                />

                <TextInputMask
                    placeholder={"CPF"}
                    type={'cpf'}
                    editable={editable}
                    style={styles.input}
                    value={cpf}
                    onChangeText={cpf => { setCpf(cpf) }}
                />

                <TextInputMask
                    placeholder={"Data de Nascimento"}
                    type={'datetime'}
                    options={{ format: 'DD/MM/YYYY' }}
                    editable={editable}
                    style={styles.input}
                    value={dataNasc}
                    onChangeText={dataNasc => { setDataNasc(dataNasc) }}
                />

                <Picker
                    enabled={editable} selectedValue={turno} onValueChange={turno => setTurno(turno)} mode={"dropdown"}
                    style={{ height: 50, width: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <Picker.Item label="Turno" value="" />
                    <Picker.Item label="Matutino" value="Manhã" />
                    <Picker.Item label="Vespertino" value="Tarde" />
                    <Picker.Item label="Noturno" value="Noite" />
                </Picker>

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
                            <Text style={styles.botaoText}>Salvar</Text>
                        </TouchableOpacity>
                    </Fragment>
                )}

            </View>
        </View>
    );
}