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
    const [local, setLocal] = useState('');
    const [dias, setDias] = useState([]);
    const [turno, setTurno] = useState('');
    const [nota, setNota] = useState('');
    const [editable, setEditable] = useState(false);

    const user = firebase.auth().currentUser.uid;

    useEffect(() => {
        firestore.collection("motorista").doc(user).onSnapshot(doc => {
            setNome(doc.data().nome)
            setTel(doc.data().telefone)
            setCpf(doc.data().cpf)
            setDataNasc(doc.data().dataNasc)
            setLocal(doc.data().local)
            setDias(doc.data().dias)
            setTurno(doc.data().turno)
            setNota(doc.data().nota)
        })
    }, [editable]);

    function update() {
        firestore.collection("motorista").doc(user).update({
            nome: nome,
            telefone: tel,
            dataNasc: dataNasc,
            cpf: cpf,
            local: local,
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
                <Text style={{ padding: 5, fontSize: 18, fontWeight: 'bold' }}>Nota: {nota}</Text>

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

                <TextInput placeholder={"Local de Trabalho"}
                    style={styles.input}
                    defaultValue={local}
                    editable={editable}
                    onChangeText={local => setLocal(local)}
                />

                <Picker
                    enabled={editable} selectedValue={turno} onValueChange={turno => setTurno(turno)} mode={"dropdown"}
                    style={{ height: 50, width: 150, alignItems: 'center', justifyContent: 'center' }}>
                    <Picker.Item label="Turno" value="" />
                    <Picker.Item label="Matutino" value="Manha" />
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